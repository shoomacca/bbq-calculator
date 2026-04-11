export interface GearItem {
  slug: string;
  name: string;
  category: string;
  description: string;
  priceAUD: number;
  affiliateUrl: string;
}

export const GEAR: GearItem[] = [
  // ── Thermometers ─────────────────────────────────────────────────────────────
  {
    slug: 'meater-plus',
    name: 'MEATER Plus Smart Thermometer',
    category: 'Thermometers',
    description: 'Wireless probe + app tracks internal/ambient up to 100m — perfect for brisket stall without opening the smoker.',
    priceAUD: 250,
    affiliateUrl: 'https://www.amazon.com.au/dp/B08F7TT8QJ?tag=bsbsbs0f-22',
  },
  {
    slug: 'thermapen-one',
    name: 'ThermoWorks Thermapen ONE',
    category: 'Thermometers',
    description: '1-second ±0.3°C accuracy — checks chicken thighs and rib doneness instantly. The gold standard.',
    priceAUD: 140,
    affiliateUrl: 'https://www.amazon.com.au/dp/B09B2M5N3P?tag=bsbsbs0f-22',
  },
  {
    slug: 'inkbird-wireless',
    name: 'Inkbird Wireless Thermometer',
    category: 'Thermometers',
    description: 'Budget dual-probe that monitors smoker temp and meat simultaneously. Solid value.',
    priceAUD: 80,
    affiliateUrl: 'https://www.amazon.com.au/s?k=inkbird+bbq&tag=bsbsbs0f-22',
  },

  // ── Tools & Accessories ───────────────────────────────────────────────────────
  {
    slug: 'wiltshire-bar-b-pack',
    name: 'Wiltshire BAR-B PACK Tool Set',
    category: 'Tools & Accessories',
    description: 'Spatula + tongs starter kit handles ribs and brisket without bark damage.',
    priceAUD: 40,
    affiliateUrl: 'https://www.amazon.com.au/dp/B01M2X5LH7?tag=bsbsbs0f-22',
  },
  {
    slug: 'multi-tool-bbq-kit',
    name: 'Multi-Tool BBQ Gear Kit',
    category: 'Tools & Accessories',
    description: 'All-in-one set with enlarged tools for flipping large cuts safely — spatulas, tongs, forks, and more.',
    priceAUD: 35,
    affiliateUrl: 'https://www.amazon.com.au/dp/B0CGX3ZGBK?tag=bsbsbs0f-22',
  },
  {
    slug: 'blackstone-bbq-accessories',
    name: '35-Piece BBQ Accessories Set',
    category: 'Tools & Accessories',
    description: 'Pro spatulas and turners sized for brisket, ribs, and veg — nothing tears or slips.',
    priceAUD: 50,
    affiliateUrl: 'https://www.amazon.com.au/dp/B0DRJMDW7S?tag=bsbsbs0f-22',
  },
  {
    slug: 'burger-buddy',
    name: 'Jackson Barrett Burger Buddy',
    category: 'Tools & Accessories',
    description: 'Burger press + holder for perfect smash burgers on your smoker or grill.',
    priceAUD: 30,
    affiliateUrl: 'https://www.amazon.com.au/dp/B0CWBX2MRV?tag=bsbsbs0f-22',
  },
  {
    slug: 'portable-grill-basket',
    name: 'Portable Stainless Grill Basket',
    category: 'Tools & Accessories',
    description: 'Non-stick basket for fish, veg, and wings — nothing falls through the grates.',
    priceAUD: 25,
    affiliateUrl: 'https://www.amazon.com.au/dp/B0FYCB5GJG?tag=bsbsbs0f-22',
  },
  {
    slug: 'gsi-spray-bottle',
    name: 'Continuous Spray Bottle',
    category: 'Tools & Accessories',
    description: 'Fine mist vinegar spritz that builds moisture and flavour layers on ribs throughout the cook.',
    priceAUD: 25,
    affiliateUrl: 'https://www.amazon.com.au/s?k=continuous+bbq+spray&tag=bsbsbs0f-22',
  },
  {
    slug: 'zwilling-tongs',
    name: 'Zwilling 16" BBQ Tongs',
    category: 'Tools & Accessories',
    description: 'Long locking stainless tongs — prevents bark tears when flipping and keeps hands well clear of heat.',
    priceAUD: 35,
    affiliateUrl: 'https://www.amazon.com.au/s?k=zwilling+bbq+tongs&tag=bsbsbs0f-22',
  },
  {
    slug: 'weber-chimney',
    name: 'Weber Chimney Starter',
    category: 'Tools & Accessories',
    description: 'Lights perfect even coals fast — no lighter fluid, no mess. Works on any charcoal setup.',
    priceAUD: 45,
    affiliateUrl: 'https://www.amazon.com.au/s?k=weber+chimney&tag=bsbsbs0f-22',
  },
  {
    slug: 'oxo-bbq-turner',
    name: 'OXO Good Grips BBQ Turner',
    category: 'Tools & Accessories',
    description: 'Wide stainless turner that lifts whole brisket slices cleanly — a grip that doesn\'t slip.',
    priceAUD: 25,
    affiliateUrl: 'https://www.amazon.com.au/s?k=oxo+bbq+turner&tag=bsbsbs0f-22',
  },
  {
    slug: 'pit-barrel-hooks',
    name: 'Pit Barrel Hanging Hooks',
    category: 'Tools & Accessories',
    description: 'Stainless hooks for vertical rib and pork shoulder hanging — maximises airflow and even smoke.',
    priceAUD: 20,
    affiliateUrl: 'https://www.amazon.com.au/s?k=bbq+hanging+hooks&tag=bsbsbs0f-22',
  },
  {
    slug: 'bbq-dragon-firebox',
    name: 'BBQ Dragon Firebox',
    category: 'Tools & Accessories',
    description: 'Perfect charcoal temp control for offset and UDS smokers — dials in your fire precisely.',
    priceAUD: 120,
    affiliateUrl: 'https://www.amazon.com.au/s?k=bbq+dragon+firebox&tag=bsbsbs0f-22',
  },

  // ── Safety & Protection ───────────────────────────────────────────────────────
  {
    slug: 'grill-society-gloves',
    name: 'Grill Society Disposable BBQ Gloves',
    category: 'Safety & Protection',
    description: 'Nitrile outer + reusable liners = clean raw meat handling with zero cross-contamination risk.',
    priceAUD: 25,
    affiliateUrl: 'https://www.amazon.com.au/dp/B086V7266M?tag=bsbsbs0f-22',
  },
  {
    slug: 'bbq-resting-blanket',
    name: 'BBQ Resting Blanket Pack',
    category: 'Safety & Protection',
    description: 'Insulated towels keep pork shoulder and brisket hot for 1+ hour during the rest.',
    priceAUD: 20,
    affiliateUrl: 'https://www.amazon.com.au/dp/B0G3H79P77?tag=bsbsbs0f-22',
  },
  {
    slug: 'grill-heat-aid-gloves',
    name: 'Grill Heat Aid Silicone Gloves',
    category: 'Safety & Protection',
    description: '800°C silicone protection for grabbing hot brisket straight off the grate.',
    priceAUD: 45,
    affiliateUrl: 'https://www.amazon.com.au/s?k=grill+heat+aid+gloves&tag=bsbsbs0f-22',
  },
  {
    slug: 'heat-mat-set',
    name: 'Heat Resistant BBQ Mat Set',
    category: 'Safety & Protection',
    description: 'Protects decks and patios from grease drips during long cooks — easy to clean after.',
    priceAUD: 35,
    affiliateUrl: 'https://www.amazon.com.au/s?k=bbq+heat+mat&tag=bsbsbs0f-22',
  },

  // ── Charcoal & Wood ───────────────────────────────────────────────────────────
  {
    slug: 'kingsford-oak-chunks',
    name: 'Kingsford Oak Wood Chunks',
    category: 'Charcoal & Wood',
    description: 'Medium steady smoke for 12+ hour brisket cooks without bitterness — a reliable classic.',
    priceAUD: 30,
    affiliateUrl: 'https://www.amazon.com.au/s?k=kingsford+oak+chunks&tag=bsbsbs0f-22',
  },
  {
    slug: 'traeger-apple-pellets',
    name: 'Traeger Apple Pellets',
    category: 'Charcoal & Wood',
    description: 'Mild fruit smoke perfect for chicken, pork belly, and ribs — complements without overpowering.',
    priceAUD: 40,
    affiliateUrl: 'https://www.amazon.com.au/s?k=traeger+apple+pellets&tag=bsbsbs0f-22',
  },
  {
    slug: 'cast-iron-smoker-box',
    name: 'Cast Iron Smoker Box',
    category: 'Charcoal & Wood',
    description: 'Adds wood chunks to gas BBQs for authentic smoke flavour — turns any grill into a smoker.',
    priceAUD: 25,
    affiliateUrl: 'https://www.amazon.com.au/s?k=cast+iron+smoker+box&tag=bsbsbs0f-22',
  },

  // ── Rubs & Seasonings ─────────────────────────────────────────────────────────
  {
    slug: 'meat-church-holy-gospel',
    name: 'Meat Church Holy Gospel Rub',
    category: 'Rubs & Seasonings',
    description: 'Garlic-herb rub that creates competition-level bark on pork and ribs — one of the best off the shelf.',
    priceAUD: 25,
    affiliateUrl: 'https://www.amazon.com.au/s?k=meat+church+holy+gospel&tag=bsbsbs0f-22',
  },

  // ── Cookware ──────────────────────────────────────────────────────────────────
  {
    slug: 'lodge-cast-iron-skillet',
    name: 'Lodge 12" Cast Iron Skillet',
    category: 'Cookware',
    description: 'Cast iron for smoker burnt ends, cornbread, or roasting veg — goes straight into the fire.',
    priceAUD: 50,
    affiliateUrl: 'https://www.amazon.com.au/s?k=lodge+12+cast+iron&tag=bsbsbs0f-22',
  },
  {
    slug: 'peach-butcher-paper',
    name: 'Peach BBQ Butcher Paper',
    category: 'Cookware',
    description: 'Breathable wrap that retains brisket moisture while preserving bark — the Texas crutch done right.',
    priceAUD: 50,
    affiliateUrl: 'https://www.amazon.com.au/s?k=pink+butcher+paper+bbq&tag=bsbsbs0f-22',
  },
  {
    slug: 'kamado-heat-deflector',
    name: 'Kamado Joe Heat Deflector',
    category: 'Cookware',
    description: 'Ceramic platesetter that enables indirect low-n-slow cooking on any kamado — essential kit.',
    priceAUD: 150,
    affiliateUrl: 'https://www.amazon.com.au/s?k=kamado+heat+deflector&tag=bsbsbs0f-22',
  },
];

export const GEAR_CATEGORIES = [
  { id: 'All',                 emoji: '' },
  { id: 'Thermometers',        emoji: '🌡️' },
  { id: 'Tools & Accessories', emoji: '🛠️' },
  { id: 'Safety & Protection', emoji: '🧤' },
  { id: 'Charcoal & Wood',     emoji: '🪵' },
  { id: 'Rubs & Seasonings',   emoji: '🧂' },
  { id: 'Cookware',            emoji: '🍳' },
];
