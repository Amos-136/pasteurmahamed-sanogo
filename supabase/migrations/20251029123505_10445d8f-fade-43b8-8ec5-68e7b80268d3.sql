-- Create rate limiting table for chatbot
CREATE TABLE IF NOT EXISTS public.chat_rate_limits (
  session_id TEXT PRIMARY KEY,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  last_request TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limits
CREATE POLICY "Service role manages rate limits"
ON public.chat_rate_limits
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Index for performance (without immutable predicate)
CREATE INDEX IF NOT EXISTS idx_chat_rate_limits_window 
ON public.chat_rate_limits(window_start);