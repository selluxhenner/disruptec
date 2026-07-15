"use client"

import { useEffect, useRef, useState } from "react"
import { FadeUp } from "@/components/ui/fade-up"

const STATS = [
  { value: 15, suffix: "+", label: "Builds abgeschlossen", sublabel: "Seit 2022",         color: "#0fd9e6" },
  { value: 4.7,   suffix: "★", label: "Kundenbewertung",      sublabel: "Durchschnitt",       color: "#208c8c" },
  { value: 24,  suffix: "h", label: "Antwortzeit",          sublabel: "Auf jede Anfrage",    color: "#5eead4" },
  { value: 100, suffix: "%", label: "Swiss Made",           sublabel: "Qualitätsgarantie",   color: "#0fd9e6" },
]

function Counter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref  = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true
          const steps = 50
          const inc   = target / steps
          let cur     = 0
          const t     = setInterval(() => {
            cur = Math.min(cur + inc, target)
            setCount(Math.floor(cur))
            if (cur >= target) clearInterval(t)
          }, 1400 / steps)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className="tabular-nums" style={{ color }}>
      {count}{suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="bg-[#080809] border-b border-[#1a1c24] py-20 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px  max-w-5xl mx-auto">
          {STATS.map((s, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div
                className="bg-[#080809] hover:bg-[#0d0d10] transition-colors duration-300 px-8 py-10 text-center group cursor-default"
                style={{ "--hover-color": s.color } as React.CSSProperties}
              >
                <p className="text-5xl md:text-6xl font-black mb-2">
                  <Counter target={s.value} suffix={s.suffix} color={s.color} />
                </p>
                <p className="text-[11px] font-black uppercase tracking-widest text-[#f1f3f9] mb-1">{s.label}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#52525b]">{s.sublabel}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
