import Link from "next/link"
import { Instagram, Mail, ExternalLink } from "lucide-react"

const SITE_LINKS = [
  { href: "/#gaming-pcs",   label: "Gaming PCs" },
  { href: "/#why",          label: "Warum DISRUPTEC" },
  { href: "/#process",      label: "Ablauf" },
  { href: "/#build-guides", label: "Build Guides" },
  { href: "/#contact",      label: "Kontakt" },
]

const LEGAL_LINKS = [
  { href: "/impressum",   label: "Impressum" },
  { href: "/agb",         label: "AGB" },
  { href: "/datenschutz", label: "Datenschutz" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1a1c24] bg-[#080809]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img src="/disruptec-logo.png" alt="DISRUPTEC" className="h-8 w-auto" />
              <span className="text-sm font-black uppercase tracking-[0.3em] text-[#f1f3f9]">
                DISRUPTEC
              </span>
            </Link>
            <p className="text-xs text-[#71717a] leading-relaxed max-w-xs">
              Premium PC Manufaktur aus der Schweiz. Handgebaute Gaming PCs, ehrliche Beratung und
              sauberes Cable Management – seit 2022.
            </p>
          </div>

          {/* Site */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#52525b] mb-4">Website</p>
            <ul className="space-y-2.5">
              {SITE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#a1a1aa] hover:text-[#0fd9e6] transition-colors uppercase tracking-wider"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#52525b] mb-4">Rechtliches</p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#a1a1aa] hover:text-[#0fd9e6] transition-colors uppercase tracking-wider"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#52525b] mb-4">Kontakt</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:info@disruptec.ch"
                  className="flex items-center gap-2 text-xs text-[#a1a1aa] hover:text-[#0fd9e6] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  info@disruptec.ch
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/dt.disruptec.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-[#a1a1aa] hover:text-[#0fd9e6] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  @dt.disruptec.ch
                </a>
              </li>
              <li>
                <a
                  href="https://www.ricardo.ch/de/shop/DISRUPTEC/offers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-[#a1a1aa] hover:text-[#0fd9e6] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Ricardo Shop
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-7 border-t border-[#1a1c24] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-widest text-[#52525b]">
            © {new Date().getFullYear()} DISRUPTEC – Premium PC Manufaktur Schweiz
          </p>
          <p className="text-[10px] uppercase tracking-widest text-[#52525b]">
            Website von Serviweb
          </p>
        </div>
      </div>
    </footer>
  )
}
