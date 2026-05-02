export default function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Promotion"
      className="bg-ember-500 text-clay-900"
    >
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-5 text-center md:px-8">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest">
          Get 15% off your order with code{' '}
          <span className="font-mono font-bold">WELCOME15</span>
        </p>
      </div>
    </div>
  );
}
