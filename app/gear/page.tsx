import type { Metadata } from 'next';
import { GEAR, GEAR_CATEGORIES, type GearItem } from '@/data/gear';

export const metadata: Metadata = {
  title: 'BBQ Gear | BBQ Cook Calculator',
  description: 'Thermometers, tools, wood, and rubs we actually recommend for better BBQ. Every link supports the site.',
};

function GearCard({ item }: { item: GearItem }) {
  return (
    <a
      href={item.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group bg-brand-surface border border-white/8 rounded-xl p-4 flex flex-col gap-2 hover:border-white/20 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-brand-text font-semibold text-sm leading-snug group-hover:text-brand-secondary transition-colors">
          {item.name}
        </p>
        <span className="text-brand-muted font-bold text-xs whitespace-nowrap mt-0.5">
          ~${item.priceAUD}
        </span>
      </div>
      <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">{item.description}</p>
      <div className="mt-auto pt-2">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
          style={{ background: '#f97316' }}
        >
          Shop on Amazon →
        </span>
      </div>
    </a>
  );
}

export default function GearPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  // searchParams is async in Next 15+ — read synchronously via a default
  const activeCategory = 'All'; // category filter handled client-side via JS below

  const grouped = GEAR_CATEGORIES.slice(1).reduce<Record<string, GearItem[]>>((acc, cat) => {
    acc[cat.id] = GEAR.filter((g) => g.category === cat.id);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-brand-text text-2xl font-bold">BBQ Gear</h1>
        <p className="text-brand-muted text-sm mt-1">
          Kit we actually recommend — every link supports BBQ Calculator
        </p>
      </div>

      {/* All categories — grouped with section headers */}
      <div className="flex flex-col gap-10">
        {GEAR_CATEGORIES.slice(1).map(({ id, emoji }) => {
          const items = grouped[id];
          if (!items?.length) return null;
          return (
            <section key={id}>
              <h2 className="text-brand-text font-bold text-base mb-4">
                {emoji} {id}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => (
                  <GearCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Disclosure */}
      <p className="text-brand-muted/40 text-xs text-center mt-12">
        BBQ Calculator earns a commission from qualifying Amazon purchases via links on this page.
      </p>
    </div>
  );
}
