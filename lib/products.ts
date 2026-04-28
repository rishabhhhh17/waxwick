// Source of truth for the catalogue. No DB.
// Variant prices in PAISE so payment math stays integer-safe.

export type Variant = {
  id: string;
  label: string;
  weight_g?: number;
  volume_ml?: number;
  price_paise: number;
  stock_count: number;
  sku: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'whispering-heritage' | 'latte-collection' | 'heritage-gifting' | 'bespoke-diwali';
  base_price: number; // INR rupees, for display only
  compare_at_price?: number;
  images: string[];
  ingredients: string[];
  highlights: string[];
  notes?: { top?: string[]; heart?: string[]; base?: string[] };
  variants: Variant[];
  is_active: boolean;
  is_featured: boolean;
  rating: number;
  rating_count: number;
};

const PAISE = (rupees: number) => Math.round(rupees * 100);

export const PRODUCTS: Product[] = [
  // --- Whispering Heritage (120 ML, ₹350) ---
  {
    id: 'wh-coffee-roast',
    slug: 'coffee-roast',
    name: 'Coffee Roast',
    tagline: 'Brewed in Coorg’s heart.',
    description:
      'A deep, slow-brewed pour with smoky arabica roast at the top, warm cocoa in the middle, and a velvety steamed-milk finish. Hand-poured in our Bangalore studio with natural soy wax and a 100% cotton wick.',
    category: 'whispering-heritage',
    base_price: 350,
    images: ['/images/coffee-roast.jpg', '/images/lifestyle-tray.jpg'],
    ingredients: ['Natural soy wax', '100% authentic fragrance oil', 'Cotton wick', 'Reusable glass jar'],
    highlights: ['25–30 hr burn', 'Toxin-free', 'Hand poured', 'Reusable jar'],
    notes: { top: ['Roasted arabica'], heart: ['Cocoa', 'Caramel'], base: ['Steamed milk', 'Vanilla'] },
    variants: [
      { id: 'wh-coffee-roast-120', label: '120 ml', volume_ml: 120, price_paise: PAISE(350), stock_count: 80, sku: 'WW-CR-120' },
    ],
    is_active: true,
    is_featured: true,
    rating: 4.9,
    rating_count: 142,
  },
  {
    id: 'wh-lily-bloom',
    slug: 'lily-bloom',
    name: 'Lily Bloom',
    tagline: 'Fresh as Nilgiri Hills.',
    description:
      'A crisp, dewy floral lifted by green stems and a soft musk drydown — the way a Nilgiri morning smells before the mist burns off. Soy-poured, even melt pool, clean throw.',
    category: 'whispering-heritage',
    base_price: 350,
    images: ['/images/lily-bloom.jpg', '/images/lifestyle-tray.jpg'],
    ingredients: ['Natural soy wax', '100% authentic fragrance oil', 'Cotton wick', 'Reusable glass jar'],
    highlights: ['25–30 hr burn', 'Toxin-free', 'Hand poured', 'Reusable jar'],
    notes: { top: ['Lily', 'Green leaf'], heart: ['White floral'], base: ['Clean musk'] },
    variants: [
      { id: 'wh-lily-bloom-120', label: '120 ml', volume_ml: 120, price_paise: PAISE(350), stock_count: 80, sku: 'WW-LB-120' },
    ],
    is_active: true,
    is_featured: true,
    rating: 4.8,
    rating_count: 98,
  },
  {
    id: 'wh-royal-kashmiri-saffron',
    slug: 'royal-kashmiri-saffron',
    name: 'Royal Kashmiri Saffron',
    tagline: 'Fresh from Kashmiri hills.',
    description:
      'Real saffron warmth threaded with sandalwood and a faint amber glow. Built like an heirloom — slow, golden, unmistakable.',
    category: 'whispering-heritage',
    base_price: 350,
    images: ['/images/royal-kashmiri-saffron.jpg', '/images/lifestyle-tray.jpg'],
    ingredients: ['Natural soy wax', '100% authentic fragrance oil', 'Cotton wick', 'Reusable glass jar'],
    highlights: ['25–30 hr burn', 'Toxin-free', 'Hand poured', 'Reusable jar'],
    notes: { top: ['Saffron'], heart: ['Honey', 'Rose'], base: ['Sandalwood', 'Amber'] },
    variants: [
      { id: 'wh-royal-kashmiri-saffron-120', label: '120 ml', volume_ml: 120, price_paise: PAISE(350), stock_count: 80, sku: 'WW-KS-120' },
    ],
    is_active: true,
    is_featured: true,
    rating: 4.9,
    rating_count: 121,
  },
  {
    id: 'wh-sandalwood',
    slug: 'sandalwood',
    name: 'Sandalwood',
    tagline: 'Rooted in Mysore, forever.',
    description:
      'Creamy, woody, meditative — Mysore sandal at its most familiar, softened with a whisper of vanilla. The kind of scent that turns a room into a quiet temple.',
    category: 'whispering-heritage',
    base_price: 350,
    images: ['/images/sandalwood.jpg', '/images/lifestyle-tray.jpg'],
    ingredients: ['Natural soy wax', '100% authentic fragrance oil', 'Cotton wick', 'Reusable glass jar'],
    highlights: ['25–30 hr burn', 'Toxin-free', 'Hand poured', 'Reusable jar'],
    notes: { top: ['Bergamot'], heart: ['Sandalwood'], base: ['Vanilla', 'Cedar'] },
    variants: [
      { id: 'wh-sandalwood-120', label: '120 ml', volume_ml: 120, price_paise: PAISE(350), stock_count: 80, sku: 'WW-SW-120' },
    ],
    is_active: true,
    is_featured: true,
    rating: 4.9,
    rating_count: 167,
  },

  // --- Latte Collection (220 ML, ₹650) ---
  {
    id: 'lc-lavender-latte',
    slug: 'lavender-latte',
    name: 'Lavender Latte',
    tagline: 'Calm, served warm.',
    description:
      'Provence lavender folded into steamed oat milk with a caramel finish. Big throw — fills a 200 sq ft room without being floral-heavy.',
    category: 'latte-collection',
    base_price: 650,
    images: ['/images/lavender-latte.jpg', '/images/collection-latte.jpg'],
    ingredients: ['Natural soy wax', '100% authentic fragrance oil', 'Cotton wick', 'Wooden lid jar'],
    highlights: ['45–50 hr burn', 'Toxin-free', 'Hand poured', 'Wooden lid'],
    notes: { top: ['Lavender'], heart: ['Oat milk'], base: ['Caramel', 'Vanilla'] },
    variants: [
      { id: 'lc-lavender-latte-220', label: '220 ml', volume_ml: 220, price_paise: PAISE(650), stock_count: 60, sku: 'WW-LL-220' },
    ],
    is_active: true,
    is_featured: true,
    rating: 4.9,
    rating_count: 88,
  },
  {
    id: 'lc-iced-latte',
    slug: 'iced-latte',
    name: 'Iced Latte',
    tagline: 'Cool brew, warm glow.',
    description:
      'Chilled espresso meets fresh cream and a clean citrus lift. Crisper and brighter than Coffee Roast — for people who like their coffee with ice.',
    category: 'latte-collection',
    base_price: 650,
    images: ['/images/iced-latte.jpg', '/images/collection-latte.jpg'],
    ingredients: ['Natural soy wax', '100% authentic fragrance oil', 'Cotton wick', 'Wooden lid jar'],
    highlights: ['45–50 hr burn', 'Toxin-free', 'Hand poured', 'Wooden lid'],
    notes: { top: ['Citrus'], heart: ['Espresso'], base: ['Fresh cream'] },
    variants: [
      { id: 'lc-iced-latte-220', label: '220 ml', volume_ml: 220, price_paise: PAISE(650), stock_count: 60, sku: 'WW-IL-220' },
    ],
    is_active: true,
    is_featured: false,
    rating: 4.7,
    rating_count: 54,
  },
  {
    id: 'lc-vanilla-latte',
    slug: 'vanilla-latte',
    name: 'Vanilla Latte',
    tagline: 'Soft, sweet, all hours.',
    description:
      'Madagascar vanilla beans, a steamed-milk centre, and a powdered-sugar finish. The most-gifted candle in the studio for a reason.',
    category: 'latte-collection',
    base_price: 650,
    images: ['/images/vanilla-latte.jpg', '/images/collection-latte.jpg'],
    ingredients: ['Natural soy wax', '100% authentic fragrance oil', 'Cotton wick', 'Wooden lid jar'],
    highlights: ['45–50 hr burn', 'Toxin-free', 'Hand poured', 'Wooden lid'],
    notes: { top: ['Sugar'], heart: ['Vanilla bean'], base: ['Steamed milk'] },
    variants: [
      { id: 'lc-vanilla-latte-220', label: '220 ml', volume_ml: 220, price_paise: PAISE(650), stock_count: 60, sku: 'WW-VL-220' },
    ],
    is_active: true,
    is_featured: true,
    rating: 4.9,
    rating_count: 201,
  },
  {
    id: 'lc-biscoff-caramel-latte',
    slug: 'biscoff-caramel-latte',
    name: 'Biscoff Caramel Latte',
    tagline: 'Spiced cookie crumble.',
    description:
      'Speculoos biscuit, burnt-sugar caramel, and a hint of cinnamon. A dessert in a glass — keep one in the kitchen.',
    category: 'latte-collection',
    base_price: 650,
    images: ['/images/biscoff-caramel-latte.jpg', '/images/collection-latte.jpg'],
    ingredients: ['Natural soy wax', '100% authentic fragrance oil', 'Cotton wick', 'Wooden lid jar'],
    highlights: ['45–50 hr burn', 'Toxin-free', 'Hand poured', 'Wooden lid'],
    notes: { top: ['Cinnamon'], heart: ['Biscoff biscuit'], base: ['Burnt caramel'] },
    variants: [
      { id: 'lc-biscoff-caramel-latte-220', label: '220 ml', volume_ml: 220, price_paise: PAISE(650), stock_count: 60, sku: 'WW-BCL-220' },
    ],
    is_active: true,
    is_featured: false,
    rating: 4.8,
    rating_count: 76,
  },

  // --- Heritage Gifting (gift box duo, ₹899) ---
  {
    id: 'hg-coffee-saffron-duo',
    slug: 'heritage-gift-coffee-saffron',
    name: 'Heritage Duo — Coffee & Saffron',
    tagline: 'Two 120 ml jars, one navy gift box.',
    description:
      'Coffee Roast and Royal Kashmiri Saffron paired in our signature navy presentation box. Comes ready to gift — no extra wrapping required.',
    category: 'heritage-gifting',
    base_price: 899,
    compare_at_price: 999,
    images: ['/images/heritage-gift-coffee-saffron.jpg', '/images/collection-gifting.jpg'],
    ingredients: ['2 × 120 ml soy wax candles', 'Cotton wicks', 'Reusable glass jars', 'Branded gift box'],
    highlights: ['Pre-wrapped gift', 'Two scents', 'Reusable jars'],
    variants: [
      { id: 'hg-coffee-saffron-duo-default', label: 'Gift box (2 × 120 ml)', price_paise: PAISE(899), stock_count: 30, sku: 'WW-HG-CS' },
    ],
    is_active: true,
    is_featured: true,
    rating: 5.0,
    rating_count: 41,
  },
  {
    id: 'hg-sandal-lily-duo',
    slug: 'heritage-gift-sandal-lily',
    name: 'Heritage Duo — Sandalwood & Lily',
    tagline: 'A grounded floral pair, gift-ready.',
    description:
      'Sandalwood and Lily Bloom in the navy gift box. The pairing reads warm-then-fresh — works equally well on a study desk or a dressing table.',
    category: 'heritage-gifting',
    base_price: 899,
    compare_at_price: 999,
    images: ['/images/heritage-gift-sandal-lily.jpg', '/images/collection-gifting.jpg'],
    ingredients: ['2 × 120 ml soy wax candles', 'Cotton wicks', 'Reusable glass jars', 'Branded gift box'],
    highlights: ['Pre-wrapped gift', 'Two scents', 'Reusable jars'],
    variants: [
      { id: 'hg-sandal-lily-duo-default', label: 'Gift box (2 × 120 ml)', price_paise: PAISE(899), stock_count: 30, sku: 'WW-HG-SL' },
    ],
    is_active: true,
    is_featured: false,
    rating: 4.9,
    rating_count: 28,
  },
  {
    id: 'hg-classic-duo',
    slug: 'heritage-gift-duo-classic',
    name: 'Heritage Duo — Classic',
    tagline: 'Pick any two, we’ll box it.',
    description:
      'Our most-ordered corporate gift. Two 120 ml Whispering Heritage candles in the navy box, ready to ship. Add a note at checkout and we’ll print it.',
    category: 'heritage-gifting',
    base_price: 899,
    images: ['/images/heritage-gift-duo-classic.jpg', '/images/collection-gifting.jpg'],
    ingredients: ['2 × 120 ml soy wax candles', 'Cotton wicks', 'Reusable glass jars', 'Branded gift box'],
    highlights: ['Pre-wrapped gift', 'Two scents', 'Reusable jars'],
    variants: [
      { id: 'hg-classic-duo-default', label: 'Gift box (2 × 120 ml)', price_paise: PAISE(899), stock_count: 30, sku: 'WW-HG-C' },
    ],
    is_active: true,
    is_featured: false,
    rating: 4.9,
    rating_count: 33,
  },
  {
    id: 'hg-premium-duo',
    slug: 'heritage-gift-duo-premium',
    name: 'Heritage Duo — Premium',
    tagline: 'Saffron + Sandalwood, navy box.',
    description:
      'The bestseller of the gift line — two of our richest scents, presented in the embossed navy box. Built for festive gifting and corporate hampers.',
    category: 'heritage-gifting',
    base_price: 999,
    images: ['/images/heritage-gift-duo-premium.jpg', '/images/collection-gifting.jpg'],
    ingredients: ['2 × 120 ml soy wax candles', 'Cotton wicks', 'Reusable glass jars', 'Branded gift box'],
    highlights: ['Pre-wrapped gift', 'Two scents', 'Reusable jars'],
    variants: [
      { id: 'hg-premium-duo-default', label: 'Gift box (2 × 120 ml)', price_paise: PAISE(999), stock_count: 30, sku: 'WW-HG-P' },
    ],
    is_active: true,
    is_featured: false,
    rating: 5.0,
    rating_count: 22,
  },

  // --- Bespoke Diwali (5–7 wicks, ₹999) ---
  {
    id: 'bd-gulmohar',
    slug: 'gulmohar',
    name: 'Gulmohar',
    tagline: 'Festive flame, hand-sculpted.',
    description:
      'A multi-wick floral wax sculpture inspired by Gulmohar petals. Five hand-poured wicks burn together for a soft, festive glow — the kind of piece that goes on the centre table on Diwali night and stays there for the season.',
    category: 'bespoke-diwali',
    base_price: 999,
    images: ['/images/gulmohar.jpg', '/images/hero-diwali.jpg'],
    ingredients: ['Natural soy wax', '5–7 cotton wicks', 'Hand-sculpted form'],
    highlights: ['5–7 wicks', 'Soy wax', 'Toxin-free', 'Festive centrepiece'],
    variants: [
      { id: 'bd-gulmohar-default', label: 'Sculpted (5–7 wicks)', price_paise: PAISE(999), stock_count: 25, sku: 'WW-BD-GM' },
    ],
    is_active: true,
    is_featured: true,
    rating: 5.0,
    rating_count: 18,
  },
  {
    id: 'bd-kamal-vatika',
    slug: 'kamal-vatika',
    name: 'Kamal Vatika',
    tagline: 'A garden of lotuses.',
    description:
      'Three sculpted lotus blooms set into a leaf base, lit through hidden wicks. A heritage piece designed for puja rooms and festive tablescapes.',
    category: 'bespoke-diwali',
    base_price: 999,
    images: ['/images/kamal-vatika.jpg', '/images/hero-diwali.jpg'],
    ingredients: ['Natural soy wax', '5–7 cotton wicks', 'Hand-sculpted form'],
    highlights: ['5–7 wicks', 'Soy wax', 'Toxin-free', 'Festive centrepiece'],
    variants: [
      { id: 'bd-kamal-vatika-default', label: 'Sculpted (5–7 wicks)', price_paise: PAISE(999), stock_count: 25, sku: 'WW-BD-KV' },
    ],
    is_active: true,
    is_featured: false,
    rating: 4.9,
    rating_count: 15,
  },
  {
    id: 'bd-kamal-pushp',
    slug: 'kamal-pushp',
    name: 'Kamal Pushp',
    tagline: 'Cluster of soft blossoms.',
    description:
      'A sculpted cluster of small blossoms in dusty rose and ochre. Lights as a group; perfect on a low brass tray with marigolds.',
    category: 'bespoke-diwali',
    base_price: 999,
    images: ['/images/kamal-pushp.jpg', '/images/hero-diwali.jpg'],
    ingredients: ['Natural soy wax', '5–7 cotton wicks', 'Hand-sculpted form'],
    highlights: ['5–7 wicks', 'Soy wax', 'Toxin-free', 'Festive centrepiece'],
    variants: [
      { id: 'bd-kamal-pushp-default', label: 'Sculpted (5–7 wicks)', price_paise: PAISE(999), stock_count: 25, sku: 'WW-BD-KP' },
    ],
    is_active: true,
    is_featured: false,
    rating: 4.9,
    rating_count: 12,
  },
  {
    id: 'bd-neel-pushp',
    slug: 'neel-pushp',
    name: 'Neel Pushp',
    tagline: 'A single blue rose.',
    description:
      'A single sculpted blue rose set on a leaf base — quiet, confident, slow-burning. Our most-photographed Diwali piece.',
    category: 'bespoke-diwali',
    base_price: 999,
    images: ['/images/neel-pushp.jpg', '/images/hero-diwali.jpg'],
    ingredients: ['Natural soy wax', '5–7 cotton wicks', 'Hand-sculpted form'],
    highlights: ['5–7 wicks', 'Soy wax', 'Toxin-free', 'Festive centrepiece'],
    variants: [
      { id: 'bd-neel-pushp-default', label: 'Sculpted (5–7 wicks)', price_paise: PAISE(999), stock_count: 25, sku: 'WW-BD-NP' },
    ],
    is_active: true,
    is_featured: true,
    rating: 5.0,
    rating_count: 19,
  },
];

export function getActiveProducts() {
  return PRODUCTS.filter((p) => p.is_active);
}
export function getFeaturedProducts(n = 6) {
  return PRODUCTS.filter((p) => p.is_active && p.is_featured).slice(0, n);
}
export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug && p.is_active);
}
export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
export function getRelatedProducts(slug: string, n = 4) {
  const p = getProductBySlug(slug);
  if (!p) return [];
  return PRODUCTS.filter(
    (x) => x.is_active && x.slug !== slug && x.category === p.category,
  ).slice(0, n);
}
export function getMinVariantPaise(p: Product) {
  return Math.min(...p.variants.map((v) => v.price_paise));
}
export function getVariantById(variantId: string):
  | { product: Product; variant: Variant }
  | null {
  for (const p of PRODUCTS) {
    const v = p.variants.find((x) => x.id === variantId);
    if (v) return { product: p, variant: v };
  }
  return null;
}
export const CATEGORIES = [
  { slug: 'whispering-heritage', label: 'Whispering Heritage' },
  { slug: 'latte-collection',    label: 'Latte Collection' },
  { slug: 'heritage-gifting',    label: 'Heritage Gifting' },
  { slug: 'bespoke-diwali',      label: 'Bespoke Diwali' },
] as const;
