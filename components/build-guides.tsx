"use client"

import { FileText, Wrench, Check } from "lucide-react"
import { FadeUp } from "@/components/ui/fade-up"

const GUIDES = [
  {
    Icon: FileText,
    color: "#208c8c",
    title: "Build Guides",
    description:
      "Ausführliche Anleitungen für verschiedene Budgets und Einsatzzwecke. Verstehe, welche Komponenten zusammenpassen und warum.",
    items: [
      "Budget Gaming PC (CHF 800–1200)",
      "Mid-Range Allrounder (CHF 1500–2000)",
      "High-End Gaming (CHF 2500+)",
      "Workstation für Content Creator",
    ],
    cta: "Guide anfordern",
  },
  {
    Icon: Wrench,
    color: "#0fd9e6",
    title: "Individuelle Konfiguration",
    description:
      "Du hast spezielle Anforderungen? Wir beraten dich persönlich und stellen dein optimales System zusammen.",
    items: [
      "Persönliche Beratung via WhatsApp/Instagram",
      "Angepasst an dein Budget & deine Games",
      "Upgrade-Beratung für bestehende PCs",
      "Transparente Preise, keine versteckten Kosten",
    ],
    cta: "Beratung anfragen",
  },
]

export function BuildGuides() {
  return (
    <section id="build-guides" className="py-24 md:py-36 bg-[#080809] border-t border-[#1a1c24]">
      <div className="container mx-auto px-6">

        <FadeUp>
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0fd9e6] mb-4">Know-How & Beratung</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              <span className="text-[#f1f3f9]">Build Guides &</span><br />
              <span className="text-gradient">Konfiguration</span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-px  max-w-5xl mx-auto">
          {GUIDES.map(({ Icon, color, title, description, items, cta }, i) => (
            <FadeUp key={i} delay={i * 150}>
              <div className="group bg-[#080809] hover:bg-[#0a0a0b] transition-colors duration-300 p-10 flex flex-col gap-6 h-full">
                <div
                  className="inline-flex p-4 w-fit transition-colors duration-300"
                  style={{ background: `${color}10` }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#f1f3f9] mb-3">{title}</h3>
                  <p className="text-sm text-[#71717a] leading-relaxed">{description}</p>
                </div>

                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
                      <span className="text-xs text-[#71717a] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <button
                    className="w-full text-white text-[10px] font-black uppercase tracking-[0.3em] py-4 transition-all duration-300 cursor-pointer"
                    style={{
                      background: color,
                      boxShadow: `0 0 0 rgba(${color},0)`,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1" }}
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    {cta}
                  </button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
