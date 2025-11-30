"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Eye } from "lucide-react"
import { getAllPCs } from "@/lib/pc-service"
import type { PCDocument } from "@/lib/types"

export function GamingPcs() {
  const [pcs, setPcs] = useState<PCDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPCs()
  }, [])

  const loadPCs = async () => {
    try {
      const data = await getAllPCs()
      setPcs(data)
    } catch (error) {
      console.error("[v0] Error loading PCs:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="gaming-pcs" className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gaming-pcs" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            Gaming PCs – <span className="text-secondary">Aktuelle Builds</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fertig konfigurierte Systeme, sofort verfügbar
          </p>
        </div>

        {pcs.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>Keine PCs verfügbar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {pcs.map((pc) => (
              <div
                key={pc.id}
                className="group bg-background border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href={`/pc/${pc.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
                    <img
                      src={pc.images[0] || "/placeholder.svg"}
                      alt={pc.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="w-12 h-12 text-primary mx-auto mb-2" />
                        <p className="text-white font-semibold uppercase tracking-wide">Details ansehen</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="p-6 space-y-4">
                  <Link href={`/pc/${pc.slug}`} className="block hover:text-primary transition-colors">
                    <h3 className="text-2xl font-bold uppercase tracking-wide">{pc.name}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm">{pc.shortDescription}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {pc.cpu}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {pc.gpu}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {pc.ram}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {pc.storage}
                    </Badge>
                    {pc.usageTags.slice(0, 1).map((tag) => (
                      <Badge key={tag} className="text-xs bg-primary/20 text-primary border-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                    <div>
                      <p className="text-3xl font-bold text-primary">CHF {pc.priceChf.toLocaleString("de-CH")}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/pc/${pc.slug}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="uppercase tracking-wide border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                        >
                          Details
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 uppercase tracking-wide"
                        onClick={() => {
                          const contact = document.getElementById("contact")
                          if (contact) {
                            contact.scrollIntoView({ behavior: "smooth" })
                          }
                        }}
                      >
                        Anfragen
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ricardo Link */}
        <div className="text-center bg-muted/30 border border-border rounded-lg p-8 max-w-3xl mx-auto">
          <p className="text-muted-foreground mb-4">Weitere aktuelle Angebote findest du auch auf Ricardo</p>
          <Button
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground uppercase tracking-wide bg-transparent"
            onClick={() => window.open("https://ricardo.ch", "_blank")}
          >
            Zu den Ricardo Angeboten
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
