"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"

// ── Variants ──────────────────────────────────────────────────────────

const wordStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0 } },
}

const word3d: Variants = {
  hidden: { opacity: 0, y: 70, rotateX: -55, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
}

const slideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

// ── Main component ────────────────────────────────────────────────────
export function Hero() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const bgScale   = useTransform(scrollYProgress, [0, 1], [1.08, 1.22])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [0.22, 0.1])
  const textY     = useTransform(scrollYProgress, [0, 1], [0, -90])

  useEffect(() => {
    if (prefersReduced) { setIsVisible(true); return }
    const t = setTimeout(() => setIsVisible(true), 120)
    return () => clearTimeout(t)
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080809]"
    >
      {/* ── Parallax background image ────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: bgScale, opacity: bgOpacity }}
      >
        <img
          src="/premium-gaming-pc-with-rgb-lighting-on-dark-backgr.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ── Vignette overlays ───────────────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080809]/90 via-[#080809]/30 to-[#080809]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#080809]/80 via-transparent to-[#080809]/60" />

      {/* ── Ambient orbs ─────────────────────────────────────────── */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-[#208c8c]/8 blur-3xl pointer-events-none"
        animate={isVisible ? { opacity: [0, 1], scale: [0.6, 1] } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/6 w-[450px] h-[450px] rounded-full bg-[#0fd9e6]/7 blur-3xl pointer-events-none"
        animate={isVisible ? { opacity: [0, 1], scale: [0.6, 1] } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
      />
      {/* ── Main content ─────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-20 text-center"
        style={{ y: textY }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-7">

          {/* Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.55em] text-[#0fd9e6] border border-[#0fd9e6]/25 px-5 py-2 bg-[#0fd9e6]/5 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0fd9e6] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0fd9e6]" />
              </span>
              Premium PC Manufaktur · Schweiz
            </span>
          </motion.div>

          {/* Logo with entrance glow */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.82, y: 20 }}
            animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: [0, 0.7, 0.3] } : {}}
              transition={{ duration: 1.5, delay: 0.4, times: [0, 0.3, 1] }}
              style={{ background: "radial-gradient(ellipse, rgba(32,140,140,0.5) 0%, rgba(15,217,230,0.2) 60%, transparent 100%)" }}
            />
            <img
              src="/disruptec-logo.png"
              alt="DISRUPTEC"
              className="relative h-20 md:h-28 lg:h-36 w-auto"
              style={{ filter: "drop-shadow(0 0 32px rgba(32,140,140,0.55)) drop-shadow(0 0 70px rgba(15,217,230,0.25))" }}
            />
          </motion.div>

          {/* Headline — 3D word-by-word flip */}
          <div style={{ perspective: "900px" }}>
            <motion.div
              variants={wordStagger}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delayChildren: 0.45 }}
              className="flex flex-col items-center gap-1"
            >
              {[
                { text: "Handgebaut.", gradient: false },
                { text: "Kompromisslos.", gradient: true },
                { text: "Schweizer Präzision.", gradient: false },
              ].map(({ text, gradient }) => (
                <motion.div
                  key={text}
                  variants={word3d}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none ${
                    gradient ? "text-gradient" : "text-[#f1f3f9]"
                  }`}
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sub text */}
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 0.9 }}
            className="text-sm md:text-base text-[#71717a] max-w-md leading-relaxed"
          >
            Jeder PC ein Einzelstück — sauber verkabelt, ausführlich getestet, mit Leidenschaft gebaut.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 1.05 }}
            className="flex flex-col sm:flex-row gap-3 pt-1"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 48px rgba(32,140,140,0.55), 0 0 80px rgba(32,140,140,0.2)" }}
              whileTap={{ scale: 0.96 }}
              className="group relative overflow-hidden bg-[#208c8c] text-white text-xs font-black uppercase tracking-[0.3em] px-10 py-4 transition-colors duration-300 cursor-pointer flex items-center gap-3"
              onClick={() => document.getElementById("gaming-pcs")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#208c8c] via-[#2bb3b3] to-[#208c8c] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">Gaming PCs ansehen</span>
              <ArrowRight className="relative w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="border border-[#5eead4]/35 hover:border-[#5eead4] text-[#5eead4] hover:text-[#f1f3f9] hover:bg-[#5eead4]/10 text-xs font-black uppercase tracking-[0.3em] px-10 py-4 transition-all duration-300 bg-transparent cursor-pointer"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Individuelle Anfrage
            </motion.button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest text-[#3f3f46]"
          >
            {[
              { label: "Versand CH-weit",       color: "#0fd9e6" },
              { label: "Persönliche Übergabe",  color: "#208c8c" },
              { label: "Faire Preise",           color: "#5eead4" },
            ].map(({ label, color }) => (
              <span key={label} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ background: color }} />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}
