# Shard 3.2: Save Cook CTA

**Goal:** Add a prominent "Save this cook" button to the results page that opens an auth prompt modal (UI only — actual auth wired in M4).

**Dependencies:** 3.1

---

## Tasks

### Task 1: Save CTA button on results page
- Files: `app/results/page.tsx`
- Action:
  - Add a sticky or prominent "Save this cook" button below the ResultsCard and above the timeline
  - Style: full-width, brand-primary background, bold — make it the most prominent CTA on the page
  - On click: set local state `showSaveModal = true`
- Verify: Button is visible on mobile and desktop, tap/click opens the modal state

### Task 2: Save modal component
- Files: `components/results/SaveModal.tsx`
- Action: Create a modal overlay component:
  - Props: `open: boolean`, `onClose: () => void`
  - When open: full-screen backdrop (dark semi-transparent) + centred card
  - Card content:
    - Heading: "Save your cook plan"
    - Body: "Create a free account to save cooks, access your history, and recalculate anytime."
    - Two buttons:
      - "Create free account" → `href="/signup"` (page not built yet — M4 will create it)
      - "Log in" → `href="/login"` (same)
    - Dismiss: "Maybe later" text link that calls `onClose`
  - Trap focus, close on backdrop click, close on Escape key
- Verify: Modal opens and closes correctly; buttons are visible; accessible (keyboard dismissible)

### Task 3: "Start new cook" button
- Files: `app/results/page.tsx`
- Action:
  - Add a secondary "← Start new cook" button at the bottom of the results page
  - On click: clear `bbq_result` from sessionStorage, then `router.push('/calculator')`
  - Ensure the existing "Start Over" button (if still present from M2) is replaced by this
- Verify: Clicking restarts the flow from the beginning; sessionStorage is cleared

---

## Done When
- [ ] "Save this cook" button is visible and prominent on the results page on mobile
- [ ] Clicking the button opens the save modal
- [ ] Modal shows sign-up and log-in CTAs
- [ ] Modal closes via backdrop click, Escape key, and "Maybe later" link
- [ ] "Start new cook" button navigates back to `/calculator` and clears session
- [ ] `npm run build` passes, no type errors
