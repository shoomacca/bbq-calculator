'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

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

const GAP = 20;

/* ── Responsive card size ──────────────────────────────────────────────── */
function useCardSize() {
  const [cardW, setCardW] = useState(160);
  useEffect(() => {
    const update = () => setCardW(window.innerWidth >= 768 ? 220 : 160);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cardW;
}

/* ── Pointer type ───────────────────────────────────────────────────────── */
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
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centeredIdx, setCenteredIdx] = useState(0);
  const centeredIdxRef = useRef(0);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const hasDragged = useRef(false);

  // Double-click state
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClickIdx = useRef<number | null>(null);

  /* ── rAF smooth transform loop ─────────────────────────────────────── */
  const rafId = useRef<number>(0);
  const STRIDE = cardW + GAP;

  const tick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const viewW = container.clientWidth;
    const center = scrollLeft + viewW / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const inner = innerRefs.current[i];
      if (!inner) return;

      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const rawOffset = (elCenter - center) / STRIDE;
      const absOff = Math.abs(rawOffset);

      const scale = absOff < 0.5
        ? 1.1 - absOff * 0.12
        : Math.max(0.6, 1.04 - absOff * 0.14);
      const rotate = Math.max(-22, Math.min(22, rawOffset * 11));
      const opacity = absOff > 3.5 ? 0 : Math.max(0.2, 1 - absOff * 0.24);

      inner.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
      inner.style.opacity = String(opacity);

      const dist = Math.abs(elCenter - center);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });

    if (closestIdx !== centeredIdxRef.current) {
      centeredIdxRef.current = closestIdx;
      setCenteredIdx(closestIdx);
    }
  }, [STRIDE]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(tick);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  /* Re-run tick when cardW changes (resize) */
  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
  }, [cardW, tick]);

  /* ── Scroll helpers ─────────────────────────────────────────────────── */
  const scrollToIdx = (idx: number) => {
    itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  /* ── Mouse drag ─────────────────────────────────────────────────────── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
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

  /* ── Click / double-click ───────────────────────────────────────────── */
  const handleCardClick = (i: number) => {
    if (hasDragged.current) { hasDragged.current = false; return; }

    if (isTouch()) {
      // Touch: single tap = centre it; if already centred, select
      if (i === centeredIdxRef.current) {
        onSelect(items[i].id);
      } else {
        scrollToIdx(i);
      }
    } else {
      // Desktop: single click = centre; double click = select
      if (clickTimer.current !== null && lastClickIdx.current === i) {
        clearTimeout(clickTimer.current);
        clickTimer.current = null;
        lastClickIdx.current = null;
        // Scroll to centre first, then select
        scrollToIdx(i);
        setCenteredIdx(i);
        centeredIdxRef.current = i;
        onSelect(items[i].id);
      } else {
        scrollToIdx(i);
        lastClickIdx.current = i;
        clickTimer.current = setTimeout(() => {
          clickTimer.current = null;
          lastClickIdx.current = null;
        }, 350);
      }
    }
  };

  const centeredItem = items[centeredIdx];
  const emojiSize = cardW >= 220 ? '7rem' : '4.5rem';
  const halfCard = cardW / 2;

  return (
    <div className="flex flex-col gap-4 flex-1">
      {/* Header */}
      <div className="px-4">
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
          <p className="text-brand-muted/50 text-xs mt-1">Double-click an icon to select</p>
        )}
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2">
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

      {/* Carousel track */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
        style={{
          scrollSnapType: 'x mandatory',
          paddingLeft: `calc(50% - ${halfCard}px)`,
          paddingRight: `calc(50% - ${halfCard}px)`,
          gap: `${GAP}px`,
          paddingTop: '2rem',
          paddingBottom: '2.5rem',
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
            {/* Inner — transforms managed directly by rAF loop via innerRefs */}
            <div
              ref={(el) => { innerRefs.current[i] = el; }}
              className="flex flex-col items-center gap-3"
              style={{
                transformOrigin: 'center bottom',
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="rounded-3xl flex flex-col items-center justify-center gap-2 select-none"
                style={{
                  width: cardW,
                  height: cardW,
                  background: '#F2EDD7',
                  border: i === centeredIdx ? '3px solid #2A5236' : '2px solid #3A6B4A',
                  boxShadow: i === centeredIdx
                    ? '0 16px 48px rgba(230,126,34,0.28), 0 6px 20px rgba(0,0,0,0.45)'
                    : '0 3px 12px rgba(0,0,0,0.3)',
                  transition: 'border 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <span style={{ fontSize: emojiSize, lineHeight: 1 }}>{item.icon}</span>
                <span className="font-bold text-sm" style={{ color: '#162818' }}>{item.label}</span>
                {item.sublabel && (
                  <span className="text-xs" style={{ color: '#4a7a5a' }}>{item.sublabel}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      {/* CTA */}
      {centeredItem && (
        <div className="px-4 pb-4">
          <button
            onClick={() => onSelect(centeredItem.id)}
            className="w-full bg-brand-primary hover:bg-brand-secondary transition-colors text-white font-semibold px-6 py-4 rounded-xl text-base"
          >
            {ctaPrefix} {centeredItem.label} →
          </button>
        </div>
      )}
    </div>
  );
}
