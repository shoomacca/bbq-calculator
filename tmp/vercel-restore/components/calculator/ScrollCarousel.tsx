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

export default function ScrollCarousel({
  items,
  onSelect,
  title,
  subtitle,
  onBack,
  ctaPrefix = 'Choose',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centeredIdx, setCenteredIdx] = useState(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mouse drag
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const hasDragged = useRef(false);

  const updateCentered = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(elCenter - containerCenter);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });
    setCenteredIdx(closestIdx);
  }, []);

  // Debounced version — prevents rapid re-renders during drag
  const updateCenteredDebounced = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(updateCentered, 60);
  }, [updateCentered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateCenteredDebounced, { passive: true });
    updateCentered();
    return () => {
      container.removeEventListener('scroll', updateCenteredDebounced);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [updateCentered, updateCenteredDebounced]);

  const scrollToIdx = (idx: number) => {
    itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

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
    if (Math.abs(dx) > 8) hasDragged.current = true;
    if (containerRef.current) containerRef.current.scrollLeft = scrollStartX.current - dx;
  };

  const onMouseUp = () => { isDragging.current = false; };

  const handleCardClick = (i: number) => {
    if (hasDragged.current) { hasDragged.current = false; return; }
    scrollToIdx(i);
  };

  const centeredItem = items[centeredIdx];

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
      </div>

      {/* Dot navigation — above carousel, matching home page */}
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
        className="flex overflow-x-auto gap-5 py-8 no-scrollbar cursor-grab active:cursor-grabbing select-none"
        style={{
          scrollSnapType: 'x mandatory',
          paddingLeft: 'calc(50% - 80px)',
          paddingRight: 'calc(50% - 80px)',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {items.map((item, i) => {
          const offset = i - centeredIdx;
          const isCenter = offset === 0;
          const rotation = Math.max(-18, Math.min(18, offset * 9));
          const scale = isCenter ? 1.2 : Math.max(0.68, 1 - Math.abs(offset) * 0.12);
          const opacity = Math.abs(offset) > 3 ? 0 : Math.max(0.25, 1 - Math.abs(offset) * 0.22);

          return (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => handleCardClick(i)}
              style={{ scrollSnapAlign: 'center', flexShrink: 0, width: '160px' }}
              className="cursor-pointer"
            >
              <div
                className="flex flex-col items-center gap-3"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  opacity,
                  transformOrigin: 'center bottom',
                  transition: 'transform 0.25s ease, opacity 0.25s ease',
                }}
              >
                <div
                  className="w-36 h-36 rounded-3xl flex items-center justify-center"
                  style={{
                    background: '#F2EDD7',
                    border: isCenter ? '3px solid #2A5236' : '2px solid #3A6B4A',
                    boxShadow: isCenter
                      ? '0 16px 48px rgba(230,126,34,0.28), 0 6px 20px rgba(0,0,0,0.45)'
                      : '0 3px 12px rgba(0,0,0,0.3)',
                    transition: 'border 0.25s ease, box-shadow 0.25s ease',
                  }}
                >
                  <span className="text-6xl select-none">{item.icon}</span>
                </div>
                <div className="text-center">
                  <p className={`font-bold text-sm ${isCenter ? 'text-brand-text' : 'text-brand-muted'}`}>
                    {item.label}
                  </p>
                  {item.sublabel && (
                    <p className="text-brand-muted text-xs mt-0.5">{item.sublabel}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spacer pushes CTA to bottom */}
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
