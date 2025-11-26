-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  campaign_name TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  budget DECIMAL(10, 2),
  target_area TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  driver_name TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  vehicle_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create GPS tracking table
CREATE TABLE public.gps_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  speed DECIMAL(5, 2),
  heading DECIMAL(5, 2),
  accuracy DECIMAL(8, 2),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create campaign metrics table
CREATE TABLE public.campaign_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  total_distance DECIMAL(10, 2) DEFAULT 0,
  estimated_impressions INTEGER DEFAULT 0,
  coverage_area DECIMAL(10, 2) DEFAULT 0,
  active_vehicles INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(campaign_id, date)
);

-- Enable RLS
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gps_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campaigns (public read for demo, can be restricted later)
CREATE POLICY "Anyone can view campaigns"
  ON public.campaigns FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create campaigns"
  ON public.campaigns FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update campaigns"
  ON public.campaigns FOR UPDATE
  USING (true);

-- RLS Policies for vehicles
CREATE POLICY "Anyone can view vehicles"
  ON public.vehicles FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create vehicles"
  ON public.vehicles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update vehicles"
  ON public.vehicles FOR UPDATE
  USING (true);

-- RLS Policies for GPS tracking
CREATE POLICY "Anyone can view GPS data"
  ON public.gps_tracking FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert GPS data"
  ON public.gps_tracking FOR INSERT
  WITH CHECK (true);

-- RLS Policies for campaign metrics
CREATE POLICY "Anyone can view metrics"
  ON public.campaign_metrics FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert metrics"
  ON public.campaign_metrics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update metrics"
  ON public.campaign_metrics FOR UPDATE
  USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_campaign_metrics_updated_at
  BEFORE UPDATE ON public.campaign_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for GPS tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.gps_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.campaigns;