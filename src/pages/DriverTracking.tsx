import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MapPin, Navigation, Truck, Phone } from "lucide-react";

export default function DriverTracking() {
  const [searchParams] = useSearchParams();
  const vehicleId = searchParams.get("vehicleId");
  
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [driverPhone, setDriverPhone] = useState("");
  const [driverName, setDriverName] = useState("");

  useEffect(() => {
    if (vehicleId) {
      loadVehicle();
    }
  }, [vehicleId]);

  const loadVehicle = async () => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*, campaigns(*)")
      .eq("id", vehicleId)
      .single();

    if (error) {
      console.error("Error loading vehicle:", error);
      return;
    }

    setVehicle(data);
  };

  const startTracking = async () => {
    if (!vehicleId && (!driverName || !driverPhone)) {
      toast.error("Please enter your name and phone number");
      return;
    }

    // Check if geolocation is available
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    // Create vehicle if not exists
    let currentVehicleId = vehicleId;
    if (!vehicleId) {
      const { data, error } = await supabase
        .from("vehicles")
        .insert({
          driver_name: driverName,
          vehicle_type: "Auto-Rickshaw",
          vehicle_number: "TBD",
          phone: driverPhone,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        toast.error("Failed to register vehicle");
        console.error(error);
        return;
      }

      currentVehicleId = data.id;
      toast.success("Vehicle registered successfully!");
    }

    // Start watching position
    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        setCurrentLocation(location);

        // Send location to database
        const { error } = await supabase.from("gps_tracking").insert({
          vehicle_id: currentVehicleId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed || 0,
          heading: position.coords.heading || 0,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString(),
        });

        if (error) {
          console.error("Error saving location:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast.error("Failed to get location. Please enable location services.");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    setWatchId(id);
    setIsTracking(true);
    toast.success("Tracking started! Your location is being shared.");
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
      toast.info("Tracking stopped");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background p-4">
      <div className="max-w-md mx-auto py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Driver Tracking</h1>
          <p className="text-muted-foreground">
            Share your location to earn with MotionFleet
          </p>
        </div>

        {!vehicleId && !isTracking && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Register to Start</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  type="tel"
                />
              </div>
            </div>
          </Card>
        )}

        {vehicle && (
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-3">Campaign Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign:</span>
                <span className="font-medium">{vehicle.campaigns?.campaign_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Business:</span>
                <span className="font-medium">{vehicle.campaigns?.business_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle:</span>
                <span className="font-medium">{vehicle.vehicle_number}</span>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Tracking Status</h2>
            <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
          </div>
          
          {currentLocation && (
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </span>
              </div>
            </div>
          )}

          {!isTracking ? (
            <Button
              onClick={startTracking}
              className="w-full gradient-primary"
              size="lg"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Start Tracking
            </Button>
          ) : (
            <Button
              onClick={stopTracking}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              Stop Tracking
            </Button>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-3">How it works</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-bold text-primary">1.</span>
              <span>Click "Start Tracking" to share your location</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">2.</span>
              <span>Drive your regular routes with the campaign ad</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">3.</span>
              <span>Earn money based on distance covered and impressions</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">4.</span>
              <span>Stop tracking when your shift ends</span>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
