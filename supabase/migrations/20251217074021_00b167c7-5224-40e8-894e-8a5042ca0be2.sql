-- Drop existing insecure storage policies for driver-documents
DROP POLICY IF EXISTS "Anyone can upload driver documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view driver documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update driver documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete driver documents" ON storage.objects;

-- Drop existing insecure storage policies for resumes
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read resumes" ON storage.objects;

-- Create secure policies for driver-documents bucket
-- Allow public uploads (required for unauthenticated driver application form)
CREATE POLICY "Public can upload driver documents"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'driver-documents');

-- Only admins can view driver documents
CREATE POLICY "Admins can view driver documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'driver-documents' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can update driver documents
CREATE POLICY "Admins can update driver documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'driver-documents' 
  AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  bucket_id = 'driver-documents' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete driver documents
CREATE POLICY "Admins can delete driver documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'driver-documents' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Create secure policies for resumes bucket
-- Allow public uploads (required for unauthenticated career application form)
CREATE POLICY "Public can upload resumes"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');

-- Only admins can view resumes
CREATE POLICY "Admins can view resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'resumes' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete resumes
CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'resumes' 
  AND public.has_role(auth.uid(), 'admin')
);