-- Create geofences table for high-value impression zones
CREATE TABLE IF NOT EXISTS public.geofences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  center_lat NUMERIC NOT NULL,
  center_lng NUMERIC NOT NULL,
  radius_meters NUMERIC NOT NULL DEFAULT 500,
  min_impressions_threshold INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create geofence_events table to track vehicle entries/exits
CREATE TABLE IF NOT EXISTS public.geofence_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  geofence_id UUID REFERENCES public.geofences(id) ON DELETE CASCADE NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('enter', 'exit')),
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.geofences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geofence_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for geofences
CREATE POLICY "Anyone can view geofences"
  ON public.geofences FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create geofences"
  ON public.geofences FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update geofences"
  ON public.geofences FOR UPDATE
  USING (true);

-- RLS Policies for geofence_events
CREATE POLICY "Anyone can view geofence events"
  ON public.geofence_events FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create geofence events"
  ON public.geofence_events FOR INSERT
  WITH CHECK (true);

-- Create updated_at trigger for geofences
CREATE TRIGGER update_geofences_updated_at
  BEFORE UPDATE ON public.geofences
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_geofences_campaign_id ON public.geofences(campaign_id);
CREATE INDEX idx_geofences_active ON public.geofences(is_active);
CREATE INDEX idx_geofence_events_geofence_id ON public.geofence_events(geofence_id);
CREATE INDEX idx_geofence_events_vehicle_id ON public.geofence_events(vehicle_id);
CREATE INDEX idx_geofence_events_timestamp ON public.geofence_events(timestamp DESC);

-- Enable realtime for geofence events
ALTER PUBLICATION supabase_realtime ADD TABLE public.geofence_events;