import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  updated?: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      <SiteHeader />

      <div className="max-w-3xl mx-auto px-6 pt-36 pb-24 md:pb-32">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0fd9e6] mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f1f3f9] leading-none mb-3">
          {title}
        </h1>
        {updated && (
          <p className="text-[10px] uppercase tracking-widest text-[#52525b] mb-12">Stand: {updated}</p>
        )}

        <div className="space-y-10 [&_h2]:text-sm [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-widest [&_h2]:text-[#f1f3f9] [&_h2]:mb-3 [&_p]:text-sm [&_p]:text-[#a1a1aa] [&_p]:leading-relaxed [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2 [&_li]:text-sm [&_li]:text-[#a1a1aa] [&_li]:leading-relaxed [&_a]:text-[#0fd9e6] [&_a:hover]:underline">
          {children}
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
