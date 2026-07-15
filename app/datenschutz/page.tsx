import type { Metadata } from "next"
import { LegalShell } from "@/components/legal-shell"

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von DISRUPTEC – Premium PC Manufaktur Schweiz.",
  alternates: { canonical: "/datenschutz" },
}

export default function DatenschutzPage() {
  return (
    <LegalShell eyebrow="Rechtliches" title="Datenschutz" updated="Juli 2026">
      <section>
        <h2>1. Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für die Datenbearbeitung auf dieser Website ist:
          <br />
          DISRUPTEC, Lars Schmid, 9533 Kirchberg SG, Schweiz
          <br />
          E-Mail: <a href="mailto:info@disruptec.ch">info@disruptec.ch</a>
        </p>
        <p>
          Wir bearbeiten Personendaten gemäss dem Schweizer Datenschutzgesetz (DSG).
        </p>
      </section>

      <section>
        <h2>2. Welche Daten wir bearbeiten</h2>
        <p>
          Beim Besuch dieser Website und bei einer Kontaktaufnahme werden folgende Daten bearbeitet:
        </p>
        <ul>
          <li>
            <strong className="text-[#f1f3f9]">Kontaktanfragen:</strong> Wenn du uns per E-Mail oder über
            das Kontaktformular schreibst, verwenden wir deinen Namen, deine E-Mail-Adresse und den Inhalt
            deiner Nachricht ausschliesslich zur Bearbeitung deiner Anfrage. Das Kontaktformular öffnet
            dein eigenes E-Mail-Programm; es werden keine Formulardaten auf unseren Servern gespeichert.
          </li>
          <li>
            <strong className="text-[#f1f3f9]">Server-Logdaten:</strong> Beim Aufruf der Website werden
            durch unseren Hosting-Anbieter technisch notwendige Daten (z.&nbsp;B. IP-Adresse, Datum und
            Uhrzeit, aufgerufene Seite, Browsertyp) in Logfiles erfasst. Diese Daten dienen der Sicherheit
            und dem Betrieb der Website.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Hosting und eingesetzte Dienste</h2>
        <ul>
          <li>
            <strong className="text-[#f1f3f9]">Vercel</strong> (Vercel Inc., USA): Hosting der Website.
            Beim Seitenaufruf wird deine IP-Adresse technisch bedingt an Vercel übermittelt.
          </li>
          <li>
            <strong className="text-[#f1f3f9]">Vercel Analytics:</strong> Wir nutzen eine cookielose,
            anonymisierte Besucherstatistik. Es werden keine Profile gebildet und keine Daten an
            Werbenetzwerke weitergegeben.
          </li>
          <li>
            <strong className="text-[#f1f3f9]">Google Firebase</strong> (Google LLC, USA): Die auf der
            Website angezeigten PC-Angebote und Bilder werden über Firebase geladen. Dabei wird deine
            IP-Adresse technisch bedingt an Google übermittelt.
          </li>
        </ul>
        <p>
          Bei diesen Anbietern können Daten in Länder ausserhalb der Schweiz (insbesondere die USA)
          übermittelt werden. Die Anbieter verpflichten sich vertraglich zu einem angemessenen
          Datenschutzniveau.
        </p>
      </section>

      <section>
        <h2>4. Cookies</h2>
        <p>
          Diese Website verwendet keine Tracking- oder Marketing-Cookies. Im geschützten Admin-Bereich
          wird ein technisch notwendiges Session-Cookie eingesetzt, das nur Betreiber betrifft.
        </p>
      </section>

      <section>
        <h2>5. Weitergabe von Daten</h2>
        <p>
          Wir verkaufen keine Personendaten und geben sie nur weiter, wenn dies zur Abwicklung deiner
          Anfrage oder Bestellung nötig ist (z.&nbsp;B. an Versanddienstleister) oder wir gesetzlich dazu
          verpflichtet sind.
        </p>
      </section>

      <section>
        <h2>6. Aufbewahrung</h2>
        <p>
          Personendaten werden nur so lange aufbewahrt, wie es für den jeweiligen Zweck erforderlich ist
          oder gesetzliche Aufbewahrungspflichten bestehen.
        </p>
      </section>

      <section>
        <h2>7. Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft über die von uns bearbeiteten Personendaten sowie auf deren
          Berichtigung oder Löschung. Wende dich dazu an{" "}
          <a href="mailto:info@disruptec.ch">info@disruptec.ch</a>.
        </p>
      </section>

      <section>
        <h2>8. Änderungen</h2>
        <p>
          Wir können diese Datenschutzerklärung jederzeit anpassen. Es gilt die jeweils auf dieser Seite
          veröffentlichte Fassung.
        </p>
      </section>
    </LegalShell>
  )
}
