"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Mail } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - could integrate with an API or email service
    console.log("Form submitted:", formData)
    alert("Danke für deine Nachricht! Wir melden uns bald bei dir.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              Kontakt & <span className="text-primary">Anfrage</span>
            </h2>
            <p className="text-muted-foreground text-lg">Bereit für deinen perfekten PC? Lass uns sprechen!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Schreib uns direkt</h3>
                <div className="space-y-4">
                  <a
                    href="https://instagram.com/dt.disruptec.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary transition-all group"
                  >
                    <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-all">
                      <Instagram className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Instagram</p>
                      <p className="text-sm text-muted-foreground">@dt.disruptec.ch</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@disruptec.ch"
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-accent transition-all group"
                  >
                    <div className="p-3 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-all">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">E-Mail</p>
                      <p className="text-sm text-muted-foreground">info@disruptec.ch</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h4 className="font-bold mb-3 uppercase tracking-wide">Öffnungszeiten</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Montag - Freitag: 10:00 - 18:00</p>
                  <p>Samstag: Nach Vereinbarung</p>
                  <p>Sonntag: Geschlossen</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Oder schick uns eine Nachricht</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Dein Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-card border-border"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Deine E-Mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-card border-border"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Deine Nachricht (z.B. Budget, gewünschte Spiele, spezielle Anforderungen)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-card border-border resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-wide text-lg py-6"
                >
                  Nachricht senden
                </Button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p className="mb-2">© 2025 DISRUPTEC – Premium PC Manufaktur Schweiz</p>
            <p>Handgefertigt mit Leidenschaft für Gaming und Technologie</p>
          </div>
        </div>
      </div>
    </section>
  )
}
