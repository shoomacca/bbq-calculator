'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface Cut {
  id: string;
  category: string;
  label: string;
  sublabel: string;
  headline: string;
  body: string;
  icon: string;
}

const CATEGORIES: Cut[] = [
  {
    id: 'beef',
    category: 'beef',
    label: 'Beef',
    sublabel: 'Beef',
    headline: 'The King of BBQ.',
    body: 'Brisket, ribs, and everything rich and beefy.',
    icon: '🐮',
  },
  {
    id: 'pork',
    category: 'pork',
    label: 'Pork',
    sublabel: 'Pork',
    headline: 'Sweet, smoky, perfection.',
    body: 'From ribs to pulled shoulder to sausage.',
    icon: '🐷',
  },
  {
    id: 'chicken',
    category: 'chicken',
    label: 'Chicken',
    sublabel: 'Poultry',
    headline: 'From rubbery to legendary.',
    body: 'Never serve dry chicken again. Promise.',
    icon: '🐔',
  },
  {
    id: 'lamb',
    category: 'lamb',
    label: 'Lamb',
    sublabel: 'Lamb',
    headline: 'Rich & robust.',
    body: 'Smoked lamb shoulder or leg is incredibly flavourful.',
    icon: '🐑',
  },
  {
    id: 'fish',
    category: 'fish',
    label: 'Seafood',
    sublabel: 'Seafood',
    headline: 'Yes, you can smoke fish.',
    body: 'Hot-smoked whole fish. Absolutely stunning.',
    icon: '🐟',
  },
  {
    id: 'veggies',
    category: 'veggies',
    label: 'Veggies',
    sublabel: 'Vegetables',
    headline: 'Plants deserve smoke too.',
    body: 'Smoky, meaty sides that convert even the carnivores.',
    icon: '🌽',
  },
  {
    id: 'jerky',
    category: 'jerky',
    label: 'Jerky',
    sublabel: 'Dried Meats',
    headline: 'The Ultimate Snack.',
    body: 'Intense flavour preserved to perfection.',
    icon: '🥓',
  },
  {
    id: 'veal',
    category: 'veal',
    label: 'Veal',
    sublabel: 'Beef/Calf',
    headline: 'Delicate & Tender.',
    body: 'A finer texture that absorbs smoke beautifully.',
    icon: '🐄',
  },
  {
    id: 'turkey',
    category: 'turkey',
    label: 'Turkey',
    sublabel: 'Poultry',
    headline: 'Not just for holidays.',
    body: 'Juicy, smoked turkey breast is a game changer.',
    icon: '🦃',
  },
];

/* Spring — heavy, premium */
const SPRING = { type: 'spring' as const, stiffness: 220, damping: 28, mass: 1.1 };

/* ─── Floating squircle card for non-active cuts ───────────────────────────── */
function FloatingCard({ cut }: { cut: Cut }) {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center transition-all bg-[#FAF6E9] hover:brightness-105"
      style={{
        width: 110,
        height: 110,
        borderRadius: 28,
        boxShadow: '0 16px 44px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.8)',
        border: '1px solid rgba(255,255,255,0.5)',
      }}
    >
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        <span className="text-5xl select-none" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
          {cut.icon}
        </span>
      </div>
    </div>
  );
}

