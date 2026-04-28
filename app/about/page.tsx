import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'Our story · Wic & Whisper' };

export default function AboutPage() {
  return (
    <article className="bg-cream-50">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Our story</span>
        <h1 className="mt-3 font-display text-[44px] md:text-[64px] leading-[1.04] text-ink">
          A small studio,<br />a quiet flame.
        </h1>
        <div className="mt-10 relative aspect-[16/10] rounded-xl2 overflow-hidden">
          <Image src="/images/lifestyle-tray.jpg" alt="Wic & Whisper candles" fill sizes="(min-width:768px) 720px, 100vw" className="object-cover" />
        </div>
        <div className="prose mt-10 text-clay-700 text-[16.5px] leading-[1.75] space-y-5">
          <p>
            Wic &amp; Whisper is an independent Indian candle studio based in Bangalore. We make
            handcrafted scented candles using natural soy wax, 100% authentic fragrance
            oils, and cotton wicks — nothing else. Every candle is poured by hand,
            tested for clean burn and even melt, and packed in a reusable glass jar
            that’s designed to live a second life.
          </p>
          <p>
            Our catalogue moves across four collections — Whispering Heritage, the
            Latte Collection, Heritage Gifting, and Bespoke Diwali — each one inspired
            by the smell of a specific Indian moment. A roasted morning in Coorg. A
            slow afternoon in Mysore. Saffron in Kashmir. A diya on Diwali night.
          </p>
          <p>
            We are vertically integrated end to end. Sourcing, formulation, pouring,
            curing, packaging — all of it happens in our own studio, which is how we
            keep our throw consistent and our quality predictable. We supply boutique
            partners, hampers, hotels, and B2B gifting alongside our direct customers.
          </p>
          <p>
            If you want a candle that smells like the room you grew up in, you’re in
            the right place.
          </p>
        </div>
        <div className="mt-10 flex gap-3">
          <Link href="/products" className="btn-primary">Shop candles</Link>
          <Link href="/wholesale" className="btn-outline">B2B &amp; gifting</Link>
        </div>
      </div>
    </article>
  );
}
