import type { CalculatorInput, CalculatorResult } from '@/types/calculator';

const KEY = 'bbq_result';
const INPUT_KEY = 'bbq_input';

export function saveResult(result: CalculatorResult): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEY, JSON.stringify(result));
}

export function loadResult(): CalculatorResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CalculatorResult;
  } catch {
    return null;
  }
}

export function clearResult(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(KEY);
  sessionStorage.removeItem(INPUT_KEY);
}

export function saveInput(input: CalculatorInput): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(INPUT_KEY, JSON.stringify(input));
}

export function loadInput(): CalculatorInput | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(INPUT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CalculatorInput;
  } catch {
    return null;
  }
}
