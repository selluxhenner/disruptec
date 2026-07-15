"use client"

import { useState, type FormEvent } from "react"
import { FadeUp } from "@/components/ui/fade-up"
import { Instagram, Mail, Clock } from "lucide-react"

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent]   = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = `Anfrage von ${form.name}`
    const body = `Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:info@disruptec.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setSent(false), 8000)
  }

  const inputClass =
    "w-full bg-[#0d0d12] border border-[#1a1c24] focus:border-[#208c8c]/50 text-[#f1f3f9] placeholder-[#52525b] text-sm px-5 py-4 outline-none transition-colors duration-200"

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#0a0a0b] border-t border-[#1a1c24]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">

          <FadeUp>
            <div className="text-center mb-20">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0fd9e6] mb-4">Kontakt</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
                <span className="text-[#f1f3f9]">Lass uns deinen</span><br />
                <span className="text-gradient">PC bauen</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-px">

            {/* Left */}
            <FadeUp delay={100}>
              <div className="bg-[#0a0a0b] p-10 flex flex-col gap-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#52525b] mb-5">Direkt schreiben</p>
                  <div className="space-y-3">
                    {[
                      { href: "https://instagram.com/dt.disruptec.ch", Icon: Instagram, label: "Instagram", sub: "@dt.disruptec.ch", color: "#208c8c", target: "_blank" },
                      { href: "mailto:info@disruptec.ch",               Icon: Mail,      label: "E-Mail",    sub: "info@disruptec.ch",    color: "#5eead4", target: undefined },
                    ].map(({ href, Icon, label, sub, color, target }) => (
                      <a
                        key={label}
                        href={href}
                        target={target}
                        rel={target ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 border border-[#1a1c24] bg-[#0d0d12] px-5 py-4 transition-all duration-300 cursor-pointer group"
                        style={{ "--c": color } as React.CSSProperties}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}40` }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "" }}
                      >
                        <Icon className="w-5 h-5 shrink-0" style={{ color }} />
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-[#f1f3f9]">{label}</p>
                          <p className="text-[10px] text-[#52525b] mt-0.5">{sub}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border border-[#1a1c24] bg-[#0d0d12] px-5 py-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-[#5eead4]" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#f1f3f9]">Öffnungszeiten</p>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#52525b]">
                    <p>Mo – Fr: 10:00 – 18:00</p>
                    <p>Samstag: Nach Vereinbarung</p>
                    <p>Sonntag: Geschlossen</p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[#1a1c24] space-y-2">
                  {[
                    ["Antwort innerhalb 24h",  "#0fd9e6"],
                    ["Kostenlose Beratung",     "#208c8c"],
                    ["Kein Kaufzwang",          "#5eead4"],
                  ].map(([text, color]) => (
                    <p key={text} className="text-[10px] uppercase tracking-widest text-[#71717a] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full" style={{ background: color }} />
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Right */}
            <FadeUp delay={200}>
              <div className="bg-[#0a0a0b] p-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#52525b] mb-6">Nachricht senden</p>

                {sent ? (
                  <div className="flex items-center justify-center border border-[#208c8c]/30 bg-[#208c8c]/5 px-6 py-16">
                    <div className="text-center">
                      <p className="text-2xl font-black uppercase tracking-widest text-gradient mb-2">Fast geschafft!</p>
                      <p className="text-xs text-[#71717a] uppercase tracking-widest">
                        Dein E-Mail-Programm öffnet sich – einfach absenden.
                      </p>
                      <p className="mt-3 text-[10px] text-[#52525b] uppercase tracking-widest">
                        Kein E-Mail-Programm? Schreib uns direkt an info@disruptec.ch
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text"  placeholder="Dein Name"    value={form.name}    onChange={e => setForm({...form, name: e.target.value})}    required className={inputClass} />
                    <input type="email" placeholder="Deine E-Mail" value={form.email}   onChange={e => setForm({...form, email: e.target.value})}   required className={inputClass} />
                    <textarea
                      placeholder="Deine Nachricht (Budget, gewünschte Spiele, Anforderungen…)"
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      required rows={6}
                      className={`${inputClass} resize-none`}
                    />
                    <button
                      type="submit"
                      className="w-full text-white text-xs font-black uppercase tracking-[0.3em] py-4 transition-all duration-300 cursor-pointer"
                      style={{
                        background: "linear-gradient(90deg, #208c8c, #5eead4)",
                        boxShadow:  "0 0 0px rgba(32,140,140,0)",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(32,140,140,0.4), 0 0 64px rgba(94,234,212,0.2)" }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0px rgba(32,140,140,0)" }}
                    >
                      Nachricht senden
                    </button>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  )
}
