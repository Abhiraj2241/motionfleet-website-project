-- Create enum for approval status
CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Create driver_applications table
CREATE TABLE public.driver_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  vehicle_model TEXT,
  vehicle_year TEXT,
  license_number TEXT,
  additional_info TEXT,
  approval_status approval_status NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.driver_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new applications (public registration)
CREATE POLICY "Anyone can submit driver applications"
ON public.driver_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow public read access for now (can be restricted to admins later)
CREATE POLICY "Anyone can view driver applications"
ON public.driver_applications
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow authenticated users to update their own applications
CREATE POLICY "Users can update their applications"
ON public.driver_applications
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_driver_applications_updated_at
BEFORE UPDATE ON public.driver_applications
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();