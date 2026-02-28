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

  // Specific emojis per cut for better visuals
  const CUT_ICONS: Record<string, string> = {
    // Pork
    pork_shoulder: '🍖',
    baby_back_ribs: '🦴',
    pork_belly: '🥓',
    pork_leg: '🍖',
    sausage: '🌭',
    
    // Beef
    brisket: '🥩',
    beef_short_ribs: '🦴',
    chuck_roast: '🥩',
    rump_roast: '🥩',
    
    // Chicken
    whole_chicken: '🐔',
    chicken_thighs: '🍗',
    chicken_wings: '🍗',
    
    // Lamb
    lamb_shoulder: '🍖',
    leg_of_lamb: '🍖',
    lamb_ribs: '🦴',
    
    // Fish
    salmon_fillet: '🍣',
    whole_trout: '🐟',
    mackerel_fillet: '🐟',
    swordfish_steak: '🥩',
    tuna_steak: '🍣',
    whole_snapper: '🐟',
    
    // Veggies
    corn_on_cob: '🌽',
    bell_peppers: '🫑',
    eggplant: '🍆',
    zucchini: '🥒',
    portobello_mushrooms: '🍄',
    whole_garlic: '🧄',
    cauliflower: '🥦',
    beetroot: '🧅', 
    
    // Jerky
    beef_jerky: '🥓',
    venison_jerky: '🥓',
    chicken_jerky: '🥓',
    salmon_jerky: '🥓',
    pork_jerky: '🥓',
    
    // Veal & Turkey
    veal_rack: '🦴',
    whole_turkey: '🦃',
  };

  const getFallbackIcon = (catId: string) => {
    const map: Record<string, string> = {
      beef: '🐮', pork: '🐷', chicken: '🐔', lamb: '🐑',
      fish: '🐟', veggies: '🌽', jerky: '🥓', veal: '🐄', turkey: '🦃'
    };
    return map[catId] || '🥩';
  };

  const items = cuts.map((cut) => {
    const isFlat = cut.timeMode[method] === 'flat';
    const timeStr = isFlat
      ? `~${cut.flatCookHours[method]} hrs`
      : `~${cut.hoursPerKg[method]} hrs/kg`;
    
    return {
      id: cut.id,
      icon: CUT_ICONS[cut.id] || getFallbackIcon(categoryId),
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
