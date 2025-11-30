import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.84.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GeofenceCheckRequest {
  vehicleId: string;
  latitude: number;
  longitude: number;
}

interface Geofence {
  id: string;
  campaign_id: string;
  name: string;
  center_lat: number;
  center_lng: number;
  radius_meters: number;
  is_active: boolean;
}

interface GeofenceEvent {
  geofence_id: string;
  vehicle_id: string;
  event_type: 'enter' | 'exit';
  latitude: number;
  longitude: number;
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { vehicleId, latitude, longitude }: GeofenceCheckRequest = await req.json();

    console.log('Checking geofences for vehicle:', vehicleId, 'at', latitude, longitude);

    // Get vehicle's campaign
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('campaign_id')
      .eq('id', vehicleId)
      .single();

    if (vehicleError || !vehicle?.campaign_id) {
      console.error('Vehicle not found or no campaign:', vehicleError);
      return new Response(
        JSON.stringify({ error: 'Vehicle not found or not assigned to campaign' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get active geofences for the campaign
    const { data: geofences, error: geofencesError } = await supabase
      .from('geofences')
      .select('*')
      .eq('campaign_id', vehicle.campaign_id)
      .eq('is_active', true);

    if (geofencesError) {
      throw geofencesError;
    }

    console.log('Found', geofences?.length || 0, 'active geofences');

    const eventsToCreate: GeofenceEvent[] = [];

    // Get last known geofence states for this vehicle
    const { data: recentEvents } = await supabase
      .from('geofence_events')
      .select('geofence_id, event_type')
      .eq('vehicle_id', vehicleId)
      .order('timestamp', { ascending: false })
      .limit(50);

    // Build a map of current states (entered geofences)
    const currentStates = new Map<string, boolean>();
    if (recentEvents) {
      for (const event of recentEvents) {
        if (!currentStates.has(event.geofence_id)) {
          currentStates.set(event.geofence_id, event.event_type === 'enter');
        }
      }
    }

    // Check each geofence
    for (const geofence of geofences || []) {
      const distance = calculateDistance(
        latitude,
        longitude,
        Number(geofence.center_lat),
        Number(geofence.center_lng)
      );

      const isInside = distance <= Number(geofence.radius_meters);
      const wasInside = currentStates.get(geofence.id) || false;

      console.log(`Geofence ${geofence.name}: distance=${distance}m, radius=${geofence.radius_meters}m, inside=${isInside}, wasInside=${wasInside}`);

      // Detect state change
      if (isInside && !wasInside) {
        console.log(`Vehicle ${vehicleId} ENTERED geofence ${geofence.name}`);
        eventsToCreate.push({
          geofence_id: geofence.id,
          vehicle_id: vehicleId,
          event_type: 'enter',
          latitude,
          longitude,
        });
      } else if (!isInside && wasInside) {
        console.log(`Vehicle ${vehicleId} EXITED geofence ${geofence.name}`);
        eventsToCreate.push({
          geofence_id: geofence.id,
          vehicle_id: vehicleId,
          event_type: 'exit',
          latitude,
          longitude,
        });
      }
    }

    // Insert all events
    if (eventsToCreate.length > 0) {
      const { error: insertError } = await supabase
        .from('geofence_events')
        .insert(eventsToCreate);

      if (insertError) {
        console.error('Error inserting events:', insertError);
        throw insertError;
      }

      console.log(`Created ${eventsToCreate.length} geofence events`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        eventsCreated: eventsToCreate.length,
        events: eventsToCreate,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in check-geofences:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
