import type { Metadata } from "next"
import { LegalShell } from "@/components/legal-shell"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Kontaktangaben von DISRUPTEC – Premium PC Manufaktur Schweiz.",
  alternates: { canonical: "/impressum" },
}

export default function ImpressumPage() {
  return (
    <LegalShell eyebrow="Rechtliches" title="Impressum">
      <section>
        <h2>Betreiber der Website</h2>
        <p>
          DISRUPTEC
          <br />
          Lars Schmid
          <br />
          9533 Kirchberg SG, Schweiz
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:info@disruptec.ch">info@disruptec.ch</a>
          <br />
          Instagram:{" "}
          <a href="https://instagram.com/dt.disruptec.ch" target="_blank" rel="noopener noreferrer">
            @dt.disruptec.ch
          </a>
        </p>
      </section>

      <section>
        <h2>Umsetzung der Website</h2>
        <p>Konzept, Design und technische Umsetzung: Serviweb</p>
      </section>

      <section>
        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. DISRUPTEC übernimmt
          jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten
          Inhalte. Angebote und Preise sind unverbindlich und können jederzeit angepasst werden.
        </p>
        <p>
          Diese Website enthält Links zu externen Websites Dritter (z.&nbsp;B. Instagram, Ricardo). Auf
          deren Inhalte haben wir keinen Einfluss; für sie ist stets der jeweilige Anbieter verantwortlich.
        </p>
      </section>

      <section>
        <h2>Urheberrecht</h2>
        <p>
          Sämtliche Inhalte dieser Website (Texte, Bilder, Logos) sind urheberrechtlich geschützt. Jede
          Verwendung ausserhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen
          Zustimmung von DISRUPTEC.
        </p>
      </section>
    </LegalShell>
  )
}
