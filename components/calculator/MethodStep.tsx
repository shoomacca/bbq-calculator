'use client';

import ScrollCarousel from './ScrollCarousel';
import { getMethodsForCategory } from '@/lib/calculator';
import type { CookingMethod } from '@/types/calculator';

const ALL_METHODS = [
  { id: 'smoker',      icon: '💨', label: 'Smoker',      sublabel: 'Low & slow · 110°C' },
  { id: 'oven',        icon: '🔥', label: 'Oven',        sublabel: 'Roasting · 150°C'   },
  { id: 'slow_cooker', icon: '🍲', label: 'Slow Cooker', sublabel: 'Low & slow · 8hrs'  },
  { id: 'rotisserie',  icon: '🔄', label: 'Rotisserie',  sublabel: 'Spit · 180°C'       },
  { id: 'dehydrator',  icon: '🌬️', label: 'Dehydrator',  sublabel: 'Drying · 57°C'      },
];

interface Props {
  selected: CookingMethod | null;
  categoryId: string | null;
  onSelect: (method: CookingMethod) => void;
  onBack?: () => void;
}

export default function MethodStep({ categoryId, onSelect, onBack }: Props) {
  const available = categoryId ? getMethodsForCategory(categoryId) : ALL_METHODS.map((m) => m.id as CookingMethod);
  const items = ALL_METHODS.filter((m) => available.includes(m.id as CookingMethod));

  return (
    <ScrollCarousel
      items={items}
      onSelect={(id) => onSelect(id as CookingMethod)}
      title="How are you cooking it?"
      subtitle="Scroll to browse, then tap to choose"
      onBack={onBack}
    />
  );
}
