# PROJECT BRIEF: Dynamic BBQ & Slow Cook Calculator

**Project Name:** Dynamic BBQ & Slow Cook Calculator
**Archetype:** TYPE 02 - B2C SaaS
**Version:** v1.0
**Created:** 2026-02-22

---

## Vision

A specialized interactive web calculator that removes the guesswork from slow cooking and smoking meat. Users input their exact meat type, cut, cooking method, and weight in kilograms and receive a mathematically customised cooking plan — including appliance temperature, estimated cook time, target internal temperature, critical milestones, and resting time. Metric-first (kg/Celsius), targeting home cooks and BBQ enthusiasts outside the US-centric pound/Fahrenheit space.

---

## Goals

- Help users confidently prepare perfectly cooked, tender meat every time
- Eliminate guesswork caused by rigid, weight-agnostic recipes
- Provide accurate time planning for long cooks (8–16 hours)
- Serve metric-system users underserved by existing BBQ resources
- Build a free, high-value tool with architecture ready for future monetisation

---

## Requirements

### v1 (MVP)
- Cooking method selector: Smoker, Slow Cooker, Oven
- Meat category + specific cut selector
- Weight input in kilograms
- Results output: appliance temperature, cook time range, target internal temperature, critical milestone alerts (stall, wrap, rest), resting time
- Metric-first: all values in kg and Celsius
- Instant use — no signup required to calculate
- Progressive auth: users prompted to save after viewing results
- Supabase auth (email + Google)
- Saved cooks dashboard: view, re-run, delete past calculations
- Mobile-responsive design
- Deployed to Vercel with custom domain

### v2 (Post-launch)
- Monetisation / paid tier (TBD)
- Additional meat types and cuts
- Print / share a cook plan
- Push reminders ("your brisket needs wrapping in 30 mins")
- Cook notes / personal annotations

### Out of Scope (v1)
- Native mobile app
- Social or community features
- Multiple languages
- Payment processing

---

## Milestones

### Milestone 1: Foundation
- [ ] TASK-001: Next.js + Tailwind project setup and configuration
- [ ] TASK-002: Supabase project created, auth and DB schema configured
- [ ] TASK-003: Basic layout, navigation shell, mobile-responsive design system

### Milestone 2: Calculator Engine
- [ ] TASK-004: Meat database (all cuts, methods, formulas)
- [ ] TASK-005: Calculation logic (cook time, temps, critical milestones, rest times)
- [ ] TASK-006: Full calculator UI flow (method → cut → weight → results)

### Milestone 3: Results & Cook Plan
- [ ] TASK-007: Results page with full cook profile output
- [ ] TASK-008: Critical milestone cards (stall warning, wrap point, rest time)
- [ ] TASK-009: Cook timeline display

### Milestone 4: User Accounts & Save Feature
- [ ] TASK-010: Progressive signup prompt ("Save this cook")
- [ ] TASK-011: Supabase auth integration (email + Google)
- [ ] TASK-012: Saved cooks dashboard — view, re-run, delete

### Milestone 5: SEO & Launch Prep
- [ ] TASK-013: Landing page with value proposition copy
- [ ] TASK-014: Meta tags, sitemap, structured data
- [ ] TASK-015: PostHog analytics integration
- [ ] TASK-016: Vercel deployment + custom domain setup

---

## Success Criteria

- User can select method, cut, weight and receive a complete cook plan in under 10 seconds
- All calculations use metric (kg/Celsius) exclusively
- Calculator works fully without an account
- Logged-in users can save and retrieve past cooks
- Site passes Lighthouse mobile score > 90
- Deployed and accessible via custom domain on Vercel

---

**Project approved for execution.**
