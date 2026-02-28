'use client';

import { formatCookTime } from '@/lib/calculator';
import type { CalculatorResult, CookingMethod } from '@/types/calculator';

const METHOD_LABELS: Record<CookingMethod, string> = {
  smoker:      'Smoker',
  oven:        'Oven',
  slow_cooker: 'Slow Cooker',
  rotisserie:  'Rotisserie',
  dehydrator:  'Dehydrator',
};

const METHOD_ICONS: Record<CookingMethod, string> = {
  smoker:      '💨',
  oven:        '🔥',
  slow_cooker: '🍲',
  rotisserie:  '🔄',
  dehydrator:  '🌬️',
};

interface Props {
  result: CalculatorResult;
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div 
      className="flex flex-col gap-1 rounded-2xl p-5 relative overflow-hidden group"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)'
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(90, 155, 106, 0.15) 0%, transparent 70%)',
        }}
      />
      <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest relative z-10">{label}</span>
      <span className="text-[#FAF6E9] text-3xl font-bold tracking-tight relative z-10">{value}</span>
      {sub && <span className="text-white/40 text-xs font-medium leading-relaxed relative z-10">{sub}</span>}
    </div>
  );
}

export default function ResultsCard({ result }: Props) {
  const {
    cutName,
    method,
    weightKg,
    cookTimeHours,
    applianceTempC,
    internalTempC,
    safeMinTempC,
    restMinutes,
    isFlat,
    cutCategory,
    donenessCue,
    preheatTempC,
    rub,
    wood,
    notes,
  } = result;

  const isVeggie = cutCategory === 'veggie';
  const isJerky = cutCategory === 'jerky';
  const showSafetyNote = internalTempC !== null && internalTempC < safeMinTempC;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {METHOD_ICONS[method]}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#FAF6E9] tracking-tight">{cutName}</h2>
          <span 
            className="inline-block text-xs font-bold px-3 py-1 rounded-full mt-1 uppercase tracking-wide"
            style={{ color: '#5A9B6A', background: 'rgba(90, 155, 106, 0.15)' }}
          >
            {METHOD_LABELS[method]}
          </span>
        </div>
      </div>

      {/* Jerky pre-heat warning */}
      {isJerky && preheatTempC && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-xs text-red-400">
          🌡️ <span className="font-semibold">Safety step required:</span> Bring strips to{' '}
          {preheatTempC}°C internal before or at the start of drying. See the Cook Timeline below.
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <Stat
          label={isJerky ? 'Drying Time' : 'Cook Time'}
          value={`~${formatCookTime(cookTimeHours)}`}
          sub={isFlat ? 'flat estimate · use doneness cues' : `based on ${weightKg} kg`}
        />
        <Stat
          label="Appliance Temp"
          value={`${applianceTempC}°C`}
          sub={`Set your ${METHOD_LABELS[method].toLowerCase()} to this`}
        />

        {isVeggie ? (
          <div className="col-span-2 flex flex-col gap-0.5 bg-brand-dark rounded-xl p-4">
            <span className="text-brand-muted text-xs font-medium uppercase tracking-wide">Doneness Cue</span>
            <span className="text-brand-text text-sm font-semibold leading-snug mt-1">
              {donenessCue ?? 'Test with a skewer — no resistance means it\'s ready'}
            </span>
          </div>
        ) : isJerky ? (
          <>
            <Stat
              label="Pre-heat To"
              value={`${preheatTempC}°C`}
              sub="internal — required safety step"
            />
            <Stat
              label="Dry Until"
              value="Leathery"
              sub="bends & cracks, no wet spots"
            />
          </>
        ) : (
          <>
            <Stat
              label="Pull At"
              value={`${internalTempC}°C`}
              sub="internal temperature"
            />
            <Stat
              label="Rest Time"
              value={restMinutes > 0 ? `${restMinutes} min` : 'None'}
              sub={restMinutes > 0 ? 'cover loosely with foil' : undefined}
            />
          </>
        )}
      </div>

      {/* Safety note for below-guideline pull temps (e.g. rump roast, leg of lamb) */}
      {showSafetyNote && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-amber-400">
          ⚠️ Food safety minimum is {safeMinTempC}°C — the pull temp above is for ideal doneness
          on intact whole cuts. Always rest for at least 3 minutes after pulling.
        </div>
      )}

      {/* Rub / seasoning */}
      <div 
        className="rounded-2xl px-5 py-4 text-xs text-white/60 leading-relaxed font-medium"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span className="font-bold text-[#FAF6E9]">🧂 Rub & Seasoning: </span>
        {rub}
      </div>

      {/* Wood recommendation (smoker only) */}
      {method === 'smoker' && wood && (
        <div 
          className="rounded-2xl px-5 py-4 text-xs text-white/60 leading-relaxed font-medium"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="font-bold text-[#FAF6E9]">🪵 Wood: </span>
          {wood}
        </div>
      )}

      {/* Cut-specific notes */}
      <div 
        className="rounded-2xl px-5 py-4 text-xs text-white/60 leading-relaxed font-medium"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span className="font-bold text-[#FAF6E9]">💡 Tip: </span>
        {notes}
      </div>
    </div>
  );
}
