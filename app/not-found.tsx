import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wide mb-4 text-primary">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6">Seite nicht gefunden</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90 uppercase tracking-wide">Zurück zur Startseite</Button>
        </Link>
      </div>
    </main>
  )
}
