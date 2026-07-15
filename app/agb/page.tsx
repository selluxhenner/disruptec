import type { Metadata } from "next"
import { LegalShell } from "@/components/legal-shell"

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von DISRUPTEC – Premium PC Manufaktur Schweiz.",
  alternates: { canonical: "/agb" },
}

export default function AgbPage() {
  return (
    <LegalShell eyebrow="Rechtliches" title="AGB" updated="Juli 2026">
      <section>
        <h2>1. Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Angebote, Beratungen und Verkäufe
          von DISRUPTEC, Lars Schmid, 9533 Kirchberg SG, Schweiz (nachfolgend «DISRUPTEC»). Abweichende
          Vereinbarungen gelten nur, wenn sie schriftlich bestätigt wurden.
        </p>
        <p>
          Für Käufe über die Plattform Ricardo gelten ergänzend die Bedingungen von Ricardo.
        </p>
      </section>

      <section>
        <h2>2. Angebot und Vertragsabschluss</h2>
        <p>
          Die auf der Website gezeigten PCs und Preise sind unverbindlich. Auf eine Anfrage hin erstellt
          DISRUPTEC eine individuelle Offerte. Der Vertrag kommt mit der beidseitigen Bestätigung der
          Offerte (z.&nbsp;B. per E-Mail oder Chat) zustande.
        </p>
      </section>

      <section>
        <h2>3. Preise</h2>
        <p>
          Alle Preise verstehen sich in Schweizer Franken (CHF) inklusive Zusammenbau und Funktionstest.
          Allfällige Versandkosten werden separat ausgewiesen.
        </p>
      </section>

      <section>
        <h2>4. Zahlung</h2>
        <p>
          Die Zahlungsmodalitäten (z.&nbsp;B. Vorkasse per Banküberweisung, TWINT oder Barzahlung bei
          persönlicher Übergabe) werden bei der Bestellung individuell vereinbart. Die Ware bleibt bis zur
          vollständigen Bezahlung Eigentum von DISRUPTEC.
        </p>
      </section>

      <section>
        <h2>5. Lieferung und Übergabe</h2>
        <p>
          Die Lieferung erfolgt per Versand innerhalb der Schweiz oder nach Vereinbarung durch persönliche
          Übergabe. Liefertermine sind Richtwerte; Verzögerungen (z.&nbsp;B. durch
          Komponenten-Verfügbarkeit) berechtigen nicht zu Schadenersatz. Sichtbare Transportschäden sind
          umgehend nach Erhalt zu melden.
        </p>
      </section>

      <section>
        <h2>6. Gewährleistung und Garantie</h2>
        <p>
          Es gilt die gesetzliche Gewährleistung nach Schweizer Obligationenrecht. Für die verbauten
          Komponenten gelten zusätzlich die jeweiligen Herstellergarantien; DISRUPTEC unterstützt bei
          deren Abwicklung.
        </p>
        <p>
          Von der Gewährleistung ausgeschlossen sind Schäden durch unsachgemässe Handhabung, eigenmächtige
          Eingriffe (z.&nbsp;B. Übertaktung ausserhalb der Spezifikation, Umbauten) sowie normale
          Abnutzung.
        </p>
      </section>

      <section>
        <h2>7. Haftung</h2>
        <p>
          DISRUPTEC haftet nur für direkte Schäden, die nachweislich vorsätzlich oder grobfahrlässig
          verursacht wurden. Die Haftung für indirekte Schäden und Folgeschäden (z.&nbsp;B. Datenverlust,
          entgangener Gewinn) ist im gesetzlich zulässigen Umfang ausgeschlossen. Für die Sicherung von
          Daten ist die Kundschaft selbst verantwortlich.
        </p>
      </section>

      <section>
        <h2>8. Anwendbares Recht und Gerichtsstand</h2>
        <p>
          Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist Kirchberg SG, soweit nicht zwingende
          gesetzliche Gerichtsstände bestehen.
        </p>
      </section>
    </LegalShell>
  )
}
