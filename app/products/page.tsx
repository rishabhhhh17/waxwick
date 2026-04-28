import { Suspense } from 'react';
import ProductsClient from './products-client';

export const metadata = { title: 'Shop · waxwick' };

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 md:px-8 py-24 text-clay-700">Loading…</div>}>
      <ProductsClient />
    </Suspense>
  );
}
