'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { loadResult, saveToHistory } from '@/lib/resultStorage';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SaveModal({ open, onClose }: Props) {
  const router = useRouter();
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Focus first CTA when modal opens
  useEffect(() => {
    if (open) firstFocusRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-modal-title"
        className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-5"
        style={{ backgroundColor: '#1C2A1E' }}
      >
        {/* Icon */}
        <div className="text-4xl text-center select-none">🔖</div>

        {/* Copy */}
        <div className="text-center">
          <h2 id="save-modal-title" className="text-xl font-bold text-brand-text">
            Save your cook plan
          </h2>
          <p className="text-brand-muted text-sm mt-2 leading-relaxed">
            Save this cook to your browser to access it later without needing an account.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            ref={firstFocusRef}
            onClick={() => {
              const result = loadResult();
              if (result) saveToHistory(result);
              router.push('/saves');
            }}
            className="w-full bg-[#3A4A3E] hover:bg-[#4A5A4E] transition-colors text-white font-bold px-6 py-3 rounded-xl text-center text-sm"
          >
            Save to My Saves
          </button>
        </div>

        {/* Dismiss */}
        <button
          onClick={onClose}
          className="text-brand-muted hover:text-brand-text text-xs text-center transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
