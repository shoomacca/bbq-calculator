export type CookingMethod = 'smoker' | 'oven' | 'rotisserie' | 'dehydrator';

export type TimeMode = 'per_kg' | 'flat';

/** How the cut should be handled by the calculator and results UI */
export type CutCategory = 'bbq' | 'fish' | 'veggie' | 'jerky';

export interface Cut {
  id: string;
  name: string;
  methods: CookingMethod[];
  /** Defaults to 'bbq' if not set */
  cutCategory?: CutCategory;
  /** 'per_kg' scales with weight; 'flat' ignores weight (e.g. ribs, wings) */
  timeMode: Partial<Record<CookingMethod, TimeMode>>;
  hoursPerKg: Partial<Record<CookingMethod, number>>;
  flatCookHours: Partial<Record<CookingMethod, number>>;
  applianceTempC: Partial<Record<CookingMethod, number>>;
  /** Target internal temp — null for veggies (texture-based doneness) */
  internalTempC: Partial<Record<CookingMethod, number | null>>;
  restMinutes: number;
  hasStall: Partial<Record<CookingMethod, boolean>>;
  stallTempC: number | null;
  wrapTempC: Partial<Record<CookingMethod, number | null>>;
  /** USDA/food-safety minimum internal temp — 0 for veggies */
  safeMinTempC: number;
  /** For veggies: describes texture/visual cue for doneness */
  donenessCue?: string;
  /** For jerky: internal temp to reach during pre-heat step before drying */
  preheatTempC?: number;
  /** Rub or seasoning recommendation */
  rub: string;
  /** Recommended smoking wood(s) — null for cuts with no smoker method */
  wood: string | null;
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
  icon: string;
  label: string;
  description: string;
  /** Hours from cook start when this milestone is expected to occur */
  timeOffsetHours: number;
}

export interface CalculatorResult {
  cutName: string;
  categoryName: string;
  method: CookingMethod;
  weightKg: number;
  cookTimeHours: number;
  applianceTempC: number;
  /** null for veggies */
  internalTempC: number | null;
  safeMinTempC: number;
  restMinutes: number;
  isFlat: boolean;
  cutCategory: CutCategory;
  donenessCue?: string;
  preheatTempC?: number;
  milestones: CookMilestone[];
  rub: string;
  wood: string | null;
  notes: string;
}
