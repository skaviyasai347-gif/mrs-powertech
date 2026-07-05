-- ============================================================
-- MRS Powertech — Supabase Database Schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor)
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  created_at timestamptz default now()
);

insert into public.categories (name) values
  ('Solar Panels'), ('Inverters'), ('Batteries'), ('Accessories')
on conflict (name) do nothing;

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  brand text,
  description text,
  features text[] default '{}',
  specifications jsonb default '{}',
  price numeric(12,2) not null default 0,
  availability boolean default true,
  image_path text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  location text not null,
  capacity text not null,
  completion_date date,
  description text,
  cover_image_path text,
  gallery_paths text[] default '{}',
  video_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  message text,
  product_id uuid references public.products(id) on delete set null,
  product_name text,
  source text default 'contact_form',
  created_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  rating int not null check (rating between 1 and 5),
  text text not null,
  approved boolean default false,
  created_at timestamptz default now()
);

-- Admins are managed via Supabase Auth (auth.users). This table stores
-- optional profile metadata for admins created through the Auth dashboard.
create table if not exists public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'admin',
  created_at timestamptz default now()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.products enable row level security;
alter table public.projects enable row level security;
alter table public.categories enable row level security;
alter table public.enquiries enable row level security;
alter table public.reviews enable row level security;
alter table public.admins enable row level security;

-- Public (anon) read access for storefront content
create policy "Public can read products" on public.products for select using (true);
create policy "Public can read projects" on public.projects for select using (true);
create policy "Public can read categories" on public.categories for select using (true);
create policy "Public can read approved reviews" on public.reviews for select using (approved = true);

-- Public (anon) can submit enquiries and reviews, but not read/update/delete them
create policy "Public can insert enquiries" on public.enquiries for insert with check (true);
create policy "Public can insert reviews" on public.reviews for insert with check (true);

-- Authenticated admins have full access
create policy "Admins can manage products" on public.products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins can manage projects" on public.projects for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins can manage categories" on public.categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins can read enquiries" on public.enquiries for select
  using (auth.role() = 'authenticated');
create policy "Admins can delete enquiries" on public.enquiries for delete
  using (auth.role() = 'authenticated');

create policy "Admins can manage reviews" on public.reviews for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins can view own admin profile" on public.admins for select
  using (auth.uid() = id);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

create policy "Public can view product images" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "Admins can upload product images" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');
create policy "Admins can update product images" on storage.objects
  for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');
create policy "Admins can delete product images" on storage.objects
  for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "Public can view project media" on storage.objects
  for select using (bucket_id = 'project-media');
create policy "Admins can upload project media" on storage.objects
  for insert with check (bucket_id = 'project-media' and auth.role() = 'authenticated');
create policy "Admins can update project media" on storage.objects
  for update using (bucket_id = 'project-media' and auth.role() = 'authenticated');
create policy "Admins can delete project media" on storage.objects
  for delete using (bucket_id = 'project-media' and auth.role() = 'authenticated');

-- ============================================================
-- REALTIME
-- ============================================================

alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.enquiries;
alter publication supabase_realtime add table public.reviews;

-- ============================================================
-- SEED DATA (optional — remove if not needed)
-- ============================================================

insert into public.products (name, category, brand, description, features, price, availability) values
('MonoPro 550W Solar Panel', 'Solar Panels', 'MRS MonoPro', 'High-efficiency monocrystalline panel engineered for maximum yield in limited roof space.', array['550W output','21.5% efficiency','25-year performance warranty','PID resistant'], 18500, true),
('HybridWave 5kW Inverter', 'Inverters', 'MRS HybridWave', 'Hybrid inverter supporting grid-tied and battery backup operation with app monitoring.', array['5kW continuous','MPPT dual tracker','Wi-Fi monitoring','10-year warranty'], 62000, true),
('PowerCell Lithium Battery 5kWh', 'Batteries', 'MRS PowerCell', 'LiFePO4 battery bank for reliable backup during grid outages.', array['5kWh capacity','6000+ cycles','Built-in BMS','Wall-mountable'], 145000, true),
('Mounting Structure Kit', 'Accessories', 'MRS Structures', 'Corrosion-resistant galvanized mounting structure for rooftop installations.', array['Hot-dip galvanized','Wind load tested','Custom tilt angles'], 9500, true)
on conflict do nothing;

-- ============================================================
-- ADMIN USER SETUP (manual step)
-- ============================================================
-- Create your first admin user from the Supabase Dashboard:
-- Authentication > Users > Add User (email + password).
-- Optionally add a row to public.admins with that user's id.
