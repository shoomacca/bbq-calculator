'use client';

import { useState } from 'react';

interface Props {
  cutName: string;
  initialWeight: number | null;
  onSubmit: (weightKg: number) => void;
  onBack: () => void;
}

export default function WeightStep({ cutName, initialWeight, onSubmit, onBack }: Props) {
  const [value, setValue] = useState<string>(initialWeight?.toString() ?? '');

  const weightKg = parseFloat(value);
  const isValid = !isNaN(weightKg) && weightKg >= 0.1 && weightKg <= 30;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit(weightKg);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <div className="text-center mt-4">
        <button
          onClick={onBack}
          className="text-white/40 hover:text-[#FAF6E9] text-sm mb-6 inline-flex items-center gap-2 transition-colors font-bold uppercase tracking-widest"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-[#FAF6E9] tracking-tight">How much are you cooking?</h2>
        <p className="text-[#5A9B6A] text-sm font-bold mt-3 uppercase tracking-wider">{cutName}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4">
        <div className="flex flex-col items-center gap-2">
          
          <div 
            className="w-full rounded-[2rem] p-6 flex items-center justify-center gap-2 transition-colors duration-500"
            style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: isValid && value ? '2px solid #5A9B6A' : '2px solid rgba(255,255,255,0.05)',
              boxShadow: isValid && value ? 'inset 0 0 30px rgba(90, 155, 106, 0.1), 0 0 20px rgba(90, 155, 106, 0.2)' : 'none'
            }}
          >
            <input
              id="weight"
              type="number"
              min="0.1"
              max="30"
              step="0.1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-[#FAF6E9] text-7xl font-bold focus:outline-none w-[160px] text-right tracking-tighter"
              style={{ paddingRight: '0.2em' }}
              autoFocus
            />
            <span className="text-white/30 font-bold text-3xl pb-2">kg</span>
          </div>
          {value && !isValid ? (
            <p className="text-red-400 text-xs font-bold uppercase tracking-wider mt-4">Enter a weight between 0.1 and 30 kg</p>
          ) : (
             <p className="text-transparent text-xs font-bold uppercase tracking-wider mt-4 pointer-events-none select-none">Spacer</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 text-[#0A150D] font-bold px-6 py-5 rounded-2xl text-lg shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: '#FAF6E9' }}
        >
          Calculate My Cook Plan →
        </button>
      </form>
    </div>
  );
}
