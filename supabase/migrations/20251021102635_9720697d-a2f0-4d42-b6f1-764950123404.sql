-- Phase 1: Créer le système de rôles sécurisé

-- Créer l'enum pour les rôles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Créer la table user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  assigned_at timestamp with time zone DEFAULT now(),
  assigned_by uuid,
  CONSTRAINT unique_user_role UNIQUE (user_id, role)
);

-- Activer RLS sur user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Créer la fonction security definer pour vérifier les rôles
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

-- Créer une fonction pour vérifier si l'utilisateur est admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Politique RLS pour user_roles: seuls les admins peuvent voir tous les rôles
CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Phase 2: Sécuriser les tables sensibles

-- PRAYER INTENTIONS: Seuls les admins peuvent voir toutes les intentions
DROP POLICY IF EXISTS "Authenticated users can view prayer intentions" ON public.prayer_intentions;
DROP POLICY IF EXISTS "Anyone can submit prayer intentions" ON public.prayer_intentions;

CREATE POLICY "Anyone can submit prayer intentions"
ON public.prayer_intentions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view non-anonymous prayers"
ON public.prayer_intentions
FOR SELECT
TO authenticated
USING (is_anonymous = false);

CREATE POLICY "Admins can view all prayers"
ON public.prayer_intentions
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage prayers"
ON public.prayer_intentions
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- CHAT CONVERSATIONS: Isolation par session_id
DROP POLICY IF EXISTS "Anyone can view their conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;

CREATE POLICY "Users can view their own conversations"
ON public.chat_conversations
FOR SELECT
USING (
  session_id = current_setting('request.headers', true)::json->>'x-session-id'
  OR (auth.uid() IS NOT NULL AND public.is_admin(auth.uid()))
);

CREATE POLICY "Users can create their own conversations"
ON public.chat_conversations
FOR INSERT
WITH CHECK (session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- CHAT MESSAGES: Suivent les mêmes règles que conversations
DROP POLICY IF EXISTS "Anyone can view messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.chat_messages;

CREATE POLICY "Users can view their own messages"
ON public.chat_messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations
    WHERE id = chat_messages.conversation_id
    AND (
      session_id = current_setting('request.headers', true)::json->>'x-session-id'
      OR (auth.uid() IS NOT NULL AND public.is_admin(auth.uid()))
    )
  )
);

CREATE POLICY "Users can insert their own messages"
ON public.chat_messages
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_conversations
    WHERE id = chat_messages.conversation_id
    AND session_id = current_setting('request.headers', true)::json->>'x-session-id'
  )
);

-- NEWSLETTER SUBSCRIBERS: Seuls les admins peuvent voir la liste
DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage subscribers"
ON public.newsletter_subscribers
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- CONTACT MESSAGES: Seuls les admins peuvent lire
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage contact messages"
ON public.contact_messages
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- TESTIMONIALS: Lecture publique des témoignages publiés, admins gèrent tout
DROP POLICY IF EXISTS "Anyone can view published testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;

CREATE POLICY "Anyone can view published testimonials"
ON public.testimonials
FOR SELECT
USING (is_published = true);

CREATE POLICY "Anyone can submit testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));