import { Suspense } from 'react';
import ConfirmationClient from './confirmation-client';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Order confirmed · Wic & Whisper' };

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-5 md:px-8 py-24 text-clay-700">Loading order…</div>}>
      <ConfirmationClient />
    </Suspense>
  );
}
