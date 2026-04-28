export const metadata = { title: 'Privacy policy · waxwick' };

export default function PrivacyPage() {
  return (
    <div className="bg-cream-50">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <h1 className="font-display text-[40px] leading-tight text-ink">Privacy policy</h1>
        <div className="mt-6 space-y-4 text-clay-700 text-[15.5px] leading-[1.7]">
          <p>We collect only what we need to fulfil your order: your name, email, phone number, and delivery address.</p>
          <p>Payments are processed by Razorpay; we never see or store your card or UPI details.</p>
          <p>We use Meta Pixel to measure ad performance. If you’d like your data deleted, email <a className="underline" href="mailto:hello@waxwick.in">hello@waxwick.in</a> from the address on your order.</p>
          <p>We do not sell your personal information to third parties.</p>
        </div>
      </div>
    </div>
  );
}
