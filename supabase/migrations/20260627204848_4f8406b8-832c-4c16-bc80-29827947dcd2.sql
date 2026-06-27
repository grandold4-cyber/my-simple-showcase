
-- User roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Updated-at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- School admissions applications
CREATE TABLE public.admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL,
  child_name text NOT NULL,
  child_dob date,
  class_of_interest text NOT NULL,
  current_school text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.admissions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.admissions TO authenticated;
GRANT ALL ON public.admissions TO service_role;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit admissions" ON public.admissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view admissions" ON public.admissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update admissions" ON public.admissions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete admissions" ON public.admissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admissions_updated_at BEFORE UPDATE ON public.admissions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Contact / partnership inquiries
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  category text NOT NULL DEFAULT 'general',
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Donation pledges / logged donations
CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  donor_phone text,
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'KES',
  designation text NOT NULL DEFAULT 'general',
  method text NOT NULL,
  frequency text NOT NULL DEFAULT 'one-time',
  reference text,
  message text,
  status text NOT NULL DEFAULT 'pledged',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.donations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record donations" ON public.donations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view donations" ON public.donations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update donations" ON public.donations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete donations" ON public.donations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER donations_updated_at BEFORE UPDATE ON public.donations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Prayer requests
CREATE TABLE public.prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  request text NOT NULL,
  is_private boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.prayer_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.prayer_requests TO authenticated;
GRANT ALL ON public.prayer_requests TO service_role;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit prayer requests" ON public.prayer_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view prayer requests" ON public.prayer_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update prayer requests" ON public.prayer_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
