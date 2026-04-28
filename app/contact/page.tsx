import Link from 'next/link';

export const metadata = { title: 'Contact · waxwick' };

export default function ContactPage() {
  return (
    <div className="bg-cream-50">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Contact</span>
        <h1 className="mt-3 font-display text-[44px] md:text-[56px] leading-[1.05] text-ink">Say hello.</h1>
        <p className="mt-4 text-clay-700 max-w-[58ch]">
          For order help, B2B enquiries, or hamper collaborations — get in touch.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <div className="bg-white border border-cream-200 rounded-xl2 p-6">
            <div className="text-[12px] uppercase tracking-[0.18em] text-clay-700">Email</div>
            <a href="mailto:hello@waxwick.in" className="font-display text-2xl text-ink mt-1 block hover:text-ember-500">hello@waxwick.in</a>
            <p className="text-[13px] text-clay-700 mt-2">Best for order support, returns, and hamper enquiries.</p>
          </div>
          <div className="bg-white border border-cream-200 rounded-xl2 p-6">
            <div className="text-[12px] uppercase tracking-[0.18em] text-clay-700">Studio</div>
            <div className="font-display text-2xl text-ink mt-1">Bangalore, India</div>
            <p className="text-[13px] text-clay-700 mt-2">+91 96117 41489 / +91 91778 89006</p>
          </div>
        </div>
        <div className="mt-10">
          <Link href="/products" className="btn-primary">Back to the catalogue</Link>
        </div>
      </div>
    </div>
  );
}
