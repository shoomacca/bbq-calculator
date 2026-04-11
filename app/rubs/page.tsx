import type { Metadata } from 'next';
import { RUBS, RUB_CATEGORIES, type RubItem } from '@/data/rubs';

export const metadata: Metadata = {
  title: 'BBQ Rubs | BBQ Cook Calculator',
  description: 'The best beef, pork, chicken, lamb, and fish rubs for smoking and grilling. Every link supports the site.',
};

function RubCard({ item }: { item: RubItem }) {
  return (
    <a
      href={item.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group bg-brand-surface border border-white/8 rounded-xl p-4 flex flex-col gap-2 hover:border-white/20 transition-colors"
    >
      <p className="text-brand-text font-semibold text-sm leading-snug group-hover:text-brand-secondary transition-colors">
        {item.name}
      </p>
      <p className="text-brand-muted text-xs leading-relaxed flex-1">{item.tagline}</p>
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

export default function RubsPage() {
  const grouped = RUB_CATEGORIES.slice(1).reduce<Record<string, RubItem[]>>((acc, cat) => {
    acc[cat.id] = RUBS.filter((r) => r.category === cat.id);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-brand-text text-2xl font-bold">BBQ Rubs & Seasonings</h1>
        <p className="text-brand-muted text-sm mt-1">
          30 rubs sorted by meat — every link supports BBQ Calculator
        </p>
      </div>

      {/* Categories grouped with section headers */}
      <div className="flex flex-col gap-10">
        {RUB_CATEGORIES.slice(1).map(({ id, emoji }) => {
          const items = grouped[id];
          if (!items?.length) return null;
          return (
            <section key={id}>
              <h2 className="text-brand-text font-bold text-base mb-4">
                {emoji} {id}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => (
                  <RubCard key={item.slug} item={item} />
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
