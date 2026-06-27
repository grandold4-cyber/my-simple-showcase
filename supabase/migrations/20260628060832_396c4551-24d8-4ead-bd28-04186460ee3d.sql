
-- EVENTS
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text,
  starts_at timestamptz NOT NULL,
  cover_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events public read" ON public.events FOR SELECT USING (true);
CREATE POLICY "events admin insert" ON public.events FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "events admin update" ON public.events FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "events admin delete" ON public.events FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_events_updated BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- EVENT REGISTRATIONS
CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.event_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "regs public insert" ON public.event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "regs admin select" ON public.event_registrations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "regs admin delete" ON public.event_registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_regs_updated BEFORE UPDATE ON public.event_registrations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- LIVE SETTINGS (singleton)
CREATE TABLE public.live_settings (
  id text PRIMARY KEY DEFAULT 'main',
  is_live boolean NOT NULL DEFAULT false,
  youtube_url text,
  upcoming_at timestamptz,
  upcoming_title text,
  message text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.live_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.live_settings TO authenticated;
GRANT ALL ON public.live_settings TO service_role;
ALTER TABLE public.live_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "live public read" ON public.live_settings FOR SELECT USING (true);
CREATE POLICY "live admin insert" ON public.live_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "live admin update" ON public.live_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_live_updated BEFORE UPDATE ON public.live_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.live_settings (id, is_live) VALUES ('main', false) ON CONFLICT DO NOTHING;

-- GALLERY ITEMS
CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL CHECK (section IN ('school','church','company')),
  kind text NOT NULL DEFAULT 'image' CHECK (kind IN ('image','video')),
  url text NOT NULL,
  title text,
  caption text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gallery public read" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "gallery admin insert" ON public.gallery_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "gallery admin update" ON public.gallery_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "gallery admin delete" ON public.gallery_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_gallery_updated BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
