'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useCalculator } from '@/lib/useCalculator';
import { calculateCook, getMeatCategories } from '@/lib/calculator';
import { saveResult } from '@/lib/resultStorage';
import MethodStep from '@/components/calculator/MethodStep';
import CategoryStep from '@/components/calculator/CategoryStep';
import CutStep from '@/components/calculator/CutStep';
import WeightStep from '@/components/calculator/WeightStep';

function ProgressBar({ current, total }: { current: number; total: number }) {
  const labels = total === 3
    ? ['Method', 'Cut', 'Weight']
    : ['Category', 'Method', 'Cut', 'Weight'];

  return (
    <div className="flex items-center gap-2 mb-10 px-4 w-full max-w-sm mx-auto">
      {labels.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 z-10 relative">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500"
                style={{
                  background: isDone ? '#2A5236' : isActive ? 'rgba(42,82,54,0.3)' : 'rgba(255,255,255,0.05)',
                  border: isActive ? '2px solid #5A9B6A' : isDone ? '2px solid #2A5236' : '2px solid rgba(255,255,255,0.1)',
                  color: isDone || isActive ? '#FAF6E9' : 'rgba(255,255,255,0.3)',
                  boxShadow: isActive ? '0 0 16px rgba(90,155,106,0.3)' : 'none'
                }}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <span 
                className="text-[10px] uppercase tracking-wider absolute top-10 whitespace-nowrap hidden sm:block transition-colors duration-500"
                style={{ color: isActive ? '#FAF6E9' : 'rgba(255,255,255,0.4)', fontWeight: isActive ? 700 : 500 }}
              >
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div 
                className="flex-1 h-[2px] mb-[2px] transition-all duration-500" 
                style={{ background: isDone ? '#5A9B6A' : 'rgba(255,255,255,0.1)' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CalculatorInner() {
  const router = useRouter();
  const [initialCat] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const cat = sessionStorage.getItem('bbq_initial_cat') ?? undefined;
    if (cat) sessionStorage.removeItem('bbq_initial_cat');
    return cat;
  });

  const { state, setCategory, setMethod, setCut, goBack } = useCalculator(initialCat);

  const pre = state.categoryPreSelected;
  const totalSteps = pre ? 3 : 4;

  const handleWeightSubmit = (weightKg: number) => {
    if (!state.method || !state.categoryId || !state.cutId) return;
    const result = calculateCook({
      method: state.method,
      categoryId: state.categoryId,
      cutId: state.cutId,
      weightKg,
    });
    saveResult(result);
    router.push('/results');
  };

  const cutName = (() => {
    if (!state.categoryId || !state.cutId) return '';
    const cats = getMeatCategories();
    const cat = cats.find((c) => c.id === state.categoryId);
    return cat?.cuts.find((c) => c.id === state.cutId)?.name ?? '';
  })();

  const handleBack = () => {
    if (pre && state.step === 1) {
      router.push('/');
    } else {
      goBack();
    }
  };

  return (
    <div 
      className="relative w-full flex flex-col items-center pb-20"
    >
      {/* Fog/Smoke overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% -20%, rgba(200,220,200,0.06) 0%, transparent 60%)',
        }}
      />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col pt-4">
        <ProgressBar current={state.step} total={totalSteps} />

      {/* Free mode: step 1 = category */}
      {!pre && state.step === 1 && (
        <CategoryStep
          method={null}
          selected={state.categoryId}
          onSelect={setCategory}
          onBack={() => router.push('/')}
        />
      )}

      {/* Method step */}
      {((pre && state.step === 1) || (!pre && state.step === 2)) && (
        <MethodStep
          selected={state.method}
          categoryId={state.categoryId}
          onSelect={setMethod}
          onBack={handleBack}
        />
      )}

      {/* Cut step */}
      {((pre && state.step === 2) || (!pre && state.step === 3)) && state.method && state.categoryId && (
        <CutStep
          method={state.method}
          categoryId={state.categoryId}
          selected={state.cutId}
          onSelect={setCut}
          onBack={handleBack}
        />
      )}

      {/* Weight step */}
      {((pre && state.step === 3) || (!pre && state.step === 4)) && (
        <WeightStep
          cutName={cutName}
          initialWeight={state.weightKg}
          onSubmit={handleWeightSubmit}
          onBack={handleBack}
        />
      )}
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense>
      <CalculatorInner />
    </Suspense>
  );
}
