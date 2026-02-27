'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { loadResult, clearResult } from '@/lib/resultStorage';
import { nowTimeString, addHours } from '@/lib/timeUtils';
import { formatCookTime } from '@/lib/calculator';
import ResultsCard from '@/components/calculator/ResultsCard';
import MilestoneCard from '@/components/calculator/MilestoneCard';
import SaveModal from '@/components/results/SaveModal';
import type { CalculatorResult } from '@/types/calculator';

function ResultsInner() {
  const router = useRouter();

  const [result] = useState<CalculatorResult | null>(() => loadResult());
  const [startTime, setStartTime] = useState<string>(() =>
    typeof window !== 'undefined' ? nowTimeString() : ''
  );
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    if (!result) router.replace('/calculator');
  }, [result, router]);

  if (!result) return null;

  const totalHours = result.cookTimeHours + result.restMinutes / 60;

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
      
      <div className="relative z-10 w-full max-w-2xl mx-auto py-6 px-4 flex flex-col gap-8">

        <ResultsCard result={result} />

        {/* Save CTA */}
        <button
          onClick={() => setShowSaveModal(true)}
          className="w-full transition-all duration-300 transform hover:scale-[1.02] text-[#0A150D] font-bold px-6 py-4 rounded-2xl text-base shadow-xl flex justify-center items-center gap-2"
          style={{ background: '#FAF6E9' }}
        >
          <span className="text-xl">🔖</span> Save this cook
        </button>

        {/* Start time picker */}
        <div 
          className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 border border-white/5"
          style={{ background: 'rgba(255,255,255,0.03)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
        >
          <div className="flex-1">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Start time</p>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-transparent text-[#FAF6E9] text-2xl font-bold focus:outline-none cursor-pointer"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          {startTime && (
            <div className="sm:text-right">
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Ready at</p>
              <p className="text-[#5A9B6A] text-2xl font-bold">
                {addHours(startTime, totalHours)}
              </p>
            </div>
          )}
        </div>

        {/* Cook Timeline */}
        <div>
          <h3 className="text-xl font-bold text-[#FAF6E9] mb-6 tracking-tight">Cook Timeline</h3>
          {result.milestones.length > 0 ? (
            <div className="flex flex-col">
              {result.milestones.map((milestone, i) => (
                <MilestoneCard
                  key={i}
                  milestone={milestone}
                  index={i}
                  timeOffsetLabel={`~${formatCookTime(milestone.timeOffsetHours)} in`}
                  clockTime={startTime ? addHours(startTime, milestone.timeOffsetHours) : undefined}
                  isLast={i === result.milestones.length - 1}
                />
              ))}
            </div>
          ) : (
            <p className="text-white/50 text-sm font-medium bg-black/20 rounded-2xl px-6 py-6 border border-white/5 text-center">
               No specific milestones for this cook — watch the clock and probe for doneness.
            </p>
          )}
        </div>

        {/* Start new cook */}
        <button
          onClick={() => { clearResult(); router.push('/calculator'); }}
          className="w-full transition-all duration-300 border-2 rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-wide"
          style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
          onMouseEnter={(e) => {
             e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
             e.currentTarget.style.color = '#FAF6E9';
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
             e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          ← Start new cook
        </button>

      </div>

      <SaveModal open={showSaveModal} onClose={() => setShowSaveModal(false)} />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsInner />
    </Suspense>
  );
}
