# Shard 2.1: Meat Database & Calculation Engine

**Goal:** Define all TypeScript types, build the meat database JSON with 3+ categories and 3+ cuts each, and implement the calculation engine that produces cook time, temperatures, milestones, and rest time.

**Dependencies:** None

---

## Tasks

### 1. Define TypeScript Types
- **Files:** `types/calculator.ts`
- **Action:** Create all shared types:
  ```typescript
  export type CookingMethod = 'smoker' | 'oven' | 'rotisserie' | 'slow_cooker';

  export interface Cut {
    id: string;
    name: string;
    methods: CookingMethod[];
    // Base cook time per kg per method (hours/kg)
    hoursPerKg: Record<CookingMethod, number>;
    // Target internal temperature (°C)
    internalTemp: Record<CookingMethod, number>;
    // Appliance temperature (°C)
    applianceTemp: Record<CookingMethod, number>;
    // Rest time in minutes
    restMinutes: number;
    // Whether this cut has a stall phase
    hasStall: boolean;
    // Wrap trigger temp (°C) — null if no wrap recommended
    wrapTempC: number | null;
    // Notes specific to this cut
    notes: string;
  }

  export interface MeatCategory {
    id: string;
    name: string;
    cuts: Cut[];
  }

  export interface CalculatorInput {
    method: CookingMethod;
    categoryId: string;
    cutId: string;
    weightKg: number;
  }

  export interface CookMilestone {
    label: string;
    tempC?: number;
    timeOffset?: string; // e.g. "at ~4 hrs"
    description: string;
  }

  export interface CalculatorResult {
    cutName: string;
    method: CookingMethod;
    weightKg: number;
    cookTimeHours: number;
    applianceTempC: number;
    internalTempC: number;
    restMinutes: number;
    milestones: CookMilestone[];
    notes: string;
  }
  ```
- **Verify:** `npx tsc --noEmit` passes with no errors

### 2. Build Meat Database
- **Files:** `data/meats.json`
- **Action:** Create the full meat database with at least 3 categories and 3+ cuts each. Use this structure:

  **Categories & Cuts to include:**

  **Pork:**
  - Pork Shoulder (Boston Butt) — smoker, oven; 1.5 hrs/kg smoker, stall at ~70°C, wrap at 68°C, internal 95°C, rest 60 min
  - Pork Ribs (Baby Back) — smoker, oven; ~5.5 hrs flat (not per kg), internal 88°C, rest 15 min
  - Pork Belly — smoker, oven; 1.2 hrs/kg, internal 90°C, rest 20 min
  - Pulled Pork Leg — smoker, oven; 1.4 hrs/kg, internal 94°C, rest 45 min

  **Beef:**
  - Brisket (Full Packer) — smoker, oven; 1.5 hrs/kg, stall at ~72°C, wrap at 68°C, internal 95°C, rest 90 min
  - Beef Ribs (Short Ribs) — smoker, oven; 1.3 hrs/kg, internal 94°C, rest 30 min
  - Chuck Roast — smoker, oven, slow_cooker; 1.4 hrs/kg, internal 94°C, rest 30 min
  - Rump Roast — oven, slow_cooker; 1.0 hrs/kg, internal 70°C (medium), rest 20 min

  **Chicken:**
  - Whole Chicken — smoker, oven, rotisserie; 0.75 hrs/kg, internal 74°C (breast), rest 15 min
  - Chicken Thighs — smoker, oven; 0.6 hrs/kg, internal 82°C, rest 5 min
  - Chicken Wings — smoker, oven; 1.25 hrs flat (not per kg), internal 74°C, rest 5 min

  **Lamb:**
  - Lamb Shoulder — smoker, oven, rotisserie; 1.4 hrs/kg, internal 90°C (pulled), rest 45 min
  - Leg of Lamb — oven, rotisserie; 0.8 hrs/kg, internal 65°C (medium), rest 20 min
  - Lamb Ribs — smoker, oven; 1.1 hrs/kg, internal 88°C, rest 15 min

  Appliance temps: smoker=110°C, oven=150°C, rotisserie=180°C, slow_cooker=85°C (simulated).
  Mark ribs and wings with a `flatCookHours` property instead of `hoursPerKg` where applicable.

- **Verify:** JSON is valid, all cuts have all required fields

### 3. Build Calculation Engine
- **Files:** `lib/calculator.ts`
- **Action:** Implement `calculateCook(input: CalculatorInput): CalculatorResult`:
  - Load meat data from `data/meats.json`
  - Find the cut by `categoryId` + `cutId`
  - Calculate cook time: use `flatCookHours` if present, otherwise `hoursPerKg * weightKg`
  - Build milestones array:
    - If `hasStall`: add stall milestone at ~60% cook time ("Expect the stall — temp will plateau around X°C for 1–3 hrs. Stay patient.")
    - If `wrapTempC`: add wrap milestone ("Wrap in butcher paper or foil when probe reads X°C")
    - Always add rest milestone at end ("Rest for X minutes — cover loosely with foil")
  - Return full `CalculatorResult`
- **Verify:** Unit test (inline or separate) confirms 2kg pork shoulder on smoker = ~3 hrs cook time, applianceTempC=110, internalTempC=95, restMinutes=60

---

## Done When
- [ ] `types/calculator.ts` exists with all types, `npx tsc --noEmit` clean
- [ ] `data/meats.json` has 4 categories with 3+ cuts each, all valid JSON
- [ ] `lib/calculator.ts` exports `calculateCook()` and returns correct result for known inputs
- [ ] `npm run build` passes with no errors
