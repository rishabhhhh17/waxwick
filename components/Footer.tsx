import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-clay-900 text-cream-100">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="font-display text-3xl text-cream-50 whitespace-nowrap">
            Wic <span className="italic text-ember-200">&amp;</span> Whisper<span className="text-ember-200">.</span>
          </Link>
          <p className="mt-4 text-sm text-cream-100/75 max-w-xs">
            Hand-poured soy candles from Bangalore. Natural fragrance, slow burn,
            toxin-free.
          </p>
        </div>

        <div>
          <h4 className="text-[12px] uppercase tracking-[0.18em] text-cream-100/60 mb-4">
            Shop
          </h4>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link href="/products?c=whispering-heritage" className="hover:text-white">Whispering Heritage</Link></li>
            <li><Link href="/products?c=latte-collection" className="hover:text-white">Latte Collection</Link></li>
            <li><Link href="/products?c=heritage-gifting" className="hover:text-white">Heritage Gifting</Link></li>
            <li><Link href="/products?c=bespoke-diwali" className="hover:text-white">Bespoke Diwali</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[12px] uppercase tracking-[0.18em] text-cream-100/60 mb-4">
            Brand
          </h4>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link href="/about" className="hover:text-white">Our story</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/wholesale" className="hover:text-white">Wholesale &amp; gifting</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[12px] uppercase tracking-[0.18em] text-cream-100/60 mb-4">
            Help
          </h4>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link href="/shipping" className="hover:text-white">Shipping &amp; returns</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
          <p className="mt-6 text-[13px] text-cream-100/70">
            Email <a href="mailto:hello@wicwhisper.com" className="underline">hello@wicwhisper.com</a> with your order ID for tracking.
          </p>
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 text-[12px] text-cream-100/60 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <span>© {year} Wic &amp; Whisper · All rights reserved.</span>
          <span>Made in India · Hand-poured in Bangalore</span>
        </div>
      </div>
    </footer>
  );
}
