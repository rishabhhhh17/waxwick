export default function Marquee({ items }: { items: string[] }) {
  const all = [...items, ...items];
  return (
    <div className="bg-clay-900 text-cream-100 py-3 overflow-hidden border-y border-cream-100/10">
      <div className="flex gap-12 kbd-marquee whitespace-nowrap">
        {all.map((t, i) => (
          <span key={i} className="text-[12px] uppercase tracking-[0.22em] flex items-center gap-12">
            {t}
            <span className="w-1 h-1 rounded-full bg-ember-200" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
