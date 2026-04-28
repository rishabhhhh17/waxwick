import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5 py-16">
      <div className="text-center max-w-md">
        <div className="font-display text-[80px] md:text-[120px] leading-none text-ember-500">404</div>
        <h1 className="mt-2 font-display text-3xl text-ink">This room is dark.</h1>
        <p className="mt-3 text-clay-700">
          The page you’re looking for has burnt out — but the catalogue is still warm.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-outline">Home</Link>
          <Link href="/products" className="btn-primary">Shop candles</Link>
        </div>
      </div>
    </div>
  );
}
