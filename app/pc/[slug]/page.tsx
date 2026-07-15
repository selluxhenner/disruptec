"use client"

import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { getPCBySlug } from "@/lib/pc-service"
import { PCDetailView } from "@/components/pc-detail-view"
import type { PCDocument } from "@/lib/types"

export default function PCDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [pc, setPc] = useState<PCDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (!slug) return
    getPCBySlug(slug)
      .then((data) => {
        if (!data) setMissing(true)
        else setPc(data)
      })
      .catch((err) => {
        console.error(err)
        setMissing(true)
      })
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (pc) document.title = `${pc.name} | DISRUPTEC`
  }, [pc])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16">
          <div className="aspect-[4/3] bg-[#1a1c24] animate-pulse" />
          <div className="space-y-6">
            <div className="h-4 w-32 bg-[#1a1c24] animate-pulse" />
            <div className="h-14 w-3/4 bg-[#1a1c24] animate-pulse" />
            <div className="h-4 w-full bg-[#1a1c24] animate-pulse" />
            <div className="h-40 w-full bg-[#1a1c24] animate-pulse" />
          </div>
        </div>
      </main>
    )
  }

  if (missing || !pc) {
    notFound()
  }

  return <PCDetailView pc={pc} />
}
