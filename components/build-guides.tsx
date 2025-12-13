"use client"

import { Button } from "@/components/ui/button"
import { FileText, Wrench } from "lucide-react"

export function BuildGuides() {
  return (
    <section id="build-guides" className="py-20 md:py-32 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            Build Guides & <span className="text-accent">Konfiguration</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Lerne, verstehe und baue deinen perfekten PC
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Build Guides */}
          <div className="bg-card border border-border rounded-lg p-8 hover:border-secondary transition-all">
            <div className="mb-6 inline-flex p-4 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20">
              <FileText className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">Build Guides</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Ausführliche Anleitungen für verschiedene Budgets und Einsatzzwecke. Verstehe, welche Komponenten
              zusammenpassen und warum.
            </p>
            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                Budget Gaming PC (CHF 800-1200)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                Mid-Range Allrounder (CHF 1500-2000)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                High-End Gaming (CHF 2500+)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                Workstation für Content Creator
              </li>
            </ul>
            <Button
              className="w-full bg-secondary hover:bg-secondary/90 uppercase tracking-wide"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Guide anfordern
            </Button>
          </div>

          {/* Custom Configuration */}
          <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-all">
            <div className="mb-6 inline-flex p-4 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20">
              <Wrench className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">Individuelle Konfiguration</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Du hast spezielle Anforderungen? Wir beraten dich persönlich und stellen dein optimales System zusammen.
            </p>
            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Persönliche Beratung via WhatsApp/Instagram
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Angepasst an dein Budget & deine Games
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Upgrade-Beratung für bestehende PCs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Transparente Preise, keine versteckten Kosten
              </li>
            </ul>
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-wide"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Beratung anfragen
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
