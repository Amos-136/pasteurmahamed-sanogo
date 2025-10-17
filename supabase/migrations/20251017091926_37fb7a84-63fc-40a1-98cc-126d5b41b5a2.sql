-- Create table for upcoming programs/events
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  image_url TEXT,
  event_type TEXT NOT NULL DEFAULT 'culte',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view programs"
ON public.programs
FOR SELECT
USING (true);

-- Create policy for authenticated insert (for admin later)
CREATE POLICY "Authenticated users can create programs"
ON public.programs
FOR INSERT
WITH CHECK (true);

-- Create policy for authenticated update
CREATE POLICY "Authenticated users can update programs"
ON public.programs
FOR UPDATE
USING (true);

-- Create policy for authenticated delete
CREATE POLICY "Authenticated users can delete programs"
ON public.programs
FOR DELETE
USING (true);

-- Create index for better performance
CREATE INDEX idx_programs_date ON public.programs(date);
CREATE INDEX idx_programs_featured ON public.programs(is_featured);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_programs_updated_at
BEFORE UPDATE ON public.programs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.programs (title, description, date, location, event_type, is_featured) VALUES
('Culte Dominical', 'Rejoignez-nous pour un temps de louange et d''adoration puissant', '2025-04-20 10:00:00+00', 'Cocody 2 Plateaux-Vallons, Abidjan', 'culte', true),
('Conférence Kodesh 2025', 'Une rencontre exceptionnelle avec la présence de Dieu', '2025-05-15 18:00:00+00', 'Palais des Sports, Abidjan', 'conference', true),
('École de Disciples', 'Formation intensive pour les leaders spirituels', '2025-04-25 15:00:00+00', 'Église Vases d''Honneur', 'formation', false),
('Grande Rencontre', 'Rassemblement international des Vases d''Honneur', '2025-06-10 09:00:00+00', 'Stade Félix Houphouët-Boigny', 'conference', true);