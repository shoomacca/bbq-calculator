'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollCarousel, { CarouselItem } from '@/components/calculator/ScrollCarousel';
import Footer from '@/components/Footer';

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
/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);

  const handleCook = () => {
    sessionStorage.setItem('bbq_initial_cat', CATEGORIES[activeIdx].category);
    router.push('/calculator');
  };

  const scrollItems: CarouselItem[] = CATEGORIES.map((c) => ({
    id: c.category,
    icon: c.icon,
    label: c.label,
    sublabel: c.sublabel,
  }));

  const activeCut = CATEGORIES[activeIdx];

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center min-h-[100dvh]">
      {/* ── UI layer ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col flex-1 justify-center max-w-[1400px] mx-auto pt-24 px-4 pb-12">

        <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col justify-center">
          <ScrollCarousel 
            items={scrollItems}
            title="Smoke Master"
            subtitle="Swipe to select what you're cooking today."
            onChange={(id) => {
              const idx = CATEGORIES.findIndex(c => c.category === id);
              if (idx !== -1 && idx !== activeIdx) setActiveIdx(idx);
            }}
            onSelect={() => handleCook()}
          />

          <div className="text-center mt-10 min-h-[200px] flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={SPRING}
                className="flex flex-col items-center"
              >
                 <p className="text-[#FAF6E9] text-2xl md:text-3xl font-black tracking-tight">{activeCut.headline}</p>
                 <p className="text-white/60 text-base md:text-lg mt-3 max-w-sm mx-auto font-medium">{activeCut.body}</p>
                 
                 {/* CTA Button */}
                 <div className="mt-8">
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
            </AnimatePresence>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
