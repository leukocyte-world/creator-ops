-- Create the posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  author TEXT DEFAULT 'CreatorOps AI',
  category TEXT DEFAULT 'Strategy',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add updated_at trigger (optional but recommended)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Allow public read-only access to published posts" ON public.posts
  FOR SELECT USING (is_published = true);

-- Allow authenticated admins full access (Note: This assumes your users table has a role column or you use a specific check)
-- For now, we manually handle security via the API route service role, so we don't strictly need a policy for the service role.
-- But if you want to use the API without service role, you'd add:
-- CREATE POLICY "Admins have full access" ON public.posts FOR ALL TO authenticated USING (true);
