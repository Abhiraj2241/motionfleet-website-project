-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'driver', 'business');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text,
    full_name text,
    phone text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for user_roles (admin only)
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Update campaigns table RLS
DROP POLICY IF EXISTS "Anyone can create campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Anyone can update campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Anyone can view campaigns" ON public.campaigns;

CREATE POLICY "Admins can manage campaigns" ON public.campaigns
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can view campaigns" ON public.campaigns
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Public can insert campaign requests" ON public.campaigns
  FOR INSERT WITH CHECK (true);

-- Update vehicles table RLS
DROP POLICY IF EXISTS "Anyone can create vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Anyone can update vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Anyone can view vehicles" ON public.vehicles;

CREATE POLICY "Admins can manage vehicles" ON public.vehicles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Drivers can view assigned vehicles" ON public.vehicles
  FOR SELECT USING (public.has_role(auth.uid(), 'driver'));

CREATE POLICY "Public can register vehicles" ON public.vehicles
  FOR INSERT WITH CHECK (true);

-- Update gps_tracking table RLS
DROP POLICY IF EXISTS "Anyone can insert GPS data" ON public.gps_tracking;
DROP POLICY IF EXISTS "Anyone can view GPS data" ON public.gps_tracking;

CREATE POLICY "Admins can view all GPS data" ON public.gps_tracking
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can insert GPS data" ON public.gps_tracking
  FOR INSERT WITH CHECK (true);

-- Update geofences table RLS
DROP POLICY IF EXISTS "Anyone can create geofences" ON public.geofences;
DROP POLICY IF EXISTS "Anyone can update geofences" ON public.geofences;
DROP POLICY IF EXISTS "Anyone can view geofences" ON public.geofences;

CREATE POLICY "Admins can manage geofences" ON public.geofences
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can view geofences" ON public.geofences
  FOR SELECT USING (auth.role() = 'authenticated');

-- Update geofence_events table RLS
DROP POLICY IF EXISTS "Anyone can create geofence events" ON public.geofence_events;
DROP POLICY IF EXISTS "Anyone can view geofence events" ON public.geofence_events;

CREATE POLICY "Admins can view geofence events" ON public.geofence_events
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can insert geofence events" ON public.geofence_events
  FOR INSERT WITH CHECK (true);

-- Update campaign_metrics table RLS
DROP POLICY IF EXISTS "Anyone can insert metrics" ON public.campaign_metrics;
DROP POLICY IF EXISTS "Anyone can update metrics" ON public.campaign_metrics;
DROP POLICY IF EXISTS "Anyone can view metrics" ON public.campaign_metrics;

CREATE POLICY "Admins can manage metrics" ON public.campaign_metrics
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can view metrics" ON public.campaign_metrics
  FOR SELECT USING (auth.role() = 'authenticated');

-- Update contact_inquiries table RLS
DROP POLICY IF EXISTS "Anyone can submit contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Anyone can view contact inquiries" ON public.contact_inquiries;

CREATE POLICY "Admins can view contact inquiries" ON public.contact_inquiries
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can submit contact inquiries" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);

-- Update job_applications table RLS
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Anyone can view job applications" ON public.job_applications;

CREATE POLICY "Admins can view job applications" ON public.job_applications
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can submit job applications" ON public.job_applications
  FOR INSERT WITH CHECK (true);

-- Update driver_applications table RLS
DROP POLICY IF EXISTS "Anyone can submit driver applications" ON public.driver_applications;
DROP POLICY IF EXISTS "Anyone can view driver applications" ON public.driver_applications;
DROP POLICY IF EXISTS "Users can update their applications" ON public.driver_applications;

CREATE POLICY "Admins can manage driver applications" ON public.driver_applications
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can submit driver applications" ON public.driver_applications
  FOR INSERT WITH CHECK (true);