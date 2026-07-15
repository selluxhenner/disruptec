import { Package, Cable, Shield } from "lucide-react"
import { FadeUp } from "@/components/ui/fade-up"

const features = [
  {
    Icon: Package,
    color: "#0fd9e6",
    title: "Handgefertigt statt Massenware",
    description:
      "Jeder PC wird einzeln geplant, sauber verkabelt und ausführlich getestet – kein anonymer Großhandel, sondern echte Manufaktur.",
  },
  {
    Icon: Cable,
    color: "#208c8c",
    title: "Sauberes Cable-Management",
    description: "Innen so schön wie außen: optimierter Airflow, aufgeräumte Kabel, hochwertige Komponenten.",
  },
  {
    Icon: Shield,
    color: "#5eead4",
    title: "Fair und transparent",
    description:
      "Ehrliche Empfehlungen, klare Preise und Build Guides, damit du verstehst, was in deinem System steckt.",
  },
]

export function WhyDisruptec() {
  return (
    <section id="why" className="py-24 md:py-36 bg-[#0a0a0b]">
      <div className="container mx-auto px-6">

        <FadeUp>
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0fd9e6] mb-4">Warum DISRUPTEC</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              <span className="text-[#f1f3f9]">Qualität, die man</span><br />
              <span className="text-gradient">sieht und spürt</span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-px max-w-6xl mx-auto">
          {features.map(({ Icon, color, title, description }, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className="group bg-[#0a0a0b] hover:bg-[#0d0d12] p-10 transition-colors duration-300 cursor-default h-full flex flex-col">
                <div
                  className="mb-7 inline-flex p-4 w-fit transition-colors duration-300"
                  style={{ background: `${color}12` }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>
                <h3 className="text-sm font-black mb-4 uppercase tracking-widest text-[#f1f3f9]">{title}</h3>
                <p className="text-sm text-[#71717a] leading-relaxed flex-1">{description}</p>
                <div
                  className="mt-8 h-px w-8 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
