import { FadeUp } from "@/components/ui/fade-up"
import { Star } from "lucide-react"

const REVIEWS = [
  {
    name: "Lukas M.",
    location: "Zürich",
    build: "High-End Gaming Build",
    text: "Absolut top Service! Mein Gaming PC läuft perfekt und das Kabelmanagement ist ein Kunstwerk. Sehr empfehlenswert – werde definitiv wieder bestellen.",
    color: "#985eed",
  },
  {
    name: "Sarah K.",
    location: "Bern",
    build: "Mid-Range Allrounder",
    text: "Super Beratung, faire Preise und blitzschnelle Lieferung. Hat alles genau so geklappt wie besprochen. Endlich ein Anbieter, dem man vertrauen kann!",
    color: "#0fd9e6",
  },
  {
    name: "Marco B.",
    location: "Basel",
    build: "Workstation Build",
    text: "Hatte viele Fragen und bekam immer schnell und ehrlich Antwort. Der PC übertrifft alle Erwartungen – Rendering läuft jetzt endlich flüssig.",
    color: "#417ef5",
  },
  {
    name: "Tim H.",
    location: "Luzern",
    build: "Budget Gaming PC",
    text: "Für das Budget ein unglaubliches System. Hätte nicht gedacht, dass so eine Qualität möglich ist. Bin begeistert von der Verarbeitung!",
    color: "#985eed",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-36 bg-[#0a0a0b] border-t border-[#1a1c24]">
      <div className="container mx-auto px-6">

        <FadeUp>
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0fd9e6] mb-4">Was Kunden sagen</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              <span className="text-[#f1f3f9]">Echte Builds,</span><br />
              <span className="text-gradient">Echte Stimmen</span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1c24] max-w-7xl mx-auto">
          {REVIEWS.map((r, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="group bg-[#0a0a0b] hover:bg-[#0d0d12] transition-colors duration-300 p-8 flex flex-col gap-5 h-full cursor-default">

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5" style={{ fill: r.color, color: r.color }} />
                  ))}
                </div>

                <blockquote className="text-sm text-[#a1a1aa] leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </blockquote>

                <div
                  className="h-px transition-all duration-300 group-hover:opacity-60"
                  style={{ background: `linear-gradient(90deg, ${r.color}50, transparent)` }}
                />

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#f1f3f9]">{r.name}</p>
                  <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: `${r.color}90` }}>
                    {r.location} · {r.build}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={350}>
          <div className="mt-16 text-center flex flex-col items-center gap-3">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className="w-5 h-5" style={{ fill: "#985eed", color: "#985eed" }} />
              ))}
            </div>
            <p className="text-xs uppercase tracking-widest text-[#52525b]">
              5.0 / 5.0 — basierend auf echten Kundenbewertungen
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
