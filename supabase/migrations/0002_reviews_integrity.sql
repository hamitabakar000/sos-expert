drop policy if exists "Clients create own reviews" on public.reviews;

create policy "Clients review completed own consultations"
on public.reviews for insert
with check (
  client_id = auth.uid()
  and exists (
    select 1
    from public.consultations c
    where c.id = consultation_id
      and c.client_id = auth.uid()
      and c.expert_id = expert_id
      and c.status = 'completed'
  )
);

create or replace function public.refresh_expert_rating()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_expert_id uuid;
begin
  target_expert_id := coalesce(new.expert_id, old.expert_id);

  update public.expert_profiles ep
  set
    average_rating = coalesce(
      (select round(avg(r.rating)::numeric, 2) from public.reviews r where r.expert_id = target_expert_id),
      0
    ),
    total_reviews = (select count(*) from public.reviews r where r.expert_id = target_expert_id),
    updated_at = now()
  where ep.id = target_expert_id;

  return coalesce(new, old);
end;
$$;

drop trigger if exists reviews_refresh_expert_rating on public.reviews;

create trigger reviews_refresh_expert_rating
after insert or update or delete on public.reviews
for each row execute function public.refresh_expert_rating();
