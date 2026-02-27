# Shard 2.2: Calculator UI — Selection Flow

**Goal:** Build the multi-step calculator form — method selection, meat category & cut selection, and weight input — with state management that persists across steps.

**Dependencies:** Shard 2.1

---

## Tasks

### 1. Build Calculator State Hook
- **Files:** `lib/useCalculator.ts`
- **Action:** Create a custom hook that manages multi-step form state:
  ```typescript
  interface CalculatorState {
    step: 1 | 2 | 3 | 4; // 1=method, 2=category, 3=cut, 4=weight
    method: CookingMethod | null;
    categoryId: string | null;
    cutId: string | null;
    weightKg: number | null;
  }
  ```
  Expose: `state`, `setMethod()`, `setCategory()`, `setCut()`, `setWeight()`, `reset()`, `canSubmit` (all 4 fields set).
  Use `useState` — no external state library needed.
- **Verify:** Hook exports all expected functions, TypeScript compiles clean

### 2. Build Step Components
- **Files:** `components/calculator/MethodStep.tsx`, `components/calculator/CategoryStep.tsx`, `components/calculator/CutStep.tsx`, `components/calculator/WeightStep.tsx`
- **Action:** Build each step as a standalone component:

  **MethodStep:** Grid of cards for each cooking method (Smoker, Oven, Rotisserie, Slow Cooker). Each card has an icon (emoji is fine), method name, and short description. Highlight selected method.

  **CategoryStep:** Grid of cards for meat categories (Pork, Beef, Chicken, Lamb). Show only categories that have cuts supporting the chosen method. Back button to return to step 1.

  **CutStep:** List of cuts for the selected category, filtered to those supporting the chosen method. Show cut name and a brief note. Back button.

  **WeightStep:** Numeric input (kg). Min 0.1, max 30, step 0.1. Show "kg" label. Submit button labelled "Calculate". Back button.

  All steps use brand colours from Tailwind config. All steps are mobile-first (single column on mobile, 2-col grid on desktop where appropriate).

- **Verify:** Each component renders without errors, selected state is visually distinct

### 3. Build Calculator Page
- **Files:** `app/calculator/page.tsx`
- **Action:** Create the `/calculator` route that:
  - Instantiates `useCalculator` hook
  - Renders a progress indicator (Step 1 of 4 / Step 2 of 4 etc.)
  - Conditionally renders the correct step component based on `state.step`
  - On WeightStep submit: calls `calculateCook()` and stores result in state, then navigates to results (Shard 2.3 will wire the display — for now just `console.log` the result)
  - Page title: "BBQ Calculator"
- **Verify:** Full selection flow works on mobile — can navigate forward and back through all 4 steps without errors

---

## Done When
- [ ] `useCalculator` hook manages state across all 4 steps
- [ ] All 4 step components render correctly on mobile (375px)
- [ ] `/calculator` route shows correct step and progress indicator
- [ ] Navigating back and forward retains previously selected values
- [ ] `npm run build` passes with no errors
