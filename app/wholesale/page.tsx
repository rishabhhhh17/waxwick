import Link from 'next/link';

export const metadata = { title: 'Wholesale & gifting · Wic & Whisper' };

export default function WholesalePage() {
  return (
    <div className="bg-cream-50">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">B2B</span>
        <h1 className="mt-3 font-display text-[44px] md:text-[56px] leading-[1.05] text-ink">Wholesale &amp; corporate gifting.</h1>
        <p className="mt-5 text-clay-700 max-w-[58ch]">
          We work with retailers, hotels, spas, and gifting companies across India. Bulk
          pricing scales with quantity, and we can co-brand the box for orders above 100 units.
        </p>
        <ul className="mt-8 grid sm:grid-cols-2 gap-4 text-[14px] text-clay-700">
          <li className="bg-white border border-cream-200 rounded-md p-4">Custom scent commissions</li>
          <li className="bg-white border border-cream-200 rounded-md p-4">Co-branded gift boxes</li>
          <li className="bg-white border border-cream-200 rounded-md p-4">Hotel &amp; spa amenity supply</li>
          <li className="bg-white border border-cream-200 rounded-md p-4">Diwali &amp; Christmas hampers</li>
        </ul>
        <p className="mt-8 text-[14px] text-clay-700">
          Email <a href="mailto:hello@wicwhisper.com" className="underline">hello@wicwhisper.com</a> with quantity, scent preferences, and delivery date — we’ll send a quote within one working day.
        </p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">Browse the catalogue</Link>
      </div>
    </div>
  );
}
