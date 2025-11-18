-- Newsletter subscribers table

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

-- Index for faster lookups
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- RLS Policies (public can insert, but not read)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Only service role can read/update
CREATE POLICY "Service role full access" ON newsletter_subscribers
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
