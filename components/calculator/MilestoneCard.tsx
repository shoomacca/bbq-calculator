'use client';

import type { CookMilestone } from '@/types/calculator';

interface Props {
  milestone: CookMilestone;
  index: number;
  /** Formatted clock time string, e.g. "2:30 PM" */
  clockTime?: string;
  /** Relative offset label, e.g. "~4 hrs 45 min in" */
  timeOffsetLabel?: string;
  /** Hide the trailing vertical connector on the last card */
  isLast?: boolean;
}

export default function MilestoneCard({ milestone, index, clockTime, timeOffsetLabel, isLast }: Props) {
  return (
    <div className="flex gap-4 items-start relative group">
      {/* Timeline connector */}
      <div className="flex flex-col items-center gap-1 shrink-0 pt-1 relative z-10">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-transform duration-500 group-hover:scale-110"
          style={{ 
            background: 'rgba(10,21,13,0.8)', 
            border: '2px solid rgba(90, 155, 106, 0.4)',
            boxShadow: '0 0 12px rgba(90, 155, 106, 0.2)'
          }}
        >
          {milestone.icon}
        </div>
        {/* Vertical line — hidden on last card */}
        {!isLast && (
          <div 
            className="w-0.5 flex-1 min-h-6 transition-colors duration-500" 
            style={{ background: 'linear-gradient(to bottom, rgba(90, 155, 106, 0.3), rgba(255, 255, 255, 0.05))' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 pb-8 pt-1">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">
            Step {index + 1}
          </span>
          {timeOffsetLabel && (
            <span 
              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}
            >
              {timeOffsetLabel}
            </span>
          )}
          {clockTime && (
            <span 
              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ background: 'rgba(90, 155, 106, 0.15)', color: '#5A9B6A' }}
            >
              {clockTime}
            </span>
          )}
        </div>
        <span className="text-[#FAF6E9] font-bold text-base tracking-tight">{milestone.label}</span>
        <p className="text-white/50 text-xs font-medium leading-relaxed max-w-sm">{milestone.description}</p>
      </div>
    </div>
  );
}
