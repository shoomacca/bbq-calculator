'use client';

import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';

export interface CarouselItem {
  id: string;
  icon: string;
  label: string;
  sublabel?: string;
}

interface Props {
  items: CarouselItem[];
  onSelect: (id: string) => void;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  ctaPrefix?: string;
}

const GAP = 24;

/* ── Responsive card size ──────────────────────────────────────────────────── */
function useCardSize() {
  const [cardW, setCardW] = useState(180);
  useLayoutEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCardW(268);
      else if (window.innerWidth >= 768) setCardW(220);
      else setCardW(180);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cardW;
}

function isTouch() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}

export default function ScrollCarousel({
  items,
  onSelect,
  title,
  subtitle,
  onBack,
  ctaPrefix = 'Choose',
}: Props) {
  const cardW = useCardSize();
  const containerRef   = useRef<HTMLDivElement>(null);
  const itemRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const [centeredIdx, setCenteredIdx] = useState(0);
  const centeredIdxRef = useRef(0);

  const isDragging   = useRef(false);
  const dragStartX   = useRef(0);
  const scrollStartX = useRef(0);
  const hasDragged   = useRef(false);

  const clickTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClickIdx = useRef<number | null>(null);

  const rafId = useRef<number>(0);
  const STRIDE = cardW + GAP;

  /* ── rAF transform loop ────────────────────────────────────────────────── */
  const tick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;

    let closestIdx  = 0;
    let closestDist = Infinity;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const inner = innerRefs.current[i];
      if (!inner) return;

      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const rawOff   = (elCenter - center) / STRIDE;
      const absOff   = Math.abs(rawOff);

      const scale   = absOff < 0.5 ? 1.08 - absOff * 0.1 : Math.max(0.6, 1.03 - absOff * 0.13);
      const rotate  = Math.max(-20, Math.min(20, rawOff * 10));
      const opacity = absOff > 3.5 ? 0 : Math.max(0.2, 1 - absOff * 0.22);

      inner.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
      inner.style.opacity   = String(opacity);

      const dist = Math.abs(elCenter - center);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });

    if (closestIdx !== centeredIdxRef.current) {
      centeredIdxRef.current = closestIdx;
      setCenteredIdx(closestIdx);
    }
  }, [STRIDE]);

  useLayoutEffect(() => {
    rafId.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(tick);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
  }, [cardW, tick]);

  /* ── Helpers ────────────────────────────────────────────────────────────── */
  const scrollToIdx = (idx: number) => {
    itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current   = true;
    hasDragged.current   = false;
    dragStartX.current   = e.clientX;
    scrollStartX.current = containerRef.current?.scrollLeft ?? 0;
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 6) hasDragged.current = true;
    if (containerRef.current) containerRef.current.scrollLeft = scrollStartX.current - dx;
  };
  const onMouseUp = () => { isDragging.current = false; };

  const handleCardClick = (i: number) => {
    if (hasDragged.current) { hasDragged.current = false; return; }
    if (isTouch()) {
      if (i === centeredIdxRef.current) onSelect(items[i].id);
      else scrollToIdx(i);
    } else {
      if (clickTimer.current !== null && lastClickIdx.current === i) {
        clearTimeout(clickTimer.current);
        clickTimer.current   = null;
        lastClickIdx.current = null;
        scrollToIdx(i);
        setCenteredIdx(i);
        centeredIdxRef.current = i;
        onSelect(items[i].id);
      } else {
        scrollToIdx(i);
        lastClickIdx.current = i;
        clickTimer.current = setTimeout(() => {
          clickTimer.current   = null;
          lastClickIdx.current = null;
        }, 350);
      }
    }
  };

  const centeredItem = items[centeredIdx];
  const emojiSize    = cardW >= 268 ? '8.5rem' : cardW >= 220 ? '7rem' : '5.5rem';
  const halfCard     = cardW / 2;

  return (
    /* No flex-1 here — parent (calculator page) handles vertical centering */
    <div className="flex flex-col">

      {/* ── Header ── constrained width ─────────────────────────────────── */}
      <div className="max-w-2xl mx-auto w-full px-4 pb-3">
        {onBack && (
          <button
            onClick={onBack}
            className="text-brand-muted hover:text-brand-text text-sm mb-3 flex items-center gap-1 transition-colors"
          >
            ← Back
          </button>
        )}
        <h2 className="text-xl font-bold text-brand-text">{title}</h2>
        {subtitle && <p className="text-brand-muted text-sm mt-1">{subtitle}</p>}
        {!isTouch() && (
          <p className="text-brand-muted/40 text-xs mt-1">Double-click an icon to select</p>
        )}
      </div>

      {/* ── Dot nav ─────────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 mb-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIdx(i)}
            className={`rounded-full transition-all duration-200 ${
              i === centeredIdx
                ? 'w-6 h-2 bg-brand-secondary'
                : 'w-2 h-2 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* ── Carousel — full width ─────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
        style={{
          scrollSnapType: 'x mandatory',
          paddingLeft:  `calc(50% - ${halfCard}px)`,
          paddingRight: `calc(50% - ${halfCard}px)`,
          gap: `${GAP}px`,
          paddingTop:    '1.5rem',
          paddingBottom: '1.5rem',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            onClick={() => handleCardClick(i)}
            style={{ scrollSnapAlign: 'center', flexShrink: 0, width: `${cardW}px` }}
            className="cursor-pointer"
          >
            <div
              ref={(el) => { innerRefs.current[i] = el; }}
              style={{ transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
            >
              <div
                className="rounded-3xl flex flex-col items-center justify-center gap-3 select-none"
                style={{
                  width:     cardW,
                  height:    cardW,
                  background: '#F2EDD7',
                  border:    i === centeredIdx ? '3px solid #2A5236' : '2px solid #3A6B4A',
                  boxShadow: i === centeredIdx
                    ? '0 24px 64px rgba(230,126,34,0.35), 0 8px 24px rgba(0,0,0,0.5)'
                    : '0 4px 16px rgba(0,0,0,0.35)',
                  transition: 'border 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <span style={{ fontSize: emojiSize, lineHeight: 1 }}>{item.icon}</span>
                <span className="font-bold text-base" style={{ color: '#162818' }}>{item.label}</span>
                {item.sublabel && (
                  <span className="text-xs text-center px-3 leading-tight" style={{ color: '#4a7a5a' }}>
                    {item.sublabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA — constrained width, sits immediately below carousel ─────── */}
      {centeredItem && (
        <div className="max-w-2xl mx-auto w-full px-4 pt-2 pb-2">
          <button
            onClick={() => onSelect(centeredItem.id)}
            className="w-full bg-brand-secondary hover:bg-brand-primary transition-colors text-white font-black text-lg px-8 py-4 rounded-2xl tracking-wide"
          >
            {ctaPrefix} {centeredItem.label} →
          </button>
        </div>
      )}
    </div>
  );
}
