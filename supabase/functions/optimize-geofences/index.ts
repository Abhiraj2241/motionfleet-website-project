import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";
import { z } from 'https://esm.sh/zod@3.22.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const OptimizeSchema = z.object({
  campaign_id: z.string().uuid('Invalid campaign ID format'),
  days_back: z.number().int().min(1, 'days_back must be at least 1').max(365, 'days_back cannot exceed 365').default(30),
});

interface Cluster {
  center_lat: number;
  center_lng: number;
  point_count: number;
  avg_speed: number;
  estimated_impressions: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse and validate input
    const rawBody = await req.json();
    const validationResult = OptimizeSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input', 
          details: validationResult.error.errors.map(e => e.message) 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { campaign_id, days_back } = validationResult.data;

    console.log(`Optimizing geofences for campaign ${campaign_id}, analyzing last ${days_back} days`);

    // Get vehicles for this campaign
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('campaign_id', campaign_id);

    if (vehiclesError) throw vehiclesError;
    if (!vehicles || vehicles.length === 0) {
      return new Response(
        JSON.stringify({ suggestions: [], message: 'No vehicles found for this campaign' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const vehicleIds = vehicles.map(v => v.id);

    // Get historical GPS data
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days_back);

    const { data: gpsData, error: gpsError } = await supabase
      .from('gps_tracking')
      .select('latitude, longitude, speed, timestamp')
      .in('vehicle_id', vehicleIds)
      .gte('timestamp', cutoffDate.toISOString())
      .order('timestamp', { ascending: false });

    if (gpsError) throw gpsError;
    if (!gpsData || gpsData.length === 0) {
      return new Response(
        JSON.stringify({ suggestions: [], message: 'No GPS data found for analysis' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing ${gpsData.length} GPS points`);

    // Get existing geofences to avoid duplicates
    const { data: existingGeofences, error: geofencesError } = await supabase
      .from('geofences')
      .select('center_lat, center_lng, radius_meters')
      .eq('campaign_id', campaign_id)
      .eq('is_active', true);

    if (geofencesError) throw geofencesError;

    // Cluster GPS points using grid-based approach
    const gridSize = 0.01; // ~1km grid cells
    const clusters = new Map<string, Cluster>();

    for (const point of gpsData) {
      const gridLat = Math.floor(point.latitude / gridSize) * gridSize;
      const gridLng = Math.floor(point.longitude / gridSize) * gridSize;
      const key = `${gridLat},${gridLng}`;

      if (!clusters.has(key)) {
        clusters.set(key, {
          center_lat: gridLat + gridSize / 2,
          center_lng: gridLng + gridSize / 2,
          point_count: 0,
          avg_speed: 0,
          estimated_impressions: 0,
        });
      }

      const cluster = clusters.get(key)!;
      cluster.point_count++;
      cluster.avg_speed += point.speed || 0;
      // Estimate impressions: slower speed = more time in area = more impressions
      const speedFactor = point.speed ? Math.max(1, 30 - point.speed) : 15;
      cluster.estimated_impressions += speedFactor * 10;
    }

    // Calculate averages and filter significant clusters
    const significantClusters = Array.from(clusters.values())
      .map(cluster => ({
        ...cluster,
        avg_speed: cluster.avg_speed / cluster.point_count,
        estimated_impressions: Math.round(cluster.estimated_impressions),
      }))
      .filter(cluster => cluster.point_count >= 10) // Minimum 10 GPS points
      .sort((a, b) => b.estimated_impressions - a.estimated_impressions);

    console.log(`Found ${significantClusters.length} significant clusters`);

    // Filter out clusters too close to existing geofences
    const suggestions = significantClusters
      .filter(cluster => {
        if (!existingGeofences || existingGeofences.length === 0) return true;
        
        return !existingGeofences.some(geofence => {
          const distance = calculateDistance(
            cluster.center_lat,
            cluster.center_lng,
            geofence.center_lat,
            geofence.center_lng
          );
          return distance < (geofence.radius_meters + 500); // 500m buffer
        });
      })
      .slice(0, 5) // Top 5 suggestions
      .map((cluster, index) => ({
        name: `Optimized Zone ${index + 1}`,
        center_lat: cluster.center_lat,
        center_lng: cluster.center_lng,
        radius_meters: calculateOptimalRadius(cluster.point_count),
        estimated_impressions: cluster.estimated_impressions,
        avg_speed: Math.round(cluster.avg_speed * 10) / 10,
        data_points: cluster.point_count,
        confidence: calculateConfidence(cluster.point_count, cluster.estimated_impressions),
      }));

    console.log(`Generated ${suggestions.length} optimization suggestions`);

    return new Response(
      JSON.stringify({ 
        suggestions,
        analyzed_points: gpsData.length,
        total_clusters: significantClusters.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in optimize-geofences:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Calculate distance between two coordinates in meters (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Calculate optimal radius based on point density
function calculateOptimalRadius(pointCount: number): number {
  if (pointCount < 20) return 300;
  if (pointCount < 50) return 500;
  if (pointCount < 100) return 750;
  return 1000;
}

// Calculate confidence score (0-100)
function calculateConfidence(pointCount: number, impressions: number): number {
  const pointScore = Math.min(pointCount / 100, 1) * 50;
  const impressionScore = Math.min(impressions / 10000, 1) * 50;
  return Math.round(pointScore + impressionScore);
}
