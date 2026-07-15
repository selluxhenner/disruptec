"use client"

import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  type MotionValue,
} from "framer-motion"

import Link from "next/link"
import {
  ArrowLeft,
  Check,
  ChevronDown,
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
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

// ── Parallax image divider ────────────────────────────────────────────
function ParallaxDivider({ src, alt, y }: { src: string; alt: string; y: MotionValue<number> }) {
  return (
    <div className="relative h-56 md:h-80 overflow-hidden border-y border-[#1a1c24]">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0b]/75" />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="text-xl md:text-4xl font-black uppercase text-center px-4 text-gradient"
        >
          HANDGEFERTIGT IN DER SCHWEIZ
        </motion.p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────
export function PCDetailView({ pc }: { pc: PCDocument }) {
  const images = pc.images ?? []
  const usageTags = pc.usageTags ?? []
  const features = pc.features ?? []
  console.log("images", images)
  console.log("usageTags", usageTags)
  console.log("features", features)

  const [selectedImage, setSelectedImage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  // Hero parallax
  const heroBgY    = useTransform(scrollY, [0, 800],   [0, 260])
  const heroTextY  = useTransform(scrollY, [0, 700],   [0, -120])
  const heroOpacity = useTransform(scrollY, [100, 550], [1, 0])

  // Floating orbs
  const orb1Y = useTransform(scrollY, [0, 3000], [0, -550])
  const orb1X = useTransform(scrollY, [0, 3000], [0,  180])
  const orb2Y = useTransform(scrollY, [0, 3000], [0, -380])
  const orb2X = useTransform(scrollY, [0, 3000], [0, -140])
  const orb3Y = useTransform(scrollY, [0, 3000], [0, -700])

  // Section orbs
  const specsOrbY   = useTransform(scrollY, [600,  1800], [0, -120])
  const featOrbY    = useTransform(scrollY, [1400, 2600], [0, -100])

  // Parallax divider
  const dividerY = useTransform(scrollY, [1000, 2200], [0, 160])

  // Sticky price bar
  const stickyRawOpacity = useTransform(scrollY, [380, 560], [0, 1])
  const stickyRawY       = useTransform(scrollY, [380, 560], [-24, 0])
  const stickyOpacity    = useSpring(stickyRawOpacity, { damping: 30, stiffness: 220 })
  const stickyY          = useSpring(stickyRawY,       { damping: 30, stiffness: 220 })

  // Active specs (drop empty/whitespace values, normalize)
  const pcRecord = pc as unknown as Record<string, unknown>
  const activeSpecs = SPEC_CONFIG
    .map((s) => {
      const raw = pcRecord[s.key]
      const value = typeof raw === "string" ? raw.trim() : ""
      return { ...s, value }
    })
    .filter((s) => s.value.length > 0)

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0b] text-white overflow-x-hidden">

      {/* ── Sticky price bar ──────────────────────────────────────── */}
      <motion.div
        style={{ opacity: stickyOpacity, y: stickyY }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1c24]"
      >
        <div className="bg-[#0a0a0b]/90 backdrop-blur-xl px-5 py-3">
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
              <span className="text-[#0fd9e6] font-black text-base">
                CHF {formatChf(pc.price)}
              </span>
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(152,94,237,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-[#985eed] hover:bg-[#b07ff5] text-white text-[10px] uppercase tracking-widest font-black px-4 py-2 transition-colors cursor-pointer"
                >
                  Anfragen
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">

        {/* Parallax BG image */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 scale-[1.15]">
          <img
            src={images[0] || "/placeholder.svg"}
            alt={pc.name}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/50 via-[#0a0a0b]/10 to-[#0a0a0b]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/85 via-transparent to-[#0a0a0b]/30" />
        </motion.div>

        {/* Tri-color orbs */}
        <motion.div
          style={{ y: orb1Y, x: orb1X }}
          className="absolute top-16 right-32 w-[480px] h-[480px] rounded-full bg-[#985eed]/10 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: orb2Y, x: orb2X }}
          className="absolute bottom-36 left-12 w-72 h-72 rounded-full bg-[#0fd9e6]/10 blur-2xl pointer-events-none"
        />
        <motion.div
          style={{ y: orb3Y }}
          className="absolute top-1/2 right-1/3 w-56 h-56 rounded-full bg-[#417ef5]/6 blur-3xl pointer-events-none"
        />

        {/* Grid lines overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(65,126,245,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(65,126,245,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 pt-8">
          <Link
            href="/#gaming-pcs"
            className="flex items-center gap-2 text-[#71717a] hover:text-[#f1f3f9] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="uppercase tracking-widest text-xs font-bold">Zurück</span>
          </Link>

          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] font-black uppercase tracking-[0.45em] text-[#0fd9e6] border border-[#0fd9e6]/30 px-3 py-1.5 bg-[#0fd9e6]/5 backdrop-blur-sm"
          >
            DISRUPTEC
          </motion.span>
        </div>

        {/* Hero text — parallax layer */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="absolute inset-0 z-10 flex flex-col justify-end px-8 md:px-16 pb-20"
        >
          {/* Tags */}
          {usageTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {usageTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest text-[#0fd9e6] border border-[#0fd9e6]/40 px-3 py-1 bg-[#0fd9e6]/8 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* PC name */}
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,10vw,8rem)] font-black uppercase tracking-tight text-[#f1f3f9] leading-none mb-6"
          >
            {pc.name}
          </motion.h1>

          {/* Desc + price row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <p className="text-[#71717a] text-base md:text-lg max-w-lg leading-relaxed">
              {pc.shortDescription}
            </p>
            <div className="shrink-0 text-left md:text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#71717a] mb-1">Preis</p>
              <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-[#0fd9e6] leading-none tabular-nums">
                CHF {formatChf(pc.price)}
              </p>
              <p className="text-[10px] text-[#71717a] mt-1.5 uppercase tracking-wider">
                inkl. MwSt. & Montage
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#71717a]">Entdecken</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-[#0fd9e6]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── HORIZONTAL SPECS STRIP ────────────────────────────────── */}
      <div className="border-y border-[#0fd9e6]/15 bg-[#0fd9e6]/4 overflow-x-auto scrollbar-none">
        <div className="flex items-center py-5 px-8 gap-0 min-w-max">
          {activeSpecs.map((spec, i) => (
            <motion.div
              key={spec.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex items-center"
            >
              <div className="flex items-center gap-3 px-8 whitespace-nowrap">
                <spec.Icon className="w-4 h-4 text-[#0fd9e6] shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#71717a] leading-none mb-0.5">
                    {spec.label}
                  </p>
                  <p className="text-xs font-bold text-[#f1f3f9]">{spec.value}</p>
                </div>
              </div>
              {i < activeSpecs.length - 1 && (
                <div className="w-px h-8 bg-[#0fd9e6]/20 shrink-0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── GALLERY + FULL SPECS ──────────────────────────────────── */}
      <section className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden">

        {/* Section orb */}
        <motion.div
          style={{ y: specsOrbY }}
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#985eed]/5 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Gallery – sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28 space-y-3"
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden border border-[#1a1c24] bg-[#0d0d12]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`${pc.name} – Bild ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#0fd9e6]/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#985eed]/50" />

              {/* Counter */}
              <div className="absolute bottom-4 right-4 bg-[#0a0a0b]/80 backdrop-blur-sm border border-[#1a1c24] px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#71717a]">
                {selectedImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative aspect-square overflow-hidden border-2 transition-all duration-300 cursor-pointer",
                      selectedImage === i
                        ? "border-[#985eed] shadow-[0_0_14px_rgba(152,94,237,0.45)]"
                        : "border-[#1a1c24] hover:border-[#985eed]/50"
                    )}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === i && (
                      <motion.div
                        layoutId="thumb-active"
                        className="absolute inset-0 bg-[#985eed]/15"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Specs panel */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#0fd9e6] mb-3">
                Technische Spezifikationen
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[#f1f3f9] tracking-tight leading-none">
                {pc.name}
              </h2>
              {pc.longDescription && (
                <p className="mt-5 text-[#71717a] leading-relaxed text-sm md:text-base">
                  {pc.longDescription}
                </p>
              )}
            </motion.div>

            {/* Spec rows */}
            <div className="space-y-1.5">
              {activeSpecs.map((spec, i) => (
                <motion.div
                  key={spec.key}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={slideLeft}
                  whileHover={{ x: 4 }}
                  className="group flex items-center justify-between border border-[#1a1c24] hover:border-[#0fd9e6]/35 bg-[#0d0d12]/60 hover:bg-[#0fd9e6]/5 px-5 py-4 transition-all duration-200 cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#0fd9e6]/8 group-hover:bg-[#0fd9e6]/15 transition-colors shrink-0">
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

            {/* Price block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="relative border border-[#0fd9e6]/25 bg-[#0fd9e6]/5 p-6 overflow-hidden"
            >
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#0fd9e6]/35" />

              <p className="text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Gesamtpreis</p>
              <p className="text-5xl md:text-6xl font-black text-[#0fd9e6] tabular-nums">
                CHF {formatChf(pc.price)}
              </p>
              <p className="text-xs text-[#71717a] mt-2 uppercase tracking-wider">
                inkl. MwSt. & professionellem Zusammenbau
              </p>
            </motion.div>

            {/* Usage tags */}
            {usageTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.35 }}
                className="space-y-2"
              >
                <p className="text-[10px] uppercase tracking-widest text-[#71717a]">Optimiert für</p>
                <div className="flex flex-wrap gap-2">
                  {usageTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest border border-[#0fd9e6]/35 text-[#0fd9e6] bg-[#0fd9e6]/8 px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Link href="/#contact" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(152,94,237,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#985eed] hover:bg-[#b07ff5] text-white text-xs uppercase tracking-widest font-black px-6 py-4 transition-colors cursor-pointer"
                >
                  Jetzt anfragen
                </motion.button>
              </Link>
              <Link href="/#gaming-pcs" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.03, borderColor: "rgba(65,126,245,0.7)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full border-2 border-[#417ef5]/35 text-[#f1f3f9] hover:text-white text-xs uppercase tracking-widest font-black px-6 py-4 transition-all cursor-pointer bg-transparent"
                >
                  Weitere PCs
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      {features && features.length > 0 && (
        <section className="relative py-24 md:py-32 px-6 md:px-16 border-t border-[#1a1c24] overflow-hidden">

          {/* Section orb */}
          <motion.div
            style={{ y: featOrbY }}
            className="absolute top-1/2 -left-48 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#417ef5]/5 blur-3xl pointer-events-none"
          />

          <div className="relative max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="mb-16"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#0fd9e6] mb-3">Was drin steckt</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[#f1f3f9] tracking-tight">
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
                  whileHover={{ x: 5, borderColor: "rgba(152,94,237,0.4)" }}
                  className="flex items-start gap-4 border border-[#1a1c24] bg-[#0d0d12]/50 px-5 py-4 transition-all duration-200 cursor-default"
                >
                  <div className="w-6 h-6 shrink-0 mt-0.5 bg-[#985eed]/15 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#985eed]" />
                  </div>
                  <span className="text-[#ededff] text-sm leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PARALLAX DIVIDER ──────────────────────────────────────── */}
      <ParallaxDivider
        src={images[1] ?? images[0] ?? "/placeholder.svg"}
        alt={pc.name}
        y={dividerY}
      />

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-48 px-6 md:px-16 overflow-hidden">

        {/* Pulsing orb */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[900px] h-[900px] rounded-full bg-[#985eed]" />
        </motion.div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(65,126,245,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(65,126,245,0.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.45em] text-[#0fd9e6] mb-6"
          >
            Bereit für deinen perfekten PC?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,9vw,7rem)] font-black uppercase text-[#f1f3f9] tracking-tight leading-none mb-3"
          >
            {pc.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#0fd9e6] tabular-nums mb-14"
          >
            CHF {formatChf(pc.price)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(152,94,237,0.5)" }}
                whileTap={{ scale: 0.96 }}
                className="bg-[#985eed] hover:bg-[#b07ff5] text-white uppercase tracking-widest font-black text-xs px-12 py-5 transition-colors cursor-pointer w-full sm:w-auto"
              >
                Jetzt anfragen
              </motion.button>
            </Link>
            <Link href="/#gaming-pcs">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgba(65,126,245,0.85)" }}
                whileTap={{ scale: 0.96 }}
                className="border-2 border-[#417ef5]/40 text-[#f1f3f9] uppercase tracking-widest font-black text-xs px-12 py-5 transition-all cursor-pointer bg-transparent hover:text-white w-full sm:w-auto"
              >
                Weitere PCs ansehen
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {[
              "Handgebaut in der Schweiz",
              "Inkl. MwSt. & Montage",
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
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <div className="border-t border-[#1a1c24] py-8 px-6 text-center">
        <p className="text-[10px] uppercase tracking-widest text-[#52525b]">
          © 2025 DISRUPTEC – Premium PC Manufaktur Schweiz
        </p>
      </div>
    </div>
  )
}
