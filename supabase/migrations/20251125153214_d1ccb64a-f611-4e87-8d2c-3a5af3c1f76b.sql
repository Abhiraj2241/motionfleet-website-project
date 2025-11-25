-- Create storage bucket for driver documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'driver-documents',
  'driver-documents',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf']
);

-- Add document URL columns to driver_applications
ALTER TABLE public.driver_applications
ADD COLUMN license_photo_url TEXT,
ADD COLUMN registration_photo_url TEXT;

-- Storage policies for driver documents
-- Allow anyone to upload during application submission
CREATE POLICY "Anyone can upload driver documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'driver-documents');

-- Allow users to view their own documents
CREATE POLICY "Users can view driver documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'driver-documents');

-- Allow users to update their own documents
CREATE POLICY "Users can update driver documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'driver-documents')
WITH CHECK (bucket_id = 'driver-documents');

-- Allow users to delete their own documents
CREATE POLICY "Users can delete driver documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'driver-documents');