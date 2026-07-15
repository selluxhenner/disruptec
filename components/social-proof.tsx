"use client"

import { Instagram } from "lucide-react"
import { FadeUp } from "@/components/ui/fade-up"

const POSTS = [
  { image: "/images/disruptec1.jpg", alt: "PC Build 1" },
  { image: "/images/disruptec2.jpg", alt: "PC Build 2" },
  { image: "/images/disruptec3.jpg", alt: "PC Build 3" },
  { image: "/images/disruptec4.jpg", alt: "PC Build 4" },
  { image: "/images/disruptec5.jpg", alt: "PC Build 5" },
  { image: "/images/disruptec6.jpg", alt: "PC Build 6" },
]

export function SocialProof() {
  return (
    <section id="social" className="py-24 md:py-36 bg-[#080809] border-t border-[#1a1c24]">
      <div className="container mx-auto px-6">

        <FadeUp>
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0fd9e6] mb-4">Folge uns</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              <span className="text-gradient">@dt.disruptec.ch</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#52525b] mt-4">
              Updates, Build-Prozesse & Inspiration auf Instagram
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px  max-w-5xl mx-auto mb-12">
          {POSTS.map((post, i) => (
            <FadeUp key={i} delay={(i % 3) * 70}>
              <div
                className="group relative aspect-square overflow-hidden cursor-pointer w-full"
                onClick={() => window.open("https://instagram.com/dt.disruptec.ch", "_blank")}
              >
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(32,140,140,0.6), rgba(94,234,212,0.6), rgba(15,217,230,0.6))" }}
                >
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={250}>
          <div className="text-center">
            <button
              className="border border-[#208c8c]/40 text-[#208c8c] hover:bg-[#208c8c] hover:text-white text-[10px] font-black uppercase tracking-[0.3em] px-10 py-4 transition-all duration-300 cursor-pointer inline-flex items-center gap-3"
              onClick={() => window.open("https://instagram.com/dt.disruptec.ch", "_blank")}
            >
              <Instagram className="w-4 h-4" />
              Auf Instagram folgen
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
