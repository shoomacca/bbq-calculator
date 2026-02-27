# Roadmap

**Project:** Dynamic BBQ & Slow Cook Calculator
**Version:** 1.0 (MVP)
**Created:** 2026-02-22
**Milestones:** 5

---

## M1: Foundation
**Status:** Complete ✓
**Completed:** 2026-02-23
**Tag:** `v0.1.0-m1`

### Deliverables
- [x] Next.js 16 project with TypeScript and Tailwind v4
- [x] MySQL schema for saved cooks (`data/schema.sql`)
- [x] App layout, navigation shell, and design tokens established
- [x] Mobile-responsive base verified (live browser check)

---

## M2: Calculator Engine
**Status:** Complete ✓
**Completed:** 2026-02-23
**Tag:** `v0.2.0-m2`

### Deliverables
- [x] Meat database defined — 33 cuts across 7 categories with all methods, formulas, rub and wood recommendations
- [x] Calculation engine — cook time, appliance temp, internal temp, critical milestones, rest time
- [x] Full calculator UI flow — method selection → meat category → cut → weight → results

---

## M3: Results & Cook Plan
**Status:** Pending

### Deliverables
- Dedicated results page with full cook profile
- Critical milestone cards (stall info, wrap point with trigger temp, rest time card)
- Cook timeline display showing phases of the cook
- "Save this cook" CTA visible to all users

### Success Criteria
- Results page displays all 5 output fields for any valid input
- Milestone cards show correct cut-specific advice
- Timeline is readable on mobile
- Save CTA is visible and clickable

---

## M4: User Accounts & Save Feature
**Status:** Pending

### Deliverables
- Supabase Auth integrated: email/password + Google OAuth
- Progressive signup flow: save prompt → auth modal → cook saved
- Saved cooks dashboard: list view with cut, weight, date
- Actions: re-run a saved cook, delete a saved cook

### Success Criteria
- User can register and log in via email or Google
- Saved cook appears in dashboard immediately after auth
- Re-running a saved cook pre-fills the calculator correctly
- RLS (Row Level Security) ensures users only see their own cooks

---

## M5: SEO & Launch Prep
**Status:** Pending

### Deliverables
- Landing page with clear value proposition, how-it-works section, and CTA
- Meta tags, Open Graph tags, sitemap.xml, robots.txt
- Structured data (JSON-LD) for search
- PostHog analytics integrated (page views + calculator completion events)
- Production deployment on Vercel with custom domain

### Success Criteria
- Lighthouse mobile score > 90 (performance + SEO)
- Custom domain resolves correctly with HTTPS
- PostHog receives events from at least one test calculation
- All pages have unique title and description meta tags
