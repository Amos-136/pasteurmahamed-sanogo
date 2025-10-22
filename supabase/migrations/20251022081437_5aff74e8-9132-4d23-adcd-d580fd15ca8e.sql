-- Fix RLS policies for prayer_intentions and chat_conversations

-- 1. Fix prayer_intentions: Restrict SELECT to admins only (remove public access)
DROP POLICY IF EXISTS "Users can view non-anonymous prayers" ON public.prayer_intentions;
DROP POLICY IF EXISTS "Authenticated users can view prayer intentions" ON public.prayer_intentions;

-- Only admins can view prayer intentions (protects email/name data)
CREATE POLICY "Only admins can view prayer intentions"
ON public.prayer_intentions
FOR SELECT
USING (is_admin(auth.uid()));

-- 2. Fix chat_conversations: Proper user isolation by session_id
-- First drop the existing policy
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.chat_conversations;