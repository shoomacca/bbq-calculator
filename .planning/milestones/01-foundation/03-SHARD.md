# Shard 1.3: App Shell & Design System

**Goal:** Build the root layout, navigation header, footer, and establish the visual design system so all future pages have a consistent, mobile-responsive shell.

**Dependencies:** Shard 1.1, 1.2

---

## Tasks

### 1. Define Design Tokens
- **Files:** `tailwind.config.ts`, `app/globals.css`
- **Action:** Extend Tailwind with brand colours and font:
  ```typescript
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#C0392B',   // deep red / ember
          secondary: '#E67E22', // warm orange / fire
          dark: '#1A1A1A',      // charcoal background
          surface: '#2C2C2C',   // card/surface background
          text: '#F5F5F5',      // primary text
          muted: '#9E9E9E',     // secondary text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  }
  ```
  Add Google Fonts import for Inter in `globals.css`.
- **Verify:** Brand colours available as Tailwind classes (`bg-brand-primary` etc.)

### 2. Build Root Layout
- **Files:** `app/layout.tsx`
- **Action:** Create root layout with:
  - HTML lang="en"
  - Dark background (`bg-brand-dark`)
  - Header component
  - Main content area with `min-h-screen`
  - Footer component
  - Correct metadata (title template, description)
- **Verify:** Layout wraps all pages correctly

### 3. Build Header Component
- **Files:** `components/Header.tsx`
- **Action:** Create responsive header with:
  - Logo/site name "BBQ Calculator" on the left
  - Mobile hamburger menu (hidden on desktop)
  - Desktop nav links: Home, My Saves
  - Sticky positioning
- **Verify:** Renders on mobile (375px) and desktop (1280px) without overflow

### 4. Build Footer Component
- **Files:** `components/Footer.tsx`
- **Action:** Simple footer with:
  - Copyright line
  - "Metric BBQ Calculator — kg & °C only"
  - Links: Home
- **Verify:** Renders at bottom of page

### 5. Create Home Page Placeholder
- **Files:** `app/page.tsx`
- **Action:** Create a minimal home page with:
  - Hero heading: "Know Exactly When Your BBQ Is Done"
  - Subheading: "Enter your meat, weight, and cooking method — get a precise cook plan."
  - CTA button: "Start Calculating" (links to `/calculator` — placeholder for M2)
- **Verify:** Page renders, button visible, no console errors

---

## Done When
- [ ] Brand colours defined and working in Tailwind
- [ ] Root layout wraps all pages with header and footer
- [ ] Header is responsive — no overflow on 375px mobile
- [ ] Home page renders with hero text and CTA button
- [ ] `npm run build` passes with zero errors
- [ ] No TypeScript errors (`npx tsc --noEmit` clean)
