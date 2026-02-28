'use client';

import ScrollCarousel from './ScrollCarousel';
import { getCategoriesForMethod } from '@/lib/calculator';
import type { CookingMethod } from '@/types/calculator';

interface Props {
  method: CookingMethod;
  categoryId: string;
  selected: string | null;
  onSelect: (cutId: string) => void;
  onBack: () => void;
}

export default function CutStep({ method, categoryId, onSelect, onBack }: Props) {
  const categories = getCategoriesForMethod(method);
  const category = categories.find((c) => c.id === categoryId);
  const cuts = category?.cuts ?? [];

  const CATEGORY_ICONS: Record<string, string> = {
    beef: '🐮',
    pork: '🐷',
    chicken: '🐔',
    lamb: '🐑',
    fish: '🐟',
    veggies: '🌽',
    jerky: '🥓',
    veal: '🐄',
    turkey: '🦃',
  };
  const dynamicIcon = CATEGORY_ICONS[categoryId] || '🥩';

  const items = cuts.map((cut) => {
    const isFlat = cut.timeMode[method] === 'flat';
    const timeStr = isFlat
      ? `~${cut.flatCookHours[method]} hrs`
      : `~${cut.hoursPerKg[method]} hrs/kg`;
    return {
      id: cut.id,
      icon: dynamicIcon,
      label: cut.name,
      sublabel: `${timeStr} · pull ${cut.internalTempC[method]}°C`,
    };
  });

  return (
    <ScrollCarousel
      items={items}
      onSelect={onSelect}
      title="Choose your cut"
      subtitle={`${category?.name ?? ''} cuts for this method`}
      onBack={onBack}
      ctaPrefix="Cook"
    />
  );
}
