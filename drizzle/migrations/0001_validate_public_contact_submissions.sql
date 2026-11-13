DROP POLICY "Anyone can submit a contact form" ON public.contact_submissions;

CREATE POLICY "Validate public contact submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 100
  AND length(email) <= 255
  AND email = btrim(email)
  AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  AND (platform IS NULL OR length(btrim(platform)) <= 100)
  AND (message IS NULL OR length(btrim(message)) <= 2000)
);