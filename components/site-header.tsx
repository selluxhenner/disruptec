"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Instagram, Mail, Menu, ShoppingBag, X } from "lucide-react"

const NAV_LINKS = [
  { href: "/#gaming-pcs",   label: "Gaming PCs" },
  { href: "/#why",          label: "Warum wir" },
  { href: "/#process",      label: "Ablauf" },
  { href: "/#build-guides", label: "Build Guides" },
  { href: "/#testimonials", label: "Community" },
  { href: "/#contact",      label: "Kontakt" },
]

const SOCIALS = [
  { href: "https://instagram.com/dt.disruptec.ch",              Icon: Instagram,   label: "Instagram" },
  { href: "https://www.ricardo.ch/de/shop/DISRUPTEC/offers/",   Icon: ShoppingBag, label: "Ricardo" },
  { href: "mailto:info@disruptec.ch",                           Icon: Mail,        label: "E-Mail" },
]

const menuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, when: "beforeChildren", staggerChildren: 0.06 } },
  exit:    { opacity: 0, transition: { duration: 0.2, when: "afterChildren" } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
  exit:    { opacity: 0, y: 12, transition: { duration: 0.15 } },
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-[#1a1c24]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <img src="/disruptec-logo.png" alt="" aria-hidden="true" className="h-7 w-auto" />
            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#f1f3f9] group-hover:text-[#0fd9e6] transition-colors">
              DISRUPTEC
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(0, 5).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#71717a] hover:text-[#f1f3f9] transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link href="/#contact">
              <button className="bg-[#208c8c] hover:bg-[#2bb3b3] text-white text-[10px] font-black uppercase tracking-[0.25em] px-5 py-2.5 transition-colors cursor-pointer">
                Anfragen
              </button>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[#f1f3f9] p-1 cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
            aria-expanded={open}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile menu ─────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] lg:hidden bg-[#080809]/97 backdrop-blur-2xl flex flex-col"
          >
            {/* Top row */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1c24]">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <img src="/disruptec-logo.png" alt="" aria-hidden="true" className="h-7 w-auto" />
                <span className="text-sm font-black uppercase tracking-[0.3em] text-[#f1f3f9]">
                  DISRUPTEC
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schliessen"
                className="text-[#f1f3f9] hover:text-[#0fd9e6] transition-colors p-1 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1 overflow-y-auto">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div key={href} variants={itemVariants}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-3"
                  >
                    <span className="text-[10px] font-black tabular-nums text-[#208c8c]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl font-black uppercase tracking-tight text-[#f1f3f9] group-hover:text-gradient group-active:text-[#0fd9e6] transition-colors leading-none">
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="pt-8">
                <Link href="/#contact" onClick={() => setOpen(false)}>
                  <button className="w-full bg-[#208c8c] hover:bg-[#2bb3b3] text-white text-xs font-black uppercase tracking-[0.3em] px-6 py-4 transition-colors cursor-pointer">
                    Jetzt anfragen
                  </button>
                </Link>
              </motion.div>
            </nav>

            {/* Socials */}
            <motion.div variants={itemVariants} className="border-t border-[#1a1c24] px-8 py-6">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#52525b] mb-4">
                Folge uns
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex items-center gap-2.5 border border-[#1a1c24] hover:border-[#0fd9e6]/50 bg-[#0d0d12] px-4 py-3 transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-[#0fd9e6]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#a1a1aa] group-hover:text-[#f1f3f9] transition-colors">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
