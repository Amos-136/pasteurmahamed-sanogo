-- Create table for user roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin')),
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  assigned_by UUID
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow service role full access and users to read their own roles
CREATE POLICY "Service role manages user roles"
  ON public.user_roles
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Users can view their roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
$$;

COMMENT ON FUNCTION public.is_admin IS 'Returns true when the authenticated user has the admin role.';

-- Update policies for sensitive tables
DROP POLICY IF EXISTS "Authenticated users can view prayer intentions" ON public.prayer_intentions;

CREATE POLICY "Admins can view prayer intentions"
  ON public.prayer_intentions
  FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Admins can view newsletter subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  USING (public.is_admin());

-- Tighten chatbot data access so only service role and admins can access
DROP POLICY IF EXISTS "Anyone can view their conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can view messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.chat_messages;

CREATE POLICY "Service role manages chat conversations"
  ON public.chat_conversations
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can view chat conversations"
  ON public.chat_conversations
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Service role manages chat messages"
  ON public.chat_messages
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can view chat messages"
  ON public.chat_messages
  FOR SELECT
  USING (public.is_admin());
