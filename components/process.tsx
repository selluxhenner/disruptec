"use client"

import { MessageSquare, Wrench, Truck } from "lucide-react"
import { FadeUp } from "@/components/ui/fade-up"

const STEPS = [
  {
    num: "01",
    Icon: MessageSquare,
    color: "#0fd9e6",
    title: "Beratung",
    description:
      "Wir besprechen deine Anforderungen, dein Budget und deine Wünsche – persönlich via Instagram oder E-Mail. Ehrlich, unkompliziert, auf Augenhöhe.",
  },
  {
    num: "02",
    Icon: Wrench,
    color: "#985eed",
    title: "Zusammenbau",
    description:
      "Jeder PC wird sorgfältig von Hand zusammengebaut und ausführlich getestet. Sauberes Kabelmanagement und optimierter Airflow sind Standard, nicht Option.",
  },
  {
    num: "03",
    Icon: Truck,
    color: "#417ef5",
    title: "Lieferung",
    description:
      "Dein PC wird sicher verpackt und innert 48 Stunden in der ganzen Schweiz geliefert – oder persönlich übergeben, ganz nach deinem Wunsch.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 md:py-36 bg-[#080809] border-t border-[#1a1c24]">
      <div className="container mx-auto px-6">

        <FadeUp>
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0fd9e6] mb-4">So funktioniert es</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              <span className="text-[#f1f3f9]">Dein PC in</span><br />
              <span className="text-gradient">3 Schritten</span>
            </h2>
          </div>
        </FadeUp>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-0 relative">

          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-12 left-[calc(16.66%+2.5rem)] right-[calc(16.66%+2.5rem)] h-px z-0"
            style={{ background: "linear-gradient(90deg, #0fd9e6, #985eed, #417ef5)" }}
          />

          {STEPS.map(({ num, Icon, color, title, description }, i) => (
            <FadeUp key={i} delay={i * 130}>
              <div className="relative z-10 flex flex-col items-center text-center px-8 py-10 group">

                {/* Icon box */}
                <div
                  className="w-24 h-24 mb-8 flex flex-col items-center justify-center border transition-all duration-300 group-hover:scale-105"
                  style={{
                    borderColor: `${color}30`,
                    background:  `${color}08`,
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = `${color}70`
                    ;(e.currentTarget as HTMLDivElement).style.background  = `${color}12`
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = `${color}30`
                    ;(e.currentTarget as HTMLDivElement).style.background  = `${color}08`
                  }}
                >
                  <Icon className="w-6 h-6 mb-1" style={{ color }} />
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: `${color}80` }}>
                    {num}
                  </span>
                </div>

                <h3 className="text-sm font-black uppercase tracking-widest text-[#f1f3f9] mb-4">{title}</h3>
                <p className="text-sm text-[#71717a] leading-relaxed">{description}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={400}>
          <div className="text-center mt-16">
            <button
              className="bg-[#985eed] hover:bg-[#b07ff5] text-white text-xs font-black uppercase tracking-[0.3em] px-10 py-4 transition-all duration-300 shadow-[0_0_32px_rgba(152,94,237,0.25)] hover:shadow-[0_0_48px_rgba(152,94,237,0.5)] cursor-pointer"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Jetzt starten
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
