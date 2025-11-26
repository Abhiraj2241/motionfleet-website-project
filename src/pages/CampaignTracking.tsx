import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MapPin, Car, TrendingUp, BarChart3, Filter } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function CampaignTracking() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  
  const [mapboxToken, setMapboxToken] = useState("");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");
  const [metrics, setMetrics] = useState({
    activeVehicles: 0,
    totalDistance: 0,
    estimatedImpressions: 0,
    coverageArea: 0,
  });

  useEffect(() => {
    loadCampaigns();
    loadVehicles();
    setupRealtimeSubscription();
  }, []);

  useEffect(() => {
    if (mapboxToken && mapContainer.current && !map.current) {
      initializeMap();
    }
  }, [mapboxToken]);

  useEffect(() => {
    if (map.current) {
      loadLatestPositions();
    }
  }, [selectedCampaign]);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.5946, 12.9716], // Bangalore coordinates
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  };

  const loadCampaigns = async () => {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("status", "active");

    if (error) {
      console.error("Error loading campaigns:", error);
      return;
    }

    setCampaigns(data || []);
  };

  const loadVehicles = async () => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*, campaigns(*)")
      .eq("is_active", true);

    if (error) {
      console.error("Error loading vehicles:", error);
      return;
    }

    setVehicles(data || []);
    setMetrics(prev => ({ ...prev, activeVehicles: data?.length || 0 }));
  };

  const loadLatestPositions = async () => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Get latest position for each vehicle
    const { data: positions, error } = await supabase
      .from("gps_tracking")
      .select("*, vehicles(*, campaigns(*))")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error loading positions:", error);
      return;
    }

    // Group by vehicle and get latest position
    const latestPositions = new Map();
    positions?.forEach(pos => {
      if (!latestPositions.has(pos.vehicle_id)) {
        latestPositions.set(pos.vehicle_id, pos);
      }
    });

    // Add markers for vehicles
    latestPositions.forEach((position, vehicleId) => {
      if (selectedCampaign !== "all" && position.vehicles?.campaign_id !== selectedCampaign) {
        return;
      }

      const el = document.createElement("div");
      el.className = "vehicle-marker";
      el.style.backgroundImage = "url(https://img.icons8.com/color/48/000000/auto-rickshaw.png)";
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "100%";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([position.longitude, position.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div class="p-2">
              <h3 class="font-semibold">${position.vehicles?.driver_name}</h3>
              <p class="text-sm text-muted-foreground">${position.vehicles?.vehicle_number}</p>
              <p class="text-sm">${position.vehicles?.campaigns?.campaign_name || 'No Campaign'}</p>
              <p class="text-xs text-muted-foreground">Speed: ${position.speed?.toFixed(1) || 0} km/h</p>
            </div>`
          )
        )
        .addTo(map.current!);

      markers.current[vehicleId] = marker;
    });
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel("gps-tracking-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "gps_tracking",
        },
        (payload) => {
          console.log("New GPS position:", payload);
          loadLatestPositions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Campaign Tracking</h1>
          <p className="text-muted-foreground">
            Monitor your fleet in real-time and track campaign performance
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Car className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">{metrics.activeVehicles}</span>
            </div>
            <p className="text-sm text-muted-foreground">Active Vehicles</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">{metrics.coverageArea.toFixed(1)} km²</span>
            </div>
            <p className="text-sm text-muted-foreground">Coverage Area</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">{metrics.estimatedImpressions.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">Est. Impressions</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">{metrics.totalDistance.toFixed(1)} km</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Distance</p>
          </Card>
        </div>

        {/* Map Container */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Live Vehicle Tracking</h2>
            <div className="flex gap-2">
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">All Campaigns</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.campaign_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!mapboxToken ? (
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-lg p-8 text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
                <p className="text-muted-foreground mb-4">
                  Enter your Mapbox public token to enable live map tracking
                </p>
                <div className="max-w-md mx-auto flex gap-2">
                  <input
                    type="text"
                    placeholder="pk.eyJ..."
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background"
                  />
                  <Button onClick={() => toast.success("Token saved!")}>
                    Save
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Get your free token at{" "}
                  <a
                    href="https://mapbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div
              ref={mapContainer}
              className="w-full h-[600px] rounded-lg"
            />
          )}
        </Card>

        {/* Vehicle List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Vehicles</h2>
          <div className="space-y-3">
            {vehicles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No active vehicles yet. Drivers need to start tracking.
              </div>
            ) : (
              vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{vehicle.driver_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.vehicle_number} • {vehicle.vehicle_type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {vehicle.campaigns?.campaign_name || "No Campaign"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vehicle.campaigns?.business_name || "-"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
