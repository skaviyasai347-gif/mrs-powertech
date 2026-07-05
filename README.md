# MRS Powertech — Premium Solar Company Website + Admin Portal

"Empowering Life with Solar" — a full production-ready solar company website with a Supabase-backed admin portal, built with React, Vite, Tailwind CSS and Framer Motion.

## ⚠️ Important note about the logo

No logo image file was actually attached in this conversation, so the site currently references `/public/logo.png`, which does not exist yet. The Navbar, Footer, Loading Screen and Admin sidebar are all built to gracefully hide the broken image if it's missing, so the site still looks correct — but **add your real logo** before deploying:

1. Export your logo as a transparent PNG, ideally 512×512.
2. Save it as `public/logo.png`.
3. Also save a 1200×630 image as `public/og-image.jpg` for social sharing previews.

## Tech Stack

- React 18 + Vite
- Tailwind CSS (custom gold/black luxury theme)
- Framer Motion (page transitions, scroll reveals, micro-interactions)
- React Router v6
- Supabase (Postgres + Auth + Storage + Realtime)
- Chart.js (admin dashboard analytics)
- React Hook Form + React Toastify
- SwiperJS (testimonials carousel)
- AOS (scroll animations)
- Lucide Icons

## Getting Started

```bash
npm install
cp .env.example .env
# fill in your Supabase project URL + anon key in .env
npm run dev
```

## Supabase Setup

1. Create a project at https://supabase.com.
2. Open the SQL Editor and run the entire contents of `supabase/schema.sql`. This creates:
   - `products`, `projects`, `categories`, `enquiries`, `reviews`, `admins` tables
   - Row Level Security policies (public read for storefront data, authenticated-only writes)
   - `product-images` and `project-media` public storage buckets with upload policies
   - Realtime publication for products, projects, enquiries and reviews
   - A few seed products so the Products page isn't empty on first run
3. Create your first admin login: **Authentication → Users → Add User**, and set an email + password. This is the only account type in the system — there is no public user registration.
4. Copy your **Project URL** and **anon public key** (Project Settings → API) into `.env`.

## Folder Structure

```
src/
  components/
    layout/       Navbar, Footer, CustomCursor, LoadingScreen, FloatingButtons
    sections/      Hero, WhyChooseUs, WhyGoSolar, ServicesGrid, SubsidyScheme, ReviewsSlider, CTABanner
    ui/            SectionHeading, AnimatedCounter, EnquiryModal
    admin/          AdminLayout, ProtectedRoute
  pages/            Home, About, Solutions, Products, Projects, Calculator, Reviews, Contact, NotFound
  pages/admin/      AdminLogin, AdminForgotPassword, AdminDashboard, AdminProducts, AdminProjects, AdminEnquiries, AdminReviews
  context/          AuthContext (Supabase session management)
  lib/              supabase.js (client), solarCalculator.js (savings model)
  data/             siteData.js (company info + fallback content shown before Supabase data loads)
supabase/
  schema.sql        Full database schema, RLS policies, storage buckets, seed data
public/
  robots.txt, sitemap.xml
```

## Admin Portal

- `/admin/login` — Supabase email/password authentication, forgot-password flow
- `/admin` — Dashboard with live counts, visitor chart, category breakdown, recent enquiries
- `/admin/products` — Full CRUD with image upload to Supabase Storage
- `/admin/projects` — Full CRUD with cover image upload
- `/admin/enquiries` — View and delete enquiries, export to CSV
- `/admin/reviews` — Approve/unpublish and delete customer reviews

All `/admin/*` routes except login and forgot-password are wrapped in `ProtectedRoute`, which redirects unauthenticated visitors to the login page.

## Solar Calculator Logic

`src/lib/solarCalculator.js` contains a transparent, documented estimation model using Chennai average sun-hours (4.5/day), Tamil Nadu blended tariff slabs, and the Pradhan Mantri Surya Ghar Yojana subsidy slabs (₹30,000 / ₹60,000 / ₹78,000). It is intentionally conservative and labelled as an estimate — a real site survey is still recommended, and the page states this.

## Deployment (Vercel)

```bash
npm run build
```

1. Push this project to a GitHub repository.
2. Import the repo in Vercel.
3. Set environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel project settings.
4. Deploy — Vercel auto-detects the Vite build.

## Notes & Next Steps

- Replace the placeholder logo and OG image as described above.
- Update `mapEmbed`, phone numbers, and email in `src/data/siteData.js` if they ever change.
- The Products and Projects pages fall back to sample data if Supabase isn't configured yet, so the site is fully browsable during setup.
- Google Business Profile / verified review sourcing was not available publicly at build time, so testimonial content is professional placeholder copy — swap in real reviews via the Admin → Reviews panel once available.
