# Tech Stack

**Project:** Dynamic BBQ & Slow Cook Calculator
**Last Updated:** 2026-02-22

---

## Frontend

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14+ (App Router) | SEO-friendly, static export compatible, full-stack in one repo |
| Language | TypeScript | Type safety for calculation logic and DB models |
| Styling | Tailwind CSS | Rapid mobile-responsive UI development |
| State | React useState / Context | Calculator is simple — no heavy state library needed |
| Forms | React Hook Form + Zod | Clean weight/selection input validation |

---

## Backend

| Layer | Choice | Why |
|-------|--------|-----|
| API | Next.js API Routes | Full-stack, one codebase |
| Database | MySQL (Hostinger) | Comes with hosting, stores saved cooks |
| Auth | JWT / session cookies | Simple email+password, no external auth service |

---

## Infrastructure

| Service | Provider | Notes |
|---------|----------|-------|
| Hosting (dev/test) | Vercel | Free tier, instant deploys |
| Hosting (production) | Hostinger | 200GB storage, MySQL included |
| Domain | Hostinger | User to register |
| Analytics | PostHog | Free tier |

---

## Rationale

- **MySQL on Hostinger** — already included in hosting plan, no extra cost or external service
- **No Supabase** — unnecessary for this project
- **Next.js static export** — compatible with Hostinger hosting
