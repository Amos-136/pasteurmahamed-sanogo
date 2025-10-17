-- Create table for prayer intentions
CREATE TABLE IF NOT EXISTS public.prayer_intentions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  intention TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prayer_intentions ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert
CREATE POLICY "Anyone can submit prayer intentions"
ON public.prayer_intentions
FOR INSERT
WITH CHECK (true);

-- Create policy for authenticated read (for admin later)
CREATE POLICY "Authenticated users can view prayer intentions"
ON public.prayer_intentions
FOR SELECT
USING (true);

-- Create index for better performance
CREATE INDEX idx_prayer_intentions_status ON public.prayer_intentions(status);
CREATE INDEX idx_prayer_intentions_created ON public.prayer_intentions(created_at);

-- Create table for newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  preferences JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Create policy for authenticated read
CREATE POLICY "Authenticated users can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (true);

-- Create index for better performance
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_newsletter_active ON public.newsletter_subscribers(is_active);

-- Create table for testimonials submissions
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  testimony TEXT NOT NULL,
  phone TEXT,
  role TEXT,
  is_published BOOLEAN DEFAULT false,
  video_url TEXT,
  audio_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert
CREATE POLICY "Anyone can submit testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (true);

-- Create policy for public read of published testimonials
CREATE POLICY "Anyone can view published testimonials"
ON public.testimonials
FOR SELECT
USING (is_published = true);

-- Create policy for authenticated read all
CREATE POLICY "Authenticated users can view all testimonials"
ON public.testimonials
FOR SELECT
USING (true);

-- Create index for better performance
CREATE INDEX idx_testimonials_published ON public.testimonials(is_published);
CREATE INDEX idx_testimonials_created ON public.testimonials(created_at);