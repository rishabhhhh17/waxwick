export const metadata = { title: 'Shipping & returns · Wic & Whisper' };

export default function ShippingPage() {
  return (
    <div className="bg-cream-50">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24 prose prose-neutral">
        <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Help</span>
        <h1 className="mt-3 font-display text-[40px] leading-tight text-ink">Shipping &amp; returns</h1>
        <div className="mt-8 space-y-5 text-clay-700 text-[15.5px] leading-[1.7]">
          <p><strong className="text-ink">Hand-pour time:</strong> All orders are poured to order within 48 hours.</p>
          <p><strong className="text-ink">Delivery:</strong> Tracked shipping across India, typically 3–5 working days. Free over ₹999, otherwise ₹69.</p>
          <p><strong className="text-ink">Tracking:</strong> Email <a href="mailto:hello@wicwhisper.com" className="underline">hello@wicwhisper.com</a> with your order ID and we’ll send the tracking link.</p>
          <p><strong className="text-ink">Damage:</strong> If a jar arrives broken, send a photo within 48 hours of delivery and we’ll replace it.</p>
          <p><strong className="text-ink">Returns:</strong> Unburnt candles in original packaging can be returned within 7 days. Bespoke and gift sets are non-returnable.</p>
        </div>
      </div>
    </div>
  );
}
