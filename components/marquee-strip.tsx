const ITEMS = [
  "DISRUPTEC",
  "PREMIUM PC MANUFAKTUR",
  "HANDGEBAUT IN DER SCHWEIZ",
  "SAUBERES CABLE MANAGEMENT",
  "SEIT 2022",
  "FAIR & TRANSPARENT",
]

export function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="relative overflow-hidden py-3 border-y border-transparent"
      style={{
        background: "linear-gradient(90deg, #208c8c 0%, #5eead4 50%, #0fd9e6 100%)",
        borderImage: "linear-gradient(90deg,#208c8c,#0fd9e6) 1",
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-5 text-[11px] font-black uppercase tracking-[0.35em] text-black/80"
          >
            {item}
            <span className="text-black/30 text-sm leading-none select-none">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
