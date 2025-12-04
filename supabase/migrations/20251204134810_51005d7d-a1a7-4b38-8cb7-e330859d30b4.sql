-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload resumes (for job applications)
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow anyone to read their uploaded resumes
CREATE POLICY "Anyone can read resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');