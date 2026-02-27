# Shard 2.3: Results Display & Route

**Goal:** Wire the calculation engine to the form and build the results display so the full calculator flow works end-to-end: select → weigh → see your cook plan.

**Dependencies:** Shard 2.1, 2.2

---

## Tasks

### 1. Build Results Components
- **Files:** `components/calculator/ResultsCard.tsx`, `components/calculator/MilestoneCard.tsx`
- **Action:**

  **ResultsCard:** Displays the top-level cook summary:
  - Cut name + method badge
  - Weight entered (e.g. "2.0 kg")
  - Cook time (e.g. "~3 hrs 0 min") — format decimal hours to hrs/min
  - Appliance temperature (e.g. "Set smoker to 110°C")
  - Target internal temperature (e.g. "Pull at 95°C internal")
  - Rest time (e.g. "Rest for 60 minutes")
  Use brand colours. Make it visually scannable — big numbers, clear labels.

  **MilestoneCard:** Displays a single cook milestone:
  - Icon (emoji based on type: 🌡️ for temp trigger, ⏱️ for time, 💤 for rest)
  - Label (bold)
  - Description (muted text)
  Stack cards vertically in a "Cook Timeline" section below ResultsCard.

- **Verify:** Both components render without errors with mock data

### 2. Wire Results into Calculator Page
- **Files:** `app/calculator/page.tsx`
- **Action:** Update the calculator page to:
  - Add a 5th state: `step: 5` = results view
  - When weight is submitted, call `calculateCook()`, store the result in hook state, advance to step 5
  - Render `ResultsCard` + list of `MilestoneCard` components when `step === 5`
  - Add "Start Over" button that calls `reset()` and returns to step 1
  - Remove the `console.log` from Shard 2.2
- **Verify:** Full flow works: select method → category → cut → weight → see correct results

### 3. Update Home Page CTA
- **Files:** `app/page.tsx`
- **Action:** Update the "Start Calculating" button to link to `/calculator` (it was a placeholder in Shard 1.3 — confirm it links correctly now that the route exists).
- **Verify:** Clicking CTA from home page lands on `/calculator` step 1

### 4. End-to-End Verification
- **Files:** None (verification only)
- **Action:** Manually verify these test cases in the browser:
  1. **2kg Pork Shoulder on Smoker** → ~3 hrs, 110°C, pull at 95°C, rest 60 min, stall + wrap milestones shown
  2. **3kg Brisket on Smoker** → ~4.5 hrs, 110°C, pull at 95°C, rest 90 min, stall + wrap milestones shown
  3. **1.5kg Whole Chicken in Oven** → ~1.1 hrs, 150°C, pull at 74°C, rest 15 min
  4. Mobile layout (375px) — results are readable, no overflow
- **Verify:** All 4 test cases produce correct output with no console errors

---

## Done When
- [ ] ResultsCard and MilestoneCard render correctly on mobile
- [ ] Full calculator flow works end-to-end (step 1 → results)
- [ ] "Start Over" resets all state to step 1
- [ ] All 4 test case reference values are correct
- [ ] `npm run build` passes with no errors
- [ ] No TypeScript errors (`npx tsc --noEmit` clean)
