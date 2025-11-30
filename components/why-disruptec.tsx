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
    <section id="why" className="py-20 md:py-32 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            Warum <span className="text-primary">DISRUPTEC</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Premium-Qualität, die man sieht und spürt</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6 inline-flex p-4 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
