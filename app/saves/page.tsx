'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getHistory, deleteFromHistory, saveResult, type SavedCook } from '@/lib/resultStorage';

export default function SavesPage() {
  const router = useRouter();
  const [state, setState] = useState<{ mounted: boolean; saves: SavedCook[] }>({ mounted: false, saves: [] });

  useEffect(() => {
    setState({ mounted: true, saves: getHistory() });
  }, []);

  const handleLoad = (save: SavedCook) => {
    saveResult(save); // Sets it as active in sessionStorage
    router.push('/results');
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteFromHistory(id);
    setState(prev => ({ ...prev, saves: getHistory() }));
  };

  if (!state.mounted) return null;

  return (
    <div 
      className="relative w-full flex flex-col items-center pb-20"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col pt-4">
        <h1 className="text-3xl font-bold text-[#FAF6E9] mb-8" style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}>My Saves</h1>

        {state.saves.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-xl font-bold text-[#FAF6E9] mb-2">No saved cooks yet</h2>
            <p className="text-white/60 mb-6">Calculate a cook plan and save it to see it here.</p>
            <button
              onClick={() => router.push('/calculator')}
              className="bg-[#3A4A3E] hover:bg-[#4A5A4E] transition-colors text-white font-bold px-6 py-3 rounded-xl text-sm"
            >
              Start a new cook
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.saves.map((save) => {
              const cutName = save.cutName;
              const dateObj = new Date(save.savedAt);
              const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
              
              return (
                <div 
                  key={save.saveId}
                  onClick={() => handleLoad(save)}
                  className="group relative bg-[#1C2A1E] border border-white/5 hover:border-[#5A9B6A]/50 transition-colors cursor-pointer rounded-2xl p-5 flex flex-col gap-3 overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-xs text-[#5A9B6A] font-bold uppercase tracking-wider mb-1">{save.method}</span>
                      <h3 className="text-xl font-bold text-[#FAF6E9] leading-tight">{cutName}</h3>
                    </div>
                    <button 
                      onClick={(e) => handleDelete(e, save.saveId)}
                      className="text-white/20 hover:text-red-400 transition-colors p-2 -mt-2 -mr-2"
                      aria-label="Delete save"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60 mt-2">
                    <div className="flex items-center gap-1.5 border border-white/10 rounded-lg px-2.5 py-1">
                      <span>⚖️</span> {save.weightKg} kg
                    </div>
                    <div className="flex items-center gap-1.5 border border-white/10 rounded-lg px-2.5 py-1">
                      <span>⏱️</span> {save.cookTimeHours} hr
                    </div>
                  </div>

                  <div className="text-xs text-white/30 mt-2">
                    Saved {dateStr}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
