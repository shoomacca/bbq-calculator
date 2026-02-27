# Shard 3.1: Dedicated /results Route

**Goal:** Move cook results out of the inline calculator flow and onto a dedicated `/results` page that holds the full cook profile.

**Dependencies:** None

---

## Tasks

### Task 1: Create result storage utility
- Files: `lib/resultStorage.ts`
- Action: Create two functions:
  - `saveResult(result: CalculatorResult): void` — JSON serializes the result to `sessionStorage` under key `bbq_result`
  - `loadResult(): CalculatorResult | null` — reads and deserializes from `sessionStorage`, returns null if missing or invalid
- Verify: TypeScript compiles, no runtime errors

### Task 2: Create /results page
- Files: `app/results/page.tsx`
- Action:
  - `'use client'` page wrapped in `<Suspense>`
  - On mount, call `loadResult()`. If null, `router.push('/calculator')` and return null
  - If result found: render the full cook plan layout:
    - `<ResultsCard result={result} />`
    - Start time picker (move `nowTimeString()` / `addHours()` helpers here from calculator/page.tsx — or import from a shared lib)
    - "Ready at" display
    - Cook timeline heading + `result.milestones.map(...)` with `<MilestoneCard />`
    - "Start new cook" button → `router.push('/calculator')`
  - Page title: `{result.cutName} Cook Plan`
- Verify: `/results` renders after a calculation; navigating directly to `/results` without a session redirects to `/calculator`

### Task 3: Update calculator to navigate to /results
- Files: `app/calculator/page.tsx`
- Action:
  - In `handleWeightSubmit`, after calling `setResult(result)`, also call `saveResult(result)` and `router.push('/results')`
  - Remove the inline results block from `CalculatorPage` (the `{isResults && ...}` section) — results now live at `/results`
  - Remove `resultsStep` logic that's no longer needed
  - Keep `useCalculator` state clean — it can still hold `result` in memory but no longer renders it inline
  - Move `nowTimeString()` and `addHours()` to `lib/timeUtils.ts` and import from there in both places
- Verify: Completing the calculator weight step redirects to `/results`; back navigation from `/results` goes to `/calculator`

---

## Done When
- [ ] `/results` is a real Next.js route accessible at `localhost:3000/results`
- [ ] Completing calculator → entering weight → automatically lands on `/results` with full cook data
- [ ] Navigating directly to `/results` with no session redirects to `/calculator`
- [ ] All cook profile fields visible: cook time, appliance temp, pull/doneness, rest, rub, wood, milestones
- [ ] `npm run build` passes
