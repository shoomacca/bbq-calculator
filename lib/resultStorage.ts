import type { CalculatorResult } from '@/types/calculator';

const KEY = 'bbq_result';
const HISTORY_KEY = 'bbq_history';

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
}

export type SavedCook = CalculatorResult & { 
  saveId: string; 
  savedAt: string;
  rating?: number; // 1-5 stars
  notes?: string;
};

export function saveToHistory(result: CalculatorResult): void {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const newSave: SavedCook = {
    ...result,
    saveId: crypto.randomUUID(),
    savedAt: new Date().toISOString()
  };
  history.unshift(newSave);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function updateHistory(saveId: string, updates: Partial<SavedCook>): void {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const index = history.findIndex(h => h.saveId === saveId);
  if (index !== -1) {
    history[index] = { ...history[index], ...updates };
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}

export function getHistory(): SavedCook[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedCook[];
  } catch {
    return [];
  }
}

export function deleteFromHistory(saveId: string): void {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const updated = history.filter(h => h.saveId !== saveId);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}
