"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/premium-gaming-pc-with-rgb-lighting-on-dark-backgr.jpg"
          alt="DISRUPTEC Gaming PC"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo/Brand */}
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                DISRUPTEC
              </span>
            </h1>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-balance">
            Deine Premium PC Manufaktur in der Schweiz
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Handgebaute Gaming PCs, durchdachte Build Guides und ehrliche Beratung.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 uppercase tracking-wide font-semibold hover-glow transition-all"
              onClick={() => document.getElementById("gaming-pcs")?.scrollIntoView({ behavior: "smooth" })}
            >
              Gaming PCs ansehen
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 uppercase tracking-wide font-semibold transition-all bg-transparent"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Individuelle Anfrage
            </Button>
          </div>

          {/* Info Text */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Versand in der ganzen Schweiz
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Auf Wunsch persönliche Übergabe
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-accent" />
        </div>
      </div>
    </section>
  )
}
