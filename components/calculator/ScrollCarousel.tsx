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
  ctaPrefix?: string; // e.g. "Cook with" → "Cook with Smoker"
}

export default function ScrollCarousel({
  items,
  onSelect,
  title,
  subtitle,
  onBack,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centeredIdx, setCenteredIdx] = useState(0);

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
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });
    setCenteredIdx(closestIdx);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateCentered, { passive: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateCentered();
    return () => container.removeEventListener('scroll', updateCentered);
  }, [updateCentered]);

  const scrollToIdx = (idx: number) => {
    const el = itemRefs.current[idx];
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="px-4 text-center mt-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-white/40 hover:text-[#FAF6E9] text-sm mb-6 inline-flex items-center gap-2 transition-colors font-bold uppercase tracking-widest"
          >
            ← Back
          </button>
        )}
        <h2 className="text-3xl font-bold text-[#FAF6E9] tracking-tight">{title}</h2>
        {subtitle && <p className="text-white/50 text-sm mt-3 font-medium">{subtitle}</p>}
      </div>

      {/* Carousel track */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 py-10 no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
          paddingLeft: 'calc(50% - 80px)',
          paddingRight: 'calc(50% - 80px)',
        }}
      >
        {items.map((item, i) => {
          const offset = i - centeredIdx;
          const isCenter = offset === 0;
          const rotation = Math.max(-18, Math.min(18, offset * 9));
          const scale = isCenter ? 1.1 : Math.max(0.68, 1 - Math.abs(offset) * 0.12);
          const opacity = Math.abs(offset) > 3 ? 0 : Math.max(0.25, 1 - Math.abs(offset) * 0.22);

          return (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => {
                if (isCenter) {
                  onSelect(item.id);
                } else {
                  scrollToIdx(i);
                }
              }}
              style={{ scrollSnapAlign: 'center', flexShrink: 0, width: '160px' }}
              className="cursor-pointer"
            >
              <div
                className="transition-all duration-300 flex flex-col items-center gap-3"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  opacity,
                  transformOrigin: 'center bottom',
                }}
              >
                {/* Card */}
                <div
                  className="w-40 h-40 rounded-[2rem] flex items-center justify-center transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: isCenter ? '#FAF6E9' : 'rgba(255,255,255,0.05)',
                    border: isCenter ? '4px solid #FAF6E9' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isCenter
                      ? '0 32px 64px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,1), 0 0 40px rgba(90, 155, 106, 0.4)'
                      : '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <span className="text-7xl select-none relative z-10" style={{ filter: isCenter ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none' }}>
                    {item.icon}
                  </span>
                </div>

                {/* Label */}
                <div className="text-center mt-2">
                  <p className={`font-bold text-base transition-colors ${isCenter ? 'text-[#FAF6E9]' : 'text-white/40'}`}>
                    {item.label}
                  </p>
                  {item.sublabel && (
                    <p className={`text-[11px] font-semibold uppercase tracking-wider mt-1 ${isCenter ? 'text-[#5A9B6A]' : 'text-white/30'}`}>
                      {item.sublabel}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIdx(i)}
            className={`rounded-full transition-all duration-300 ${
              i === centeredIdx
                ? 'w-6 h-2 bg-[#5A9B6A] shadow-[0_0_10px_rgba(90,155,106,0.6)]'
                : 'w-2 h-2 bg-white/10 hover:bg-white/30'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
