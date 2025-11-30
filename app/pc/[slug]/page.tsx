import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { getPCBySlug, getAllPCs } from "@/lib/pc-service"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageGallery } from "@/components/image-gallery"

export async function generateStaticParams() {
  const pcs = await getAllPCs()
  return pcs.map((pc) => ({ slug: pc.slug }))
}

export default async function PCDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pc = await getPCBySlug(slug)

  if (!pc) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/#gaming-pcs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="uppercase tracking-wide text-sm font-semibold">Zurück zu Gaming PCs</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="space-y-6">
            <ImageGallery images={pc.images} alt={pc.name} />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">{pc.name}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {pc.longDescription || pc.shortDescription}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">Preis</p>
              <p className="text-5xl font-bold text-primary">CHF {pc.priceChf.toLocaleString("de-CH")}</p>
              <p className="text-muted-foreground text-sm mt-2">inkl. MwSt. & Montage</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold uppercase tracking-wide">Spezifikationen</h2>
              <div className="grid gap-3">
                <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                  <span className="text-muted-foreground">Prozessor</span>
                  <span className="font-semibold">{pc.cpu}</span>
                </div>
                <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                  <span className="text-muted-foreground">Grafikkarte</span>
                  <span className="font-semibold">{pc.gpu}</span>
                </div>
                <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                  <span className="text-muted-foreground">Arbeitsspeicher</span>
                  <span className="font-semibold">{pc.ram}</span>
                </div>
                <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                  <span className="text-muted-foreground">Speicher</span>
                  <span className="font-semibold">{pc.storage}</span>
                </div>
                {pc.motherboard && (
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <span className="text-muted-foreground">Mainboard</span>
                    <span className="font-semibold">{pc.motherboard}</span>
                  </div>
                )}
                {pc.cooler && (
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <span className="text-muted-foreground">Kühlung</span>
                    <span className="font-semibold">{pc.cooler}</span>
                  </div>
                )}
                {pc.psu && (
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <span className="text-muted-foreground">Netzteil</span>
                    <span className="font-semibold">{pc.psu}</span>
                  </div>
                )}
                {pc.caseModel && (
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <span className="text-muted-foreground">Gehäuse</span>
                    <span className="font-semibold">{pc.caseModel}</span>
                  </div>
                )}
              </div>

              {pc.usageTags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-muted-foreground">Optimiert für:</span>
                  {pc.usageTags.map((tag) => (
                    <Badge key={tag} className="bg-primary/20 text-primary border-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {pc.features && pc.features.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold uppercase tracking-wide">Features</h2>
                <div className="grid gap-3">
                  {pc.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/#contact" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90 uppercase tracking-wide text-lg py-6">
                  Jetzt anfragen
                </Button>
              </Link>
              <Link href="/#gaming-pcs" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wide text-lg py-6 bg-transparent"
                >
                  Weitere PCs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
