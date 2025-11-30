"use client"

import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const instagramPosts = [
  {
    image: "/images/disruptec1.jpg",
    alt: "PC Build 1",
  },
  {
    image: "/images/disruptec2.jpg",
    alt: "PC Build 2",
  },
  {
    image: "/images/disruptec3.jpg",
    alt: "PC Build 3",
  },
  {
    image: "/images/disruptec4.jpg",
    alt: "PC Build 4",
  },
  {
    image: "/images/disruptec5.jpg",
    alt: "PC Build 5",
  },
  {
    image: "/images/disruptec6.jpg",
    alt: "PC Build 6",
  },
]

export function SocialProof() {
  return (
    <section id="social" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">@dt.disruptec.ch</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Folge uns auf Instagram für Updates, Build-Prozesse und Inspiration
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {instagramPosts.map((post, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-12 h-12 text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white uppercase tracking-wide px-8"
            onClick={() => window.open("https://instagram.com/dt.disruptec.ch", "_blank")}
          >
            <Instagram className="mr-2 w-5 h-5" />
            Auf Instagram folgen
          </Button>
        </div>
      </div>
    </section>
  )
}
