import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Leaf, Hand, Star } from 'lucide-react';
import Marquee from '@/components/Marquee';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, CATEGORIES } from '@/lib/products';

export const revalidate = 3600;

export default function HomePage() {
  const featured = getFeaturedProducts(8);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-cream-50">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-10 md:pt-16 pb-12 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="md:py-10">
            <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">
              Hand-poured · Bangalore
            </span>
            <h1 className="mt-4 font-display text-[44px] md:text-[72px] leading-[1.02] tracking-[-0.02em] text-ink">
              Light a candle.<br />
              <span className="italic text-ember-500">Light a moment.</span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-[16px] md:text-[17px] leading-[1.65] text-clay-700">
              Soy-wax candles, made with 100% authentic fragrance oils and cotton wicks.
              Toxin-free, slow-burn, and quietly beautiful — designed to turn any room
              into a quieter version of itself.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/products" className="btn-primary">
                Shop candles <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/products?c=heritage-gifting" className="btn-outline">
                Gift a duo
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-[13px] text-clay-700">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-ember-500 text-ember-500" />
                <span className="text-ink font-medium">4.9</span>
                <span>· 800+ reviews</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-cream-200" />
              <div className="hidden sm:block">10,000+ candles poured</div>
            </div>
          </div>

          <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-xl2 overflow-hidden shadow-warm">
            <Image
              src="/images/lifestyle-tray.jpg"
              alt="Three lit waxwick candles on a brass tray"
              fill
              priority
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-clay-900/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-cream-50">
              <p className="font-display text-2xl leading-tight">Whispering Heritage</p>
              <p className="text-[13px] text-cream-100/85">Coffee · Saffron · Sandalwood · Lily</p>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          'Natural soy wax',
          '100% authentic fragrance oils',
          'Cotton wicks',
          'Toxin-free',
          'Hand-poured in Bangalore',
          'Reusable glass jars',
        ]}
      />

      {/* SOCIAL PROOF BAR */}
      <section className="bg-cream-50 py-10 md:py-14 border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
          <Stat n="10,000+" l="Candles poured" />
          <Stat n="4.9 / 5" l="Average rating" />
          <Stat n="48 hrs" l="Hand-poured to ship" />
          <Stat n="100%" l="Soy wax · toxin free" />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14">
            <div>
              <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Bestsellers</span>
              <h2 className="mt-3 font-display text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.015em] text-ink">
                Made for slow evenings.
              </h2>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center text-[14px] text-ink hover:text-ember-500">
              Shop all <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link href="/products" className="btn-outline">Shop all candles</Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-cream-100 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Collections</span>
          <h2 className="mt-3 font-display text-[34px] md:text-[48px] leading-[1.05] text-ink max-w-[20ch]">
            Four scent stories,<br />one workshop.
          </h2>
          <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-5 md:gap-6">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/products?c=${c.slug}`}
                className="relative aspect-[16/10] rounded-xl2 overflow-hidden group"
              >
                <Image
                  src={
                    c.slug === 'whispering-heritage' ? '/images/collection-heritage.jpg'
                    : c.slug === 'latte-collection' ? '/images/collection-latte.jpg'
                    : c.slug === 'heritage-gifting' ? '/images/collection-gifting.jpg'
                    : '/images/collection-diwali.jpg'
                  }
                  alt={c.label}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-clay-900/65 via-clay-900/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-cream-50">
                  <h3 className="font-display text-[26px] md:text-[32px] leading-tight">{c.label}</h3>
                  <p className="text-[13px] text-cream-100/85 mt-1 inline-flex items-center">
                    Shop the collection <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative aspect-square md:aspect-[4/5] rounded-xl2 overflow-hidden">
            <Image src="/images/lifestyle-bw.jpg" alt="Hand-poured candle" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Why waxwick</span>
            <h2 className="mt-3 font-display text-[34px] md:text-[48px] leading-[1.05] text-ink">
              Made by hand,<br />from start to scent.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.7] text-clay-700 max-w-[52ch]">
              Every candle in this catalogue is poured in our small Bangalore studio. Soy wax,
              cotton wicks, food-grade fragrance oils — nothing else. We control every step
              from raw material to final box, which is why our throw is consistent and our
              burn is clean.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              <Feature icon={<Leaf className="w-4 h-4" />} t="Natural soy" d="Plant-based, clean burn" />
              <Feature icon={<Hand className="w-4 h-4" />} t="Hand poured" d="Small batches in Bangalore" />
              <Feature icon={<Flame className="w-4 h-4" />} t="Long burn" d="25–50 hr per jar" />
              <Feature icon={<Star className="w-4 h-4" />} t="Reusable jar" d="Made to live a second life" />
            </ul>
            <Link href="/products" className="btn-primary mt-10">Shop the catalogue</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-clay-900 text-cream-50">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28 text-center">
          <h2 className="font-display text-[34px] md:text-[56px] leading-[1.05] tracking-[-0.015em]">
            Try a candle.<br />
            <span className="italic text-ember-200">It changes the room.</span>
          </h2>
          <p className="mt-5 text-cream-100/80 max-w-[48ch] mx-auto">
            Pick a scent that fits the season. We hand-pour it within 48 hours and ship it across India.
          </p>
          <Link href="/products" className="btn-primary mt-8 inline-flex">
            Shop candles <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-[32px] md:text-[40px] text-ink leading-none">{n}</div>
      <div className="mt-2 text-[12px] uppercase tracking-[0.18em] text-clay-700">{l}</div>
    </div>
  );
}
function Feature({ icon, t, d }: { icon: React.ReactNode; t: string; d: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-ember-500 shrink-0">{icon}</span>
      <div>
        <div className="font-medium text-ink text-[15px]">{t}</div>
        <div className="text-[13px] text-clay-700">{d}</div>
      </div>
    </li>
  );
}
