export const metadata = { title: 'Terms · waxwick' };

export default function TermsPage() {
  return (
    <div className="bg-cream-50">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <h1 className="font-display text-[40px] leading-tight text-ink">Terms of service</h1>
        <div className="mt-6 space-y-4 text-clay-700 text-[15.5px] leading-[1.7]">
          <p>Prices are in INR and inclusive of GST. We reserve the right to update pricing without prior notice.</p>
          <p>Orders are confirmed once payment is captured by Razorpay. We hand-pour to order; cancellations are accepted up to 6 hours after order placement.</p>
          <p>Burn responsibly: never leave a lit candle unattended, keep away from flammable materials and children, and always trim the wick to 5 mm before each burn.</p>
          <p>By placing an order on waxwick.in, you agree to these terms.</p>
        </div>
      </div>
    </div>
  );
}
