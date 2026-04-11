'use client';

import { useEffect, useMemo, useState } from 'react';

interface GearItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  affiliate_url: string;
  image_url: string | null;
  description: string | null;
  recommended_for: string | null;
  sort_order: number;
}

const CATEGORY_ORDER = [
  'Thermometers',
  'Smokers',
  'Charcoal & Fuel',
  'Rubs & Seasonings',
  'Accessories',
];

const CATEGORY_EMOJI: Record<string, string> = {
  'Thermometers': '🌡️',
  'Smokers': '🔥',
  'Charcoal & Fuel': '🪨',
  'Rubs & Seasonings': '🧂',
  'Accessories': '🛠️',
};

function SkeletonCard() {
  return (
    <div className="bg-brand-surface rounded-xl p-4 flex flex-col gap-3 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-full" />
      <div className="h-3 bg-white/5 rounded w-2/3" />
      <div className="h-8 bg-white/5 rounded-lg w-24 mt-1" />
    </div>
  );
}

function GearCard({ item }: { item: GearItem }) {
  return (
    <div className="bg-brand-surface border border-white/8 rounded-xl p-4 flex flex-col gap-2">
      <p className="text-brand-text font-semibold text-sm leading-snug">{item.name}</p>
      {item.description && (
        <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">{item.description}</p>
      )}
      <div className="mt-auto pt-2">
        <a
          href={`/go/${item.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-80"
          style={{ background: '#f97316' }}
        >
          Shop →
        </a>
      </div>
    </div>
  );
}

export default function GearPage() {
  const [gear, setGear] = useState<GearItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    fetch('/api/gear')
      .then((r) => r.json())
      .then(({ gear }) => { setGear(gear ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Build category list from loaded data, preserving order
  const categories = useMemo(() => {
    const present = new Set(gear.map((g) => g.category));
    return ['All', ...CATEGORY_ORDER.filter((c) => present.has(c))];
  }, [gear]);

  const filtered = useMemo(
    () => activeCategory === 'All' ? gear : gear.filter((g) => g.category === activeCategory),
    [gear, activeCategory]
  );

  // Group by category for the "All" view
  const grouped = useMemo(() => {
    if (activeCategory !== 'All') return null;
    const map: Record<string, GearItem[]> = {};
    for (const item of filtered) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    return map;
  }, [filtered, activeCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-brand-text text-2xl font-bold">BBQ Gear</h1>
        <p className="text-brand-muted text-sm mt-1">
          Kit we recommend — every link supports BBQ Pro
        </p>
      </div>

      {/* Category tabs */}
      {!loading && (
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: activeCategory === cat ? '#f97316' : 'rgba(255,255,255,0.07)',
                color: activeCategory === cat ? 'white' : undefined,
                border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {cat !== 'All' && CATEGORY_EMOJI[cat] ? `${CATEGORY_EMOJI[cat]} ` : ''}{cat}
            </button>
          ))}
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* All categories view — grouped with section headers */}
      {!loading && grouped && (
        <div className="flex flex-col gap-10">
          {CATEGORY_ORDER.filter((cat) => grouped[cat]?.length).map((cat) => (
            <section key={cat}>
              <h2 className="text-brand-text font-bold text-base mb-4">
                {CATEGORY_EMOJI[cat]} {cat}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {grouped[cat].map((item) => (
                  <GearCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Single category view — flat grid */}
      {!loading && !grouped && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <GearCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Affiliate disclosure */}
      {!loading && (
        <p className="text-brand-muted/40 text-xs text-center mt-12">
          BBQ Pro may earn a commission from qualifying purchases via links on this page.
        </p>
      )}

    </div>
  );
}
