alter table public.expert_profiles
add column if not exists cv_url text,
add column if not exists cv_file_name text,
add column if not exists cv_uploaded_at timestamptz;

comment on column public.expert_profiles.cv_url is
'Private storage URL of the CV submitted for admin validation.';

comment on column public.expert_profiles.cv_file_name is
'Original CV file name displayed in the expert validation dossier.';
