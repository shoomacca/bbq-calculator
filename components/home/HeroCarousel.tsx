'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  {
    id: 'pork',
    icon: '🐷',
    label: 'Pork',
    headline: 'Low & slow pork glory',
    body: 'Shoulder, ribs, belly — all day in the smoke.',
  },
  {
    id: 'beef',
    icon: '🐄',
    label: 'Beef',
    headline: 'Brisket? Say less.',
    body: 'Melt-in-your-mouth beef, every single time.',
  },
  {
    id: 'chicken',
    icon: '🐔',
    label: 'Chicken',
    headline: 'From rubbery to legendary',
    body: "Never serve dry chicken again. Promise.",
  },
  {
    id: 'lamb',
    icon: '🐑',
    label: 'Lamb',
    headline: 'The fancy option',
    body: "Smoky shoulder, perfect leg — looks hard, isn't.",
  },
  {
    id: 'fish',
    icon: '🐟',
    label: 'Fish',
    headline: 'Yes, you can smoke fish',
    body: "Hot-smoked salmon that'll genuinely blow minds.",
  },
  {
    id: 'veggies',
    icon: '🥦',
    label: 'Vegetables',
    headline: 'Plants deserve smoke too',
    body: 'Smoked cauliflower. Smoked garlic paste. Trust us.',
  },
  {
    id: 'jerky',
    icon: '🥩',
    label: 'Jerky & Dried',
    headline: 'DIY snack game activated',
    body: 'Make your own jerky. Surprisingly not complicated.',
  },
];

export default function HeroCarousel() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centeredIdx, setCenteredIdx] = useState(0);

  const updateCentered = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
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
    itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const handleCook = () => {
    const cat = CATEGORIES[centeredIdx];
    sessionStorage.setItem('bbq_initial_cat', cat.id);
    router.push('/calculator');
  };

  const centered = CATEGORIES[centeredIdx];

  return (
    <div className="flex flex-col w-full" style={{ gap: 0 }}>
      {/* Dot navigation */}
      <div className="flex justify-center gap-2 py-4">
        {CATEGORIES.map((_, i) => (
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

      {/* Carousel */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar py-8"
        style={{
          scrollSnapType: 'x mandatory',
          paddingLeft: 'calc(50% - 90px)',
          paddingRight: 'calc(50% - 90px)',
          gap: '20px',
        }}
      >
        {CATEGORIES.map((cat, i) => {
          const offset = i - centeredIdx;
          const isCenter = offset === 0;
          const rotation = Math.sign(offset) * Math.min(22, Math.abs(offset) * 11);
          const scale = isCenter ? 1.25 : Math.max(0.6, 1 - Math.abs(offset) * 0.15);
          const opacity = Math.abs(offset) > 3 ? 0 : Math.max(0.2, 1 - Math.abs(offset) * 0.25);

          return (
            <div
              key={cat.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => scrollToIdx(i)}
              style={{ scrollSnapAlign: 'center', flexShrink: 0, width: '180px' }}
              className="cursor-pointer"
            >
              <div
                className="transition-all duration-300 flex flex-col items-center"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  opacity,
                  transformOrigin: 'center bottom',
                }}
              >
                <div
                  className="w-40 h-44 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all duration-300 select-none"
                  style={{
                    background: '#F2EDD7',
                    border: isCenter ? '3px solid #2A5236' : '2px solid #3A6B4A',
                    boxShadow: isCenter
                      ? '0 24px 64px rgba(230,126,34,0.35), 0 8px 24px rgba(0,0,0,0.5)'
                      : '0 4px 16px rgba(0,0,0,0.35)',
                  }}
                >
                  <span className="text-7xl leading-none">{cat.icon}</span>
                  <span className="font-bold text-sm" style={{ color: '#162818' }}>{cat.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic headline */}
      <div className="flex flex-col items-center text-center px-6 pt-2 pb-6 gap-2 min-h-[80px]">
        <h2
          key={centered.id}
          className="text-2xl sm:text-3xl font-black text-brand-text italic leading-tight transition-all"
        >
          {centered.headline}
        </h2>
        <p className="text-brand-muted text-sm">{centered.body}</p>
      </div>

      {/* CTA */}
      <div className="px-6 pb-8">
        <button
          onClick={handleCook}
          className="w-full bg-brand-secondary hover:bg-brand-primary transition-colors text-white font-black text-lg px-8 py-4 rounded-2xl tracking-wide"
        >
          Cook {centered.label} →
        </button>
      </div>
    </div>
  );
}
