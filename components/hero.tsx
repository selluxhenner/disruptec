"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1d1d1d]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/premium-gaming-pc-with-rgb-lighting-on-dark-backgr.jpg"
          alt="DISRUPTEC Gaming PC"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1d]/60 via-[#273b40]/80 to-[#1d1d1d]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block mb-8">
            <img
              src="/disruptec-logo.jpg"
              alt="DISRUPTEC Logo"
              className="h-24 md:h-32 lg:h-40 w-auto mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-balance text-[#cae9ea]">
            Deine Premium PC Manufaktur in der Schweiz
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-[#3c4748] max-w-2xl mx-auto text-pretty">
            Handgebaute Gaming PCs, durchdachte Build Guides und ehrliche Beratung.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-[#208c8c] hover:bg-[#208c8c]/80 text-white text-lg px-8 py-6 uppercase tracking-wide font-semibold transition-all hover:shadow-lg hover:shadow-[#208c8c]/50"
              onClick={() => document.getElementById("gaming-pcs")?.scrollIntoView({ behavior: "smooth" })}
            >
              Gaming PCs ansehen
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#cae9ea] text-[#cae9ea] hover:bg-[#cae9ea] hover:text-[#1d1d1d] text-lg px-8 py-6 uppercase tracking-wide font-semibold transition-all bg-transparent"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Individuelle Anfrage
            </Button>
          </div>

          {/* Info Text */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-[#3c4748]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#208c8c] rounded-full"></span>
              Versand in der ganzen Schweiz
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#208c8c] rounded-full"></span>
              Auf Wunsch persönliche Übergabe
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-[#208c8c]" />
      </div>
    </section>
  )
}