/* ─── Central hero image  ─────────────────────────────────────────────────── */
function HeroImage({ cut }: { cut: Cut }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start pt-8">
      <div 
        className="w-56 h-56 rounded-[2.5rem] flex items-center justify-center transition-all duration-300 relative overflow-hidden"
        style={{
          background: '#FAF6E9',
          border: '4px solid #FAF6E9',
          boxShadow: '0 32px 64px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,1), 0 0 40px rgba(90, 155, 106, 0.4)'
        }}
      >
        <span className="text-9xl select-none relative z-10" style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.25))' }}>
           {cut.icon}
        </span>
      </div>
      <div className="text-center mt-10">
        <h2 className="text-4xl md:text-5xl font-black text-[#FAF6E9] tracking-tight">{cut.label}</h2>
        <p className="text-[#5A9B6A] font-bold text-sm tracking-widest uppercase mt-3">{cut.sublabel}</p>
        <p className="text-white/70 text-base md:text-lg mt-5 max-w-sm mx-auto font-medium">{cut.headline}</p>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);
  const [heroKey, setHeroKey] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Update on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (i: number) => {
    if (i === activeIdx) return;
    setActiveIdx(i);
    setHeroKey((k) => k + 1);
  };

  const handleCook = () => {
    sessionStorage.setItem('bbq_initial_cat', CATEGORIES[activeIdx].category);
    router.push('/calculator');
  };

  const activeCut = CATEGORIES[activeIdx];
  const numItems = CATEGORIES.length;
  
  // Responsive radius of the 3D ellipse
  const isMobile = windowWidth < 768;
  const radiusX = isMobile ? windowWidth * 0.4 : 420;
  const radiusY = isMobile ? 60 : 140;

  // Swipe handler
  const handlePanEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // Swiped left, go to next
      handleSelect((activeIdx + 1) % numItems);
    } else if (info.offset.x > swipeThreshold) {
      // Swiped right, go to previous
      handleSelect((activeIdx - 1 + numItems) % numItems);
    }
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center min-h-[100dvh]">
      {/* ── UI layer ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col flex-1 justify-center max-w-[1400px] mx-auto pt-16 px-4">

        {/* ── Center scene + floating cards ──────────────────────────────────────── */}
        <motion.div 
          className="flex-1 relative flex flex-col items-center justify-center pb-24 min-h-[600px] cursor-grab active:cursor-grabbing"
          onPanEnd={handlePanEnd}
        >

          {/* 3D Orbiting squircle cards */}
          <div className="absolute inset-x-0 top-0 bottom-32 flex items-center justify-center pointer-events-none z-10" style={{ transform: 'translateY(-15%)' }}>
            {CATEGORIES.map((cut, i) => {
              // Calculate offset relative to active item
              let currentOffset = i - activeIdx;
              if (currentOffset <= -Math.floor(numItems / 2)) currentOffset += numItems;
              if (currentOffset > Math.ceil(numItems / 2)) currentOffset -= numItems;

              // Don't render the active card in the ring (it's the hero)
              if (currentOffset === 0) return null;

              // Map the offset to an angle. 
              const angleIncrement = (Math.PI * 2) / numItems;
              // Add Math.PI/2 so the active item (offset 0) would theoretically be at the very front (bottom of the screen)
              const angle = currentOffset * angleIncrement + Math.PI / 2;

              // Use sin/cos to plot on an ellipse
              const x = Math.cos(angle) * radiusX;
              const z = Math.sin(angle); // Ranges from -1 (back, top) to 1 (front, bottom)
              const y = z * radiusY;

              const scale = 0.75 + (z * 0.20); 
              const opacity = 0.65 + (z * 0.35); 
              const zIndex = Math.round((z + 1) * 50);

              return (
                <motion.div
                  key={cut.id}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ zIndex }}
                  animate={{ x, y: y - 20, scale, opacity }}
                  transition={SPRING}
                  whileHover={{ scale: scale * 1.1, opacity: 1 }}
                  onClick={(e) => {
                    // Prevent click if we were swiping
                    if (Math.abs(e.movementX) > 5 || Math.abs(e.movementY) > 5) return;
                    handleSelect(i);
                  }}
                >
                  <FloatingCard cut={cut} />
                </motion.div>
              );
            })}
          </div>

          {/* Active central hero (Meat placed on center pile) */}
          <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none mt-12 mb-8 h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroKey}
                className="relative overflow-visible w-[500px]"
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ ...SPRING, type: 'spring', stiffness: 260, damping: 28 }}
              >
                <HeroImage cut={activeCut} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <div className="relative z-30 pointer-events-auto mt-4">
            <motion.button
              onClick={handleCook}
              className="flex items-center gap-4 group"
              style={{
                background: '#FAF6E9', // creamy white
                borderRadius: 20,
                padding: '10px 12px 10px 28px',
                color: '#1b2d1d',
                boxShadow: '0 16px 40px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.9)',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
            >
              <div className="flex flex-col items-start leading-[1.15]">
                <span className="font-bold text-[16px] tracking-tight text-[#3A2A1A]">Calculate Cook</span>
                <span className="font-black text-[13px] tracking-[0.05em] uppercase text-[#1B2D1D]">Let&apos;s Go</span>
              </div>
              <div
                className="flex items-center justify-center rounded-2xl bg-[#EBE4CA] transition-colors"
                style={{ padding: '12px' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B1A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </motion.button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
