
-- Sequence + function for application numbers
CREATE SEQUENCE IF NOT EXISTS public.admissions_app_no_seq START 1;

CREATE OR REPLACE FUNCTION public.gen_admission_no()
RETURNS text
LANGUAGE sql
VOLATILE
SET search_path = public
AS $$
  SELECT 'HSN-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.admissions_app_no_seq')::text, 5, '0')
$$;

ALTER TABLE public.admissions
  ADD COLUMN IF NOT EXISTS application_no text UNIQUE DEFAULT public.gen_admission_no(),
  ADD COLUMN IF NOT EXISTS academic_year text,
  ADD COLUMN IF NOT EXISTS choice_level text,
  ADD COLUMN IF NOT EXISTS preferred_grade text,
  ADD COLUMN IF NOT EXISTS learner_gender text,
  ADD COLUMN IF NOT EXISTS place_of_birth text,
  ADD COLUMN IF NOT EXISTS nationality text,
  ADD COLUMN IF NOT EXISTS religion text,
  ADD COLUMN IF NOT EXISTS home_language text,
  ADD COLUMN IF NOT EXISTS special_needs text,
  ADD COLUMN IF NOT EXISTS parent_relationship text,
  ADD COLUMN IF NOT EXISTS parent_id_no text,
  ADD COLUMN IF NOT EXISTS parent_address text,
  ADD COLUMN IF NOT EXISTS last_grade text,
  ADD COLUMN IF NOT EXISTS kcpe_index text,
  ADD COLUMN IF NOT EXISTS other_remarks text;

-- Backfill any existing rows without an application number
UPDATE public.admissions SET application_no = public.gen_admission_no() WHERE application_no IS NULL;
