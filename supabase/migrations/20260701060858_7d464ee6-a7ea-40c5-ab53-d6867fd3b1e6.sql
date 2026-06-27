-- Tour bookings (public inserts, admin manages)
CREATE TABLE public.tour_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  package text NOT NULL,
  travel_date date,
  adults int DEFAULT 1,
  children int DEFAULT 0,
  notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_bookings TO authenticated;
GRANT INSERT ON public.tour_bookings TO anon;
GRANT ALL ON public.tour_bookings TO service_role;
ALTER TABLE public.tour_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can create" ON public.tour_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read" ON public.tour_bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update" ON public.tour_bookings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete" ON public.tour_bookings FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_tour_bookings_updated BEFORE UPDATE ON public.tour_bookings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Volunteer signups
CREATE TABLE public.volunteer_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  cause text,
  availability text,
  skills text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.volunteer_signups TO authenticated;
GRANT INSERT ON public.volunteer_signups TO anon;
GRANT ALL ON public.volunteer_signups TO service_role;
ALTER TABLE public.volunteer_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can create" ON public.volunteer_signups FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read" ON public.volunteer_signups FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update" ON public.volunteer_signups FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete" ON public.volunteer_signups FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_volunteer_signups_updated BEFORE UPDATE ON public.volunteer_signups FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Sponsorships
CREATE TABLE public.sponsorships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_name text NOT NULL,
  email text NOT NULL,
  phone text,
  tier text NOT NULL,
  cause text,
  amount_usd numeric,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sponsorships TO authenticated;
GRANT INSERT ON public.sponsorships TO anon;
GRANT ALL ON public.sponsorships TO service_role;
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can create" ON public.sponsorships FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read" ON public.sponsorships FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update" ON public.sponsorships FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete" ON public.sponsorships FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_sponsorships_updated BEFORE UPDATE ON public.sponsorships FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Properties projects (public readable, admin managed)
CREATE TABLE public.properties_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  description text,
  price_from text,
  status text DEFAULT 'available',
  cover_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.properties_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.properties_projects TO authenticated;
GRANT ALL ON public.properties_projects TO service_role;
ALTER TABLE public.properties_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON public.properties_projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write" ON public.properties_projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update" ON public.properties_projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete" ON public.properties_projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_properties_projects_updated BEFORE UPDATE ON public.properties_projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Tour packages
CREATE TABLE public.tour_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text NOT NULL,
  duration_days int,
  price_from text,
  description text,
  cover_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tour_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_packages TO authenticated;
GRANT ALL ON public.tour_packages TO service_role;
ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON public.tour_packages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write" ON public.tour_packages FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update" ON public.tour_packages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete" ON public.tour_packages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_tour_packages_updated BEFORE UPDATE ON public.tour_packages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();