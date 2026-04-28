import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Leaf, Hand, Flame, Sparkles, Quote } from 'lucide-react';
import Marquee from '@/components/Marquee';
import ProductCard from '@/components/ProductCard';
import StickyShopBar from '@/components/StickyShopBar';
import { getFeaturedProducts, getProductBySlug } from '@/lib/products';

export const revalidate = 3600;

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const heroProduct = getProductBySlug('coffee-roast');

  // Curated collection thumbnails using actual product photography
  const collections = [
    {
      slug: 'whispering-heritage',
      label: 'Whispering Heritage',
      copy: 'Coffee · Saffron · Sandal · Lily',
      blurb: 'Soy candles in 120 ml glass — slow burn, classic scents.',
      image: '/images/coffee-roast.jpg',
    },
    {
      slug: 'latte-collection',
      label: 'Latte Collection',
      copy: 'Vanilla · Lavender · Iced · Biscoff',
      blurb: '220 ml wood-lid jars with dessert-soft scents.',
      image: '/images/vanilla-latte.jpg',
    },
    {
      slug: 'heritage-gifting',
      label: 'Heritage Gifting',
      copy: 'Pre-wrapped duos · Navy & gold',
      blurb: 'Two candles in our signature navy box — ready to gift.',
      image: '/images/heritage-gift-coffee-saffron.jpg',
    },
    {
      slug: 'bespoke-diwali',
      label: 'Bespoke Diwali',
      copy: 'Sculpted · 5–7 wicks',
      blurb: 'Hand-shaped festive centrepieces, cast in soy.',
      image: '/images/gulmohar.jpg',
    },
  ];

  return (
    <>
      {/* ────────────────────────────────────────────
          HERO — moody candlelit photo, restrained editorial type
         ──────────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[680px] max-h-[920px] w-full overflow-hidden bg-clay-900">
        <Image
          src="/images/hero-tray.jpg"
          alt="Three lit Wic & Whisper candles on a brass tray with soft florals"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cinematic vignette: dark left → soft right, plus subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-clay-900/85 via-clay-900/55 to-clay-900/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-clay-900/75 via-transparent to-clay-900/25" />

        <div className="relative h-full mx-auto max-w-[1400px] px-6 md:px-12 flex flex-col justify-end pb-20 md:pb-28">
          <div className="max-w-[820px] text-cream-50">
            {/* Tiny editorial eyebrow — like Diptyque / Aesop */}
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-cream-100/85">
              <span className="block w-10 h-px bg-ember-200" />
              <span>Bangalore · Est. 2023</span>
            </div>

            <h1 className="mt-8 font-display text-[58px] sm:text-[80px] md:text-[104px] xl:text-[124px] leading-[0.92] tracking-[-0.025em]">
              The slowest<br />
              <span className="italic text-ember-200">hour</span> of your day,<br />
              hand-poured.
            </h1>

            <p className="mt-9 max-w-[54ch] text-[16.5px] md:text-[18px] leading-[1.7] text-cream-50/85">
              Soy candles from a small Bangalore studio. Natural wax,
              authentic fragrance oils, cotton wicks. Made in batches of fifty
              and rested for seven days before they leave us.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-primary">
                Shop the catalogue <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/products?c=heritage-gifting"
                className="inline-flex items-center justify-center bg-cream-50/10 backdrop-blur-md border border-cream-100/30 text-cream-50 hover:bg-cream-50/20 px-6 py-3 rounded-full font-medium transition-colors min-h-[44px]"
              >
                Gift a duo
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12.5px] text-cream-50/75">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-ember-200 text-ember-200" />
                  ))}
                </div>
                <span><span className="text-cream-50 font-medium">4.9</span> · 800+ reviews</span>
              </div>
              <span className="hidden sm:inline w-1 h-1 bg-cream-50/30 rounded-full" />
              <span>Toxin-free, 100% soy</span>
              <span className="hidden md:inline w-1 h-1 bg-cream-50/30 rounded-full" />
              <span className="hidden md:inline">Hand-poured in 48 hrs</span>
            </div>
          </div>

          {/* Floating bestseller chip — bottom right */}
          {heroProduct && (
            <Link
              href={`/products/${heroProduct.slug}`}
              className="hidden md:flex absolute right-12 bottom-28 bg-cream-50 rounded-2xl shadow-warm p-3 gap-3 items-center w-[290px] hover:scale-[1.03] transition-transform"
            >
              <div className="relative w-14 h-16 rounded-md overflow-hidden bg-cream-100 shrink-0">
                <Image src={heroProduct.images[0]} alt={heroProduct.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.22em] text-ember-600 font-medium">Bestseller</div>
                <div className="font-display text-[19px] leading-tight text-ink truncate">{heroProduct.name}</div>
                <div className="text-[12px] text-clay-700">From ₹{heroProduct.base_price}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-ember-500 shrink-0" />
            </Link>
          )}
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

      {/* ────────────────────────────────────────────
          MANIFESTO — typographic editorial section, no photo
          (Le Labo / Aesop influence — confidence through restraint)
         ──────────────────────────────────────────── */}
      <section className="bg-cream-50 py-24 md:py-32 border-b border-cream-200">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ember-600 mb-8">
            <span className="block w-10 h-px bg-ember-500" />
            <span>The Studio</span>
          </div>
          <p className="font-display text-[32px] sm:text-[42px] md:text-[56px] leading-[1.12] tracking-[-0.015em] text-ink">
            We make candles the way we&rsquo;d want one made for us &mdash;
            <span className="italic text-ember-600"> by hand</span>, in small
            batches, with the kind of patience an algorithm wouldn&rsquo;t
            allow.
          </p>
          <div className="mt-12 grid sm:grid-cols-3 gap-x-10 gap-y-8 text-[14.5px] leading-[1.7] text-clay-700 max-w-3xl">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink mb-2">Soy &amp; Cotton</div>
              <p>Plant-based wax, lead-free cotton wicks. No paraffin, no fragrance fillers.</p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink mb-2">Single-origin</div>
              <p>Each candle reads like a place: Coorg coffee, Kashmir saffron, Mysore sandal.</p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink mb-2">Seven-day cure</div>
              <p>Every batch rests a week before it ships. Cleaner burn, truer scent throw.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          COLLECTIONS — refined editorial grid
          Uses real product photography instead of broken collages
         ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-cream-100">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between gap-6 mb-14 md:mb-20">
            <div>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ember-600 mb-4">
                <span className="block w-10 h-px bg-ember-500" />
                <span>Four collections</span>
              </div>
              <h2 className="font-display text-[40px] md:text-[64px] leading-[1.02] tracking-[-0.015em] text-ink max-w-[18ch]">
                One studio,<br />
                <span className="italic text-ember-600">four scent stories.</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center text-[13px] uppercase tracking-[0.18em] text-ink hover:text-ember-500 underline decoration-ember-500/40 underline-offset-[6px]"
            >
              All candles <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={`/products?c=${c.slug}`}
                className="group block bg-cream-50 border border-cream-200 rounded-[20px] overflow-hidden hover:shadow-warm transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-ember-600 font-medium">{c.copy}</div>
                  <h3 className="mt-2 font-display text-[26px] leading-tight text-ink">{c.label}</h3>
                  <p className="mt-2 text-[13.5px] text-clay-700 leading-[1.55]">{c.blurb}</p>
                  <div className="mt-4 inline-flex items-center text-[12.5px] uppercase tracking-[0.18em] text-ink">
                    Shop
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 text-center md:hidden">
            <Link href="/products" className="btn-outline">All candles</Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          FEATURED PRODUCTS — bestsellers
         ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between gap-4 mb-12 md:mb-16">
            <div>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ember-600 mb-4">
                <span className="block w-10 h-px bg-ember-500" />
                <span>Most-loved</span>
              </div>
              <h2 className="font-display text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.015em] text-ink">
                Bestsellers,<br />
                <span className="italic text-ember-600">hand-poured fresh.</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center text-[13px] uppercase tracking-[0.18em] text-ink hover:text-ember-500 underline decoration-ember-500/40 underline-offset-[6px]"
            >
              Shop all <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-14 text-center">
            <Link href="/products" className="btn-primary">Shop all candles <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          MISSION — split editorial with numbered process
          (Aesop-influence: type-led, calm, numbered notation)
         ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-clay-900 text-cream-50">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-[28px] overflow-hidden order-last md:order-first">
            <Image
              src="/images/lifestyle-bw.jpg"
              alt="Sculpted soy candles on a carved wooden runner"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ember-200 mb-6">
              <span className="block w-10 h-px bg-ember-200" />
              <span>The pour</span>
            </div>
            <h2 className="font-display text-[36px] md:text-[60px] leading-[1.05] tracking-[-0.015em]">
              Made by hand,<br />
              <span className="italic text-ember-200">from start to scent.</span>
            </h2>
            <p className="mt-7 text-[16px] leading-[1.7] text-cream-100/80 max-w-[52ch]">
              Every candle in this catalogue is poured in our small Bangalore studio.
              Soy wax, cotton wicks, food-grade fragrance oils &mdash; nothing else.
              We control every step from raw material to packed box.
            </p>
            <ol className="mt-12 space-y-7">
              {[
                ['01', 'Source', 'Soy wax from sustainable farms; fragrance oils certified pure.'],
                ['02', 'Pour', 'Small batches, single-origin scents, by hand in Bangalore.'],
                ['03', 'Cure', 'Each batch rests 7 days for a clean, even melt pool.'],
                ['04', 'Box', 'Reusable glass jar in a kraft-and-navy box, ready to gift.'],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-6 items-baseline border-t border-cream-100/15 pt-6">
                  <span className="font-display italic text-[30px] text-ember-200 leading-none w-12 shrink-0">{n}</span>
                  <div>
                    <div className="font-display text-[22px] text-cream-50">{t}</div>
                    <p className="text-[14.5px] text-cream-100/70 mt-1.5 max-w-[44ch] leading-[1.65]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">Shop the catalogue</Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-transparent border border-cream-100/30 text-cream-50 hover:bg-cream-100/10 px-6 py-3 rounded-full font-medium transition-colors min-h-[44px]"
              >
                Read our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          GIFTING — feature the navy box (best brand asset)
         ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-cream-50">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ember-600 mb-6">
              <span className="block w-10 h-px bg-ember-500" />
              <span>Gifting</span>
            </div>
            <h2 className="font-display text-[40px] md:text-[64px] leading-[1.02] tracking-[-0.015em] text-ink">
              The navy box,<br />
              <span className="italic text-ember-600">arriving ready.</span>
            </h2>
            <p className="mt-6 text-[16.5px] leading-[1.7] text-clay-700 max-w-[52ch]">
              Two candles, hand-tied, nestled in our signature navy &amp; gold
              keepsake box. Skip the wrap, skip the awkward gift card &mdash;
              this is the present that does both.
            </p>
            <ul className="mt-8 space-y-3 text-[14.5px] text-clay-700">
              {[
                'Curated duos: Coffee × Saffron · Sandal × Lily',
                'Foil-stamped lid, magnetic close, reusable',
                'Optional handwritten card on cotton stock',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-[7px] block w-1.5 h-1.5 rounded-full bg-ember-500 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/products?c=heritage-gifting" className="btn-primary">Shop gift duos <ArrowRight className="w-4 h-4 ml-2" /></Link>
              <Link href="/wholesale" className="btn-outline">Bulk &amp; corporate</Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-cream-100 shadow-warm">
            <Image
              src="/images/heritage-gift-coffee-saffron.jpg"
              alt="Wic & Whisper navy gift box with two candles"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          BESPOKE DIWALI — typographic banner, no broken photo
          (deep clay backdrop, ember accents, single product anchor)
         ──────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-clay-900 text-cream-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(230,184,144,0.18),transparent_55%)] pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 items-center">
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ember-200 mb-6">
              <span className="block w-10 h-px bg-ember-200" />
              <span>Festive · Limited drops</span>
            </div>
            <h2 className="font-display text-[44px] md:text-[80px] leading-[1.02] tracking-[-0.015em]">
              Bespoke Diwali,<br />
              <span className="italic text-ember-200">sculpted by hand.</span>
            </h2>
            <p className="mt-7 text-cream-100/80 max-w-[48ch] text-[16.5px] leading-[1.7]">
              Five to seven wicks, soy wax, cast in moulds we shaped ourselves.
              Centrepieces that turn a tablescape into a moment &mdash; and burn
              the way a candle should.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products?c=bespoke-diwali" className="btn-primary">
                Shop Bespoke Diwali <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/wholesale"
                className="inline-flex items-center justify-center bg-cream-50/10 backdrop-blur-md border border-cream-100/30 text-cream-50 hover:bg-cream-50/20 px-6 py-3 rounded-full font-medium transition-colors min-h-[44px]"
              >
                Bulk hampers
              </Link>
            </div>
          </div>
          <div className="relative aspect-square rounded-[28px] overflow-hidden bg-clay-800/40 ring-1 ring-cream-100/10">
            <Image
              src="/images/kamal-vatika.jpg"
              alt="Kamal Vatika sculpted Diwali candle"
              fill
              sizes="(min-width:768px) 40vw, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          TESTIMONIALS — refined card grid
         ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-cream-100 border-y border-cream-200">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center max-w-[36ch] mx-auto">
            <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ember-600 mb-4">
              <span className="block w-10 h-px bg-ember-500" />
              <span>Reviews</span>
              <span className="block w-10 h-px bg-ember-500" />
            </div>
            <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] text-ink">
              Loved by 800+ customers.
            </h2>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { t: 'It is rare to find a candle that smells exactly like the label promises. Coffee Roast is the real thing — wakes the room up.', a: 'Aanya R.', where: 'Mumbai', product: 'Coffee Roast' },
              { t: 'Bought the Heritage Duo for a Diwali gift and ended up keeping one. The navy box is heavier and prettier than the photos.', a: 'Karan S.', where: 'Bangalore', product: 'Heritage Duo' },
              { t: 'Vanilla Latte is now my entire bedroom. Soft, sweet, doesn’t feel cheap. The wood lid is a nice touch.', a: 'Mehr K.', where: 'Delhi', product: 'Vanilla Latte' },
            ].map((r, i) => (
              <article key={i} className="bg-cream-50 border border-cream-200 rounded-[24px] p-8 shadow-soft flex flex-col">
                <Quote className="w-7 h-7 text-ember-200" strokeWidth={1.5} />
                <p className="mt-5 font-display text-[20px] leading-[1.5] text-ink flex-1">&ldquo;{r.t}&rdquo;</p>
                <div className="mt-7 pt-5 border-t border-cream-200 flex items-center justify-between">
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
        </div>
      </section>

      {/* ────────────────────────────────────────────
          FEATURE BAR — quiet utility bar
         ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-cream-50 border-b border-cream-200">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { icon: <Leaf className="w-5 h-5" />, t: 'Natural soy wax', d: 'Plant-based, clean burn.' },
            { icon: <Hand className="w-5 h-5" />, t: 'Hand poured', d: 'Small-batch, Bangalore.' },
            { icon: <Flame className="w-5 h-5" />, t: 'Long burn', d: '25 to 50 hrs per jar.' },
            { icon: <Sparkles className="w-5 h-5" />, t: 'Reusable jar', d: 'Built to live a second life.' },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-cream-100 flex items-center justify-center text-ember-500 shrink-0 border border-cream-200">{f.icon}</div>
              <div>
                <div className="font-medium text-ink text-[15px]">{f.t}</div>
                <p className="text-[13.5px] text-clay-700 mt-1">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────
          FINAL CTA — confident closing, type-led, no broken photo
         ──────────────────────────────────────────── */}
      <section className="bg-ember-500 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.22),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(122,56,18,0.35),transparent_50%)] pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.32em] text-cream-50/85 mb-5">
            <span className="block w-10 h-px bg-cream-50/50" />
            <span>Try us once</span>
            <span className="block w-10 h-px bg-cream-50/50" />
          </div>
          <h2 className="font-display text-[44px] md:text-[88px] leading-[1.02] tracking-[-0.02em] max-w-[18ch] mx-auto">
            Light a candle.<br />
            <span className="italic">It changes the room.</span>
          </h2>
          <p className="mt-7 text-cream-50/85 max-w-[52ch] mx-auto text-[16.5px] leading-[1.7]">
            Pick a scent that fits the season &mdash; we hand-pour it within 48 hours and ship across India.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-clay-900 text-cream-50 hover:bg-clay-800 px-7 py-3.5 rounded-full font-medium transition-colors min-h-[48px]"
            >
              Shop the catalogue <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/products?c=heritage-gifting"
              className="inline-flex items-center justify-center bg-cream-50 text-ink hover:bg-cream-100 px-7 py-3.5 rounded-full font-medium transition-colors min-h-[48px]"
            >
              Gift a duo
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky shop bar — appears on scroll */}
      <StickyShopBar />
    </>
  );
}
