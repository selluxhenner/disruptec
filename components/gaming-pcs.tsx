"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FadeUp } from "@/components/ui/fade-up"
import { ExternalLink, Eye } from "lucide-react"
import { getAllPCs } from "@/lib/pc-service"
import type { PCDocument } from "@/lib/types"
import { formatChf } from "@/lib/utils"

export function GamingPcs() {
  const [pcs, setPcs] = useState<PCDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPCs()
      .then(setPcs)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="gaming-pcs" className="py-24 md:py-36 bg-[#0a0a0b] border-t border-[#1a1c24]">
      <div className="container mx-auto px-6">

        <FadeUp>
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0fd9e6] mb-4">Aktuelle Builds</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              <span className="text-[#f1f3f9]">Gaming PCs —</span><br />
              <span className="text-gradient">Sofort verfügbar</span>
            </h2>
          </div>
        </FadeUp>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px  max-w-7xl mx-auto mb-12">
            {[1, 2, 3].map(i => <div key={i} className="bg-[#0a0a0b] aspect-[4/5] animate-pulse" />)}
          </div>
        ) : pcs.length === 0 ? (
          <p className="text-center text-[#52525b] py-16 uppercase tracking-widest text-xs">Keine PCs verfügbar</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px  max-w-7xl mx-auto mb-12">
            {pcs.map((pc, i) => {
              const images = pc.images ?? []
              const tags = pc.usageTags ?? []
              const specChips = [
                { label: "CPU", value: pc.cpu },
                { label: "GPU", value: pc.gpu },
                { label: "RAM", value: pc.ram },
                { label: "Storage", value: pc.storage },
              ].filter((s) => s.value && s.value.trim() !== "")

              return (
                <FadeUp key={pc.id} delay={(i % 3) * 80}>
                  <div className="group bg-[#0a0a0b] hover:bg-[#0d0d12] transition-colors duration-300 h-full flex flex-col">

                    {/* Image */}
                    <Link href={`/pc/${pc.slug}`} className="block relative overflow-hidden aspect-[4/3] cursor-pointer">
                      <img
                        src={images[0] || "/placeholder.svg"}
                        alt={pc.name}
                        loading={i < 3 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="border border-[#0fd9e6]/50 px-5 py-3 flex items-center gap-2 backdrop-blur-sm bg-black/20">
                          <Eye className="w-4 h-4 text-[#0fd9e6]" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#0fd9e6]">
                            Details ansehen
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-6 flex flex-col gap-4 flex-1">
                      <Link href={`/pc/${pc.slug}`} className="hover:text-[#208c8c] transition-colors duration-200">
                        <h3 className="text-base font-black uppercase tracking-widest text-[#f1f3f9]">{pc.name}</h3>
                      </Link>
                      {pc.shortDescription && (
                        <p className="text-xs text-[#71717a] leading-relaxed line-clamp-2">{pc.shortDescription}</p>
                      )}

                      {/* Spec chips */}
                      {(specChips.length > 0 || tags.length > 0) && (
                        <div className="flex flex-wrap gap-1.5">
                          {specChips.map((spec) => (
                            <span
                              key={spec.label}
                              title={`${spec.label}: ${spec.value}`}
                              className="text-[9px] font-bold uppercase tracking-wider text-[#71717a] border border-[#1a1c24] px-2 py-1"
                            >
                              {spec.value}
                            </span>
                          ))}
                          {tags.slice(0, 1).map((tag) => (
                            <span
                              key={`tag-${tag}`}
                              className="text-[9px] font-bold uppercase tracking-wider text-[#0fd9e6] border border-[#0fd9e6]/30 bg-[#0fd9e6]/6 px-2 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price + CTA */}
                      <div className="mt-auto pt-4 border-t border-[#1a1c24] flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-[#52525b]">Preis</p>
                          <p className="text-2xl font-black text-[#0fd9e6] tabular-nums">
                            CHF {formatChf(pc.priceChf ?? pc.price)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/pc/${pc.slug}`}>
                            <button className="border border-[#1a1c24] hover:border-[#5eead4]/50 hover:text-[#5eead4] text-[#f1f3f9] text-[9px] font-black uppercase tracking-widest px-3 py-2 transition-all bg-transparent cursor-pointer">
                              Details
                            </button>
                          </Link>
                          <button
                            className="bg-[#208c8c] hover:bg-[#2bb3b3] text-white text-[9px] font-black uppercase tracking-widest px-3 py-2 transition-colors cursor-pointer"
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                          >
                            Anfragen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        )}

        <FadeUp delay={200}>
          <div className="max-w-3xl mx-auto border border-[#1a1c24] bg-[#0d0d12] p-8 text-center">
            <p className="text-xs text-[#71717a] mb-4 uppercase tracking-widest">
              Weitere aktuelle Angebote auf Ricardo
            </p>
            <button
              className="border border-[#5eead4]/35 text-[#5eead4] hover:bg-[#5eead4] hover:text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
              onClick={() => window.open("https://www.ricardo.ch/de/shop/DISRUPTEC/offers/", "_blank")}
            >
              Ricardo Angebote ansehen
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
