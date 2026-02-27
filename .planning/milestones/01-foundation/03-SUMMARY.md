# Shard 1.3 Summary: App Shell & Design System

**Executed:** 2026-02-22
**Status:** Complete ✓

## Tasks Completed

### Task 1: Define Design Tokens
- **Files:** `app/globals.css`
- **Changes:** Replaced default styles with Tailwind v4 `@theme` CSS variables for brand colours (`brand-primary`, `brand-secondary`, `brand-dark`, `brand-surface`, `brand-text`, `brand-muted`) and Inter font family
- **Commit:** `6134d77`

### Task 2: Build Root Layout
- **Files:** `app/layout.tsx`
- **Changes:** Inter font via `next/font/google`, dark background body, `flex-col min-h-screen` shell, Header + Footer wrappers, title template metadata
- **Commit:** `9ef263b`

### Task 3: Build Header Component
- **Files:** `components/Header.tsx`
- **Changes:** Sticky header with logo, desktop nav (Home, My Saves), mobile hamburger toggle with open/close SVG icon
- **Commit:** `9ef263b`

### Task 4: Build Footer Component
- **Files:** `components/Footer.tsx`
- **Changes:** Simple footer with copyright, "Metric BBQ Calculator — kg & °C only" tagline, Home link
- **Commit:** `9ef263b`

### Task 5: Create Home Page Placeholder
- **Files:** `app/page.tsx`
- **Changes:** Hero heading, subheading, "Start Calculating" CTA button linking to `/calculator`
- **Commit:** `9ef263b`

## Verification
- [x] Brand colours defined and working via Tailwind v4 `@theme`
- [x] Root layout wraps all pages with header and footer
- [x] Header is responsive — hamburger on mobile, nav on desktop
- [x] Home page renders with hero text and CTA button
- [x] `npm run build` passes with zero errors
- [x] No TypeScript errors (`npx tsc --noEmit` clean)

## Notes
- Tailwind v4 uses CSS-based `@theme` block instead of `tailwind.config.ts` — no JS config file needed
- Inter loaded via `next/font/google` for optimal performance (no external CSS import)
