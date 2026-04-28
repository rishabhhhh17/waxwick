import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Leaf, Hand, Flame, Sparkles, ShieldCheck, Quote, ArrowDown } from 'lucide-react';
import Marquee from '@/components/Marquee';
import ProductCard from '@/components/ProductCard';
import StickyShopBar from '@/components/StickyShopBar';
import { getFeaturedProducts, CATEGORIES, getProductBySlug } from '@/lib/products';

export const revalidate = 3600;

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const heroProduct = getProductBySlug('coffee-roast');

  return (
    <>
      {/* HERO — full-bleed cinematic photo, content overlaid (P.F. Candle / Otherland style) */}
      <section className="relative h-[88vh] min-h-[640px] max-h-[900px] w-full overflow-hidden">
        <Image
          src="/images/lifestyle-tray.jpg"
          alt="Three lit waxwick candles on a brass tray"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layered gradients for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-clay-900/85 via-clay-900/55 to-clay-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-clay-900/70 via-transparent to-transparent" />

        <div className="relative h-full mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col justify-end pb-20 md:pb-24">
          <div className="max-w-[760px] text-cream-50">
            <div className="inline-flex items-center gap-2 bg-cream-50/15 backdrop-blur-md border border-cream-100/25 rounded-full pl-1 pr-3.5 py-1">
              <span className="bg-ember-500 text-white text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full">New</span>
              <span className="text-[12px] tracking-wide text-cream-50/90">Bespoke Diwali — sculpted, multi-wick centrepieces</span>
            </div>

            <h1 className="mt-7 font-display text-[56px] sm:text-[72px] md:text-[96px] xl:text-[112px] leading-[0.93] tracking-[-0.025em]">
              Hand-poured<br />
              for the <span className="italic text-ember-200">slowest</span><br />
              hour of your day.
            </h1>

            <p className="mt-7 max-w-[52ch] text-[16px] md:text-[18px] leading-[1.65] text-cream-50/85">
              Soy candles from a small Bangalore studio. 100% natural wax,
              authentic fragrance oils, cotton wicks. Made in batches of fifty,
              cured for seven days, never compromised.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-primary">
                Shop the catalogue <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/products?c=heritage-gifting" className="inline-flex items-center justify-center bg-cream-50/15 backdrop-blur-md border border-cream-100/30 text-cream-50 hover:bg-cream-50/25 px-6 py-3 rounded-full font-medium transition-colors min-h-[44px]">
                Gift a duo
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-cream-50/85">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-ember-200 text-ember-200" />
                  ))}
                </div>
                <span><span className="text-cream-50 font-semibold">4.9</span> · 800+ reviews</span>
              </div>
              <span className="hidden sm:inline w-1 h-1 bg-cream-50/40 rounded-full" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-ember-200" />
                <span>Toxin-free, soy-only</span>
              </div>
              <span className="hidden md:inline w-1 h-1 bg-cream-50/40 rounded-full" />
              <span className="hidden md:inline">Hand-poured in 48 hrs</span>
            </div>
          </div>

          {/* Floating featured chip — bottom right */}
          {heroProduct && (
            <Link
              href={`/products/${heroProduct.slug}`}
              className="hidden md:flex absolute right-10 bottom-24 bg-cream-50 rounded-2xl shadow-warm p-3 gap-3 items-center w-[280px] hover:scale-[1.03] transition-transform"
            >
              <div className="relative w-14 h-16 rounded-md overflow-hidden bg-cream-100 shrink-0">
                <Image src={heroProduct.images[0]} alt={heroProduct.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ember-600 font-semibold">Bestseller</div>
                <div className="font-display text-[18px] leading-tight text-ink truncate">{heroProduct.name}</div>
                <div className="text-[12px] text-clay-700">From ₹{heroProduct.base_price}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-ember-500 shrink-0" />
            </Link>
          )}

          {/* Scroll cue */}
          <div className="hidden md:flex absolute right-10 top-10 items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-cream-50/70 rotate-90 origin-right">
            <span>Scroll</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </section>

      {/* Trust marquee */}
      <Marquee
        items={[
          'Natural soy wax',
          '100% authentic fragrance oils',
          'Cotton wicks',
          'Toxin-free',
          'Hand-poured in Bangalore',
          'Reusable glass jars',
          'Cruelty-free',
          'Made in India',
        ]}
      />

      {/* Stats strip with CTA */}
      <section className="bg-cream-50 py-14 md:py-20 border-b border-cream-200">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            <Stat n="10,000+" l="Candles poured" />
            <Stat n="4.9 / 5" l="Avg. rating" />
            <Stat n="48 hrs" l="Hand-poured to ship" />
            <Stat n="100%" l="Soy · toxin-free" />
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-primary">Shop bestsellers <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* SCENT FINDER — quick CTA-rich section */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="text-center max-w-[40ch] mx-auto mb-12">
            <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Find your scent</span>
            <h2 className="mt-3 font-display text-[34px] md:text-[48px] leading-[1.05] text-ink">
              What kind of room do you want tonight?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { mood: 'Cozy & warm', label: 'Coffee Roast', href: '/products/coffee-roast', img: '/images/coffee-roast.jpg' },
              { mood: 'Quiet & grounded', label: 'Sandalwood', href: '/products/sandalwood', img: '/images/sandalwood.jpg' },
              { mood: 'Sweet & soft', label: 'Vanilla Latte', href: '/products/vanilla-latte', img: '/images/vanilla-latte.jpg' },
              { mood: 'Festive & alive', label: 'Bespoke Diwali', href: '/products?c=bespoke-diwali', img: '/images/gulmohar.jpg' },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="group block bg-white border border-cream-200 rounded-2xl overflow-hidden hover:shadow-warm transition-all">
                <div className="relative aspect-[5/4] overflow-hidden bg-cream-100">
                  <Image src={s.img} alt={s.label} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                </div>
                <div className="p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-ember-600 font-medium">{s.mood}</div>
                  <div className="mt-1 font-display text-[20px] text-ink leading-tight">{s.label}</div>
                  <div className="mt-2 text-[12.5px] text-clay-700 inline-flex items-center">
                    Shop <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS — editorial grid */}
      <section className="py-20 md:py-28 bg-cream-100 border-y border-cream-200">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Four collections</span>
              <h2 className="mt-3 font-display text-[40px] md:text-[60px] leading-[1.02] tracking-[-0.015em] text-ink max-w-[18ch]">
                One studio, four scent stories.
              </h2>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center text-[14px] text-ink hover:text-ember-500 underline decoration-ember-500/40 underline-offset-4">
              All candles <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {CATEGORIES.map((c) => {
              const img =
                c.slug === 'whispering-heritage' ? '/images/collection-heritage.jpg'
                : c.slug === 'latte-collection' ? '/images/collection-latte.jpg'
                : c.slug === 'heritage-gifting' ? '/images/collection-gifting.jpg'
                : '/images/collection-diwali.jpg';
              const blurb =
                c.slug === 'whispering-heritage' ? 'Coffee · Saffron · Sandal · Lily' :
                c.slug === 'latte-collection' ? 'Vanilla · Lavender · Iced · Biscoff' :
                c.slug === 'heritage-gifting' ? 'Pre-wrapped duos in our navy box' :
                'Hand-sculpted festive centrepieces';
              return (
                <Link key={c.slug} href={`/products?c=${c.slug}`} className="relative aspect-[16/10] rounded-[28px] overflow-hidden group">
                  <Image src={img} alt={c.label} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-clay-900/80 via-clay-900/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-cream-50">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ember-200">{blurb}</div>
                    <h3 className="mt-1.5 font-display text-[30px] md:text-[40px] leading-tight">{c.label}</h3>
                    <div className="mt-3 inline-flex items-center text-[13px] text-cream-100">
                      Shop the collection <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link href="/products" className="btn-outline">All candles</Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex items-end justify-between gap-4 mb-12 md:mb-14">
            <div>
              <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Most-loved</span>
              <h2 className="mt-3 font-display text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.015em] text-ink">
                Bestsellers, hand-poured fresh.
              </h2>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center text-[14px] text-ink hover:text-ember-500 underline decoration-ember-500/40 underline-offset-4">
              Shop all <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-primary">Shop all candles <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* MISSION — split with editorial number list, dark */}
      <section className="py-20 md:py-28 bg-clay-900 text-cream-50">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative aspect-[4/5] md:aspect-square rounded-[28px] overflow-hidden">
            <Image src="/images/lifestyle-bw.jpg" alt="Hand pouring a candle" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <span className="text-[12px] uppercase tracking-[0.22em] text-ember-200 font-medium">Why waxwick</span>
            <h2 className="mt-3 font-display text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.015em]">
              Made by hand,<br />from start to scent.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.7] text-cream-100/80 max-w-[52ch]">
              Every candle in this catalogue is poured in our small Bangalore studio.
              Soy wax, cotton wicks, food-grade fragrance oils — nothing else.
              We control every step from raw material to packed box.
            </p>
            <ol className="mt-10 space-y-6">
              {[
                ['01', 'Source', 'Soy wax from sustainable farms; fragrance oils certified pure.'],
                ['02', 'Pour', 'Small batches, single-origin scents, by hand in Bangalore.'],
                ['03', 'Cure', 'Each batch rests 7 days for a clean, even melt pool.'],
                ['04', 'Box', 'Reusable glass jar in a kraft-and-navy box, ready to gift.'],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-5 items-start border-t border-cream-100/10 pt-5">
                  <span className="font-display italic text-[28px] text-ember-200 leading-none w-12 shrink-0">{n}</span>
                  <div>
                    <div className="font-display text-[20px] text-cream-50">{t}</div>
                    <p className="text-[14.5px] text-cream-100/75 mt-1 max-w-[44ch]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">Shop the catalogue</Link>
              <Link href="/about" className="inline-flex items-center justify-center bg-transparent border border-cream-100/30 text-cream-50 hover:bg-cream-100/10 px-6 py-3 rounded-full font-medium transition-colors min-h-[44px]">Read our story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-BLEED DIWALI BANNER — extra CTA */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        <Image src="/images/feature-diwali-wide.jpg" alt="Bespoke Diwali candles" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-clay-900/85 via-clay-900/40 to-transparent" />
        <div className="relative h-full mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col justify-center text-cream-50 max-w-[680px]">
          <span className="text-[12px] uppercase tracking-[0.22em] text-ember-200 font-medium">Festive · limited drops</span>
          <h2 className="mt-3 font-display text-[40px] md:text-[60px] leading-[1.04]">
            Bespoke Diwali,<br /><span className="italic text-ember-200">sculpted by hand.</span>
          </h2>
          <p className="mt-5 text-cream-50/85 max-w-[44ch]">
            Five to seven wicks, soy wax, hand-shaped. Centrepieces that turn a tablescape into a moment.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/products?c=bespoke-diwali" className="btn-primary">Shop Bespoke Diwali <ArrowRight className="w-4 h-4 ml-2" /></Link>
            <Link href="/wholesale" className="inline-flex items-center justify-center bg-cream-50/15 backdrop-blur-md border border-cream-100/30 text-cream-50 hover:bg-cream-50/25 px-6 py-3 rounded-full font-medium transition-colors min-h-[44px]">Bulk &amp; corporate</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="text-center max-w-[36ch] mx-auto">
            <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Reviews</span>
            <h2 className="mt-3 font-display text-[34px] md:text-[48px] leading-[1.05] text-ink">
              Loved by 800+ customers.
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { t: 'It is rare to find a candle that smells exactly like the label promises. Coffee Roast is the real thing — wakes the room up.', a: 'Aanya R.', where: 'Mumbai', product: 'Coffee Roast' },
              { t: 'Bought the Heritage Duo for a Diwali gift and ended up keeping one. The navy box is heavier and prettier than the photos.', a: 'Karan S.', where: 'Bangalore', product: 'Heritage Duo' },
              { t: 'Vanilla Latte is now my entire bedroom. Soft, sweet, doesn’t feel cheap. The wood lid is a nice touch.', a: 'Mehr K.', where: 'Delhi', product: 'Vanilla Latte' },
            ].map((r, i) => (
              <article key={i} className="bg-white border border-cream-200 rounded-[24px] p-7 shadow-soft flex flex-col">
                <Quote className="w-7 h-7 text-ember-200" strokeWidth={1.5} />
                <p className="mt-4 text-[15.5px] leading-[1.65] text-clay-700 flex-1">&ldquo;{r.t}&rdquo;</p>
                <div className="mt-6 pt-5 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-ink text-[14px]">{r.a}</div>
                    <div className="text-[12px] text-clay-700">{r.where} · {r.product}</div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="w-3.5 h-3.5 fill-ember-500 text-ember-500" />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-outline">Try a candle today</Link>
          </div>
        </div>
      </section>

      {/* FEATURE BAR */}
      <section className="py-14 md:py-16 bg-cream-100 border-y border-cream-200">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Leaf className="w-5 h-5" />, t: 'Natural soy wax', d: 'Plant-based, clean burn.' },
            { icon: <Hand className="w-5 h-5" />, t: 'Hand poured', d: 'Small-batch, Bangalore.' },
            { icon: <Flame className="w-5 h-5" />, t: 'Long burn', d: '25 to 50 hrs per jar.' },
            { icon: <Sparkles className="w-5 h-5" />, t: 'Reusable jar', d: 'Built to live a second life.' },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream-50 flex items-center justify-center text-ember-500 shrink-0 border border-cream-200">{f.icon}</div>
              <div>
                <div className="font-medium text-ink text-[15px]">{f.t}</div>
                <p className="text-[13.5px] text-clay-700 mt-1">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ember-500 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)] pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <span className="text-[12px] uppercase tracking-[0.22em] text-cream-50/80 font-medium">Try us once</span>
            <h2 className="mt-3 font-display text-[40px] md:text-[64px] leading-[1.03] tracking-[-0.015em]">
              Light a candle.<br /><span className="italic">It changes the room.</span>
            </h2>
            <p className="mt-5 text-cream-50/85 max-w-[48ch] text-[16px]">
              Pick a scent that fits the season — we hand-pour it within 48 hours and ship across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex items-center justify-center bg-clay-900 text-cream-50 hover:bg-clay-800 px-6 py-3 rounded-full font-medium transition-colors min-h-[44px]">
                Shop the catalogue <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/products?c=heritage-gifting" className="inline-flex items-center justify-center bg-cream-50 text-ink hover:bg-cream-100 px-6 py-3 rounded-full font-medium transition-colors min-h-[44px]">
                Gift a duo
              </Link>
            </div>
          </div>
          <div className="relative aspect-square rounded-[28px] overflow-hidden hidden md:block">
            <Image src="/images/hero-diwali.jpg" alt="Lit candles" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Sticky shop bar — appears on scroll */}
      <StickyShopBar />
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-[36px] md:text-[48px] text-ink leading-none">{n}</div>
      <div className="mt-2 text-[11.5px] uppercase tracking-[0.20em] text-clay-700">{l}</div>
    </div>
  );
}
