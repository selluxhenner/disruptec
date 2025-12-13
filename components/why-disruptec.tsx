import { Package, Cable, Shield } from "lucide-react"

const features = [
  {
    icon: Package,
    title: "Handgefertigt statt Massenware",
    description:
      "Jeder PC wird einzeln geplant, sauber verkabelt und ausführlich getestet – kein anonymer Großhandel, sondern echte Manufaktur.",
  },
  {
    icon: Cable,
    title: "Sauberes Cable-Management",
    description: "Innen so schön wie außen: optimierter Airflow, aufgeräumte Kabel, hochwertige Komponenten.",
  },
  {
    icon: Shield,
    title: "Fair und transparent",
    description:
      "Ehrliche Empfehlungen, klare Preise und Build Guides, damit du verstehst, was in deinem System steckt.",
  },
]

export function WhyDisruptec() {
  return (
    <section id="why" className="py-20 md:py-32 bg-gradient-to-b from-[#1d1d1d] to-[#273b40]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4 text-[#cae9ea]">
            Warum <span className="text-[#208c8c]">DISRUPTEC</span>
          </h2>
          <p className="text-[#3c4748] text-lg max-w-2xl mx-auto">Premium-Qualität, die man sieht und spürt</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-[#273b40] border border-[#3c4748] rounded-lg p-8 hover:border-[#208c8c] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#208c8c]/20"
              >
                <div className="mb-6 inline-flex p-4 rounded-lg bg-gradient-to-br from-[#208c8c]/20 to-[#273b40]/40 group-hover:from-[#208c8c]/40 group-hover:to-[#273b40]/60 transition-all">
                  <Icon className="w-8 h-8 text-[#208c8c]" />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide text-[#cae9ea]">{feature.title}</h3>
                <p className="text-[#3c4748] leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
