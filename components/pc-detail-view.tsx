"use client"

import { useState } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  Cpu,
  Monitor,
  Database,
  HardDrive,
  Zap,
  Box,
  Wind,
  CircuitBoard,
} from "lucide-react"
import type { PCDocument } from "@/lib/types"
import { cn, formatChf } from "@/lib/utils"
import { SiteFooter } from "@/components/site-footer"

// ── Spec config ───────────────────────────────────────────────────────
const SPEC_CONFIG = [
  { key: "cpu",         label: "Prozessor",       Icon: Cpu },
  { key: "gpu",         label: "Grafikkarte",      Icon: Monitor },
  { key: "ram",         label: "Arbeitsspeicher",  Icon: Database },
  { key: "storage",     label: "Speicher",         Icon: HardDrive },
  { key: "motherboard", label: "Mainboard",        Icon: CircuitBoard },
  { key: "cooler",      label: "Kühlung",          Icon: Wind },
  { key: "psu",         label: "Netzteil",         Icon: Zap },
  { key: "caseModel",   label: "Gehäuse",          Icon: Box },
] as const

// ── Variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

// ── Main component ────────────────────────────────────────────────────
export function PCDetailView({ pc }: { pc: PCDocument }) {
  const images = pc.images ?? []
  const usageTags = pc.usageTags ?? []
  const features = pc.features ?? []
  const price = pc.priceChf ?? pc.price

  const [selectedImage, setSelectedImage] = useState(0)

  // Sticky price bar appears after the hero
  const { scrollY } = useScroll()
  const stickyRawOpacity = useTransform(scrollY, [420, 560], [0, 1])
  const stickyRawY       = useTransform(scrollY, [420, 560], [-24, 0])
  const stickyOpacity    = useSpring(stickyRawOpacity, { damping: 30, stiffness: 220 })
  const stickyY          = useSpring(stickyRawY,       { damping: 30, stiffness: 220 })

  // Active specs (drop empty values)
  const pcRecord = pc as unknown as Record<string, unknown>
  const activeSpecs = SPEC_CONFIG
    .map((s) => {
      const raw = pcRecord[s.key]
      const value = typeof raw === "string" ? raw.trim() : ""
      return { ...s, value }
    })
    .filter((s) => s.value.length > 0)

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">

      {/* ── Sticky price bar ──────────────────────────────────────── */}
      <motion.div
        style={{ opacity: stickyOpacity, y: stickyY }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1c24] pointer-events-none"
      >
        <div className="bg-[#0a0a0b]/90 backdrop-blur-xl px-5 py-3 pointer-events-auto">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <Link
              href="/#gaming-pcs"
              className="flex items-center gap-2 text-[#71717a] hover:text-[#f1f3f9] transition-colors text-xs group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="uppercase tracking-widest font-semibold">Zurück</span>
            </Link>

            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#f1f3f9] hidden sm:block truncate">
              {pc.name}
            </span>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[#0fd9e6] font-black text-base tabular-nums">
                CHF {formatChf(price)}
              </span>
              <Link href="/#contact">
                <button className="bg-[#208c8c] hover:bg-[#2bb3b3] text-white text-[10px] uppercase tracking-widest font-black px-4 py-2 transition-colors cursor-pointer">
                  Anfragen
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 pt-8">
        <Link
          href="/#gaming-pcs"
          className="flex items-center gap-2 text-[#71717a] hover:text-[#f1f3f9] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">Alle Gaming PCs</span>
        </Link>

        <Link
          href="/"
          className="text-[10px] font-black uppercase tracking-[0.45em] text-[#0fd9e6] border border-[#0fd9e6]/30 px-3 py-1.5 bg-[#0fd9e6]/5 hover:bg-[#0fd9e6]/10 transition-colors"
        >
          DISRUPTEC
        </Link>
      </div>

      {/* ── HERO: gallery + buy panel ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start">

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 space-y-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-[#1a1c24] bg-[#0d0d12]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`${pc.name} – Bild ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-[#0a0a0b]/80 backdrop-blur-sm border border-[#1a1c24] px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#71717a]">
                  {selectedImage + 1} / {images.length}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative aspect-square overflow-hidden border transition-all duration-300 cursor-pointer",
                      selectedImage === i
                        ? "border-[#208c8c]"
                        : "border-[#1a1c24] hover:border-[#208c8c]/50 opacity-70 hover:opacity-100"
                    )}
                  >
                    <img
                      src={img}
                      alt={`${pc.name} – Vorschau ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Buy panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            {usageTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {usageTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest text-[#0fd9e6] border border-[#0fd9e6]/40 px-3 py-1 bg-[#0fd9e6]/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#f1f3f9] leading-none">
              {pc.name}
            </h1>

            {pc.shortDescription && (
              <p className="text-[#71717a] text-base leading-relaxed max-w-xl">
                {pc.shortDescription}
              </p>
            )}

            {/* Key specs */}
            {activeSpecs.length > 0 && (
              <div className="border border-[#1a1c24] divide-y divide-[#1a1c24]">
                {activeSpecs.slice(0, 4).map((spec) => (
                  <div key={spec.key} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <spec.Icon className="w-4 h-4 text-[#0fd9e6] shrink-0" />
                      <span className="text-[10px] uppercase tracking-widest text-[#71717a]">
                        {spec.label}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm font-bold text-[#f1f3f9] text-right max-w-[55%]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Price + CTA */}
            <div className="border border-[#208c8c]/30 bg-[#208c8c]/5 p-6">
              <p className="text-[10px] uppercase tracking-widest text-[#71717a] mb-1.5">Gesamtpreis</p>
              <p className="text-5xl font-black text-[#0fd9e6] tabular-nums leading-none">
                CHF {formatChf(price)}
              </p>
              <p className="text-[10px] text-[#71717a] mt-2.5 uppercase tracking-wider">
                inkl. MwSt. & professionellem Zusammenbau
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href="/#contact" className="flex-1">
                  <button className="w-full bg-[#208c8c] hover:bg-[#2bb3b3] text-white text-xs uppercase tracking-widest font-black px-6 py-4 transition-colors cursor-pointer">
                    Jetzt anfragen
                  </button>
                </Link>
                <Link href="/#gaming-pcs" className="flex-1">
                  <button className="w-full border border-[#5eead4]/35 hover:border-[#5eead4]/70 text-[#f1f3f9] text-xs uppercase tracking-widest font-black px-6 py-4 transition-colors cursor-pointer bg-transparent">
                    Weitere PCs
                  </button>
                </Link>
              </div>
            </div>

            {/* Trust bullets */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Handgebaut in der Schweiz",
                "Versand CH-weit",
                "Persönliche Übergabe möglich",
              ].map((text) => (
                <span
                  key={text}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#71717a]"
                >
                  <span className="w-1 h-1 rounded-full bg-[#0fd9e6]" />
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DESCRIPTION + FULL SPECS ──────────────────────────────── */}
      {(pc.longDescription || activeSpecs.length > 0) && (
        <section className="border-t border-[#1a1c24] bg-[#080809]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#0fd9e6] mb-3">
                Über diesen Build
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-[#f1f3f9] tracking-tight leading-none mb-6">
                {pc.name}
              </h2>
              {pc.longDescription ? (
                <p className="text-[#71717a] leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {pc.longDescription}
                </p>
              ) : (
                <p className="text-[#71717a] leading-relaxed text-sm md:text-base">
                  {pc.shortDescription}
                </p>
              )}
            </motion.div>

            {activeSpecs.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#0fd9e6] mb-4">
                  Technische Spezifikationen
                </p>
                {activeSpecs.map((spec, i) => (
                  <motion.div
                    key={spec.key}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    className="flex items-center justify-between border border-[#1a1c24] hover:border-[#0fd9e6]/35 bg-[#0d0d12]/60 px-5 py-4 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#0fd9e6]/8 shrink-0">
                        <spec.Icon className="w-4 h-4 text-[#0fd9e6]" />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-[#71717a]">
                        {spec.label}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm font-bold text-[#f1f3f9] text-right max-w-[55%]">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      {features.length > 0 && (
        <section className="border-t border-[#1a1c24]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="mb-12"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#0fd9e6] mb-3">Was drin steckt</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-[#f1f3f9] tracking-tight">
                Features
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  className="flex items-start gap-4 border border-[#1a1c24] bg-[#0d0d12]/50 px-5 py-4"
                >
                  <div className="w-6 h-6 shrink-0 mt-0.5 bg-[#208c8c]/15 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#0fd9e6]" />
                  </div>
                  <span className="text-[#f1f3f9] text-sm leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="border-t border-[#1a1c24] bg-[#080809]">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#0fd9e6] mb-4">
              Interesse an diesem Build?
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#f1f3f9] tracking-tight leading-none mb-4">
              {pc.name} <span className="text-gradient">für CHF {formatChf(price)}</span>
            </h2>
            <p className="text-sm text-[#71717a] mb-10 max-w-md mx-auto">
              Melde dich unverbindlich – wir beraten dich ehrlich und passen den Build bei Bedarf an.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#contact">
                <button className="bg-[#208c8c] hover:bg-[#2bb3b3] text-white uppercase tracking-widest font-black text-xs px-12 py-4 transition-colors cursor-pointer w-full sm:w-auto">
                  Jetzt anfragen
                </button>
              </Link>
              <Link href="/#gaming-pcs">
                <button className="border border-[#5eead4]/40 hover:border-[#5eead4]/80 text-[#f1f3f9] uppercase tracking-widest font-black text-xs px-12 py-4 transition-colors cursor-pointer bg-transparent w-full sm:w-auto">
                  Weitere PCs ansehen
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
