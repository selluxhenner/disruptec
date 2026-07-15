# DISRUPTEC – Premium PC Manufaktur Schweiz

Website für [DISRUPTEC](https://disruptec.ch): handgebaute Gaming PCs, Build Guides und persönliche Beratung aus der Schweiz.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) mit TypeScript
- [Tailwind CSS](https://tailwindcss.com/) für das Styling
- [Framer Motion](https://www.framer.com/motion/) für Animationen
- [Firebase](https://firebase.google.com/) (Firestore + Storage) für PC-Daten und Bilder
- Deployment auf [Vercel](https://vercel.com/)

## Entwicklung

```bash
npm install
npm run dev
```

Die Seite läuft danach auf [http://localhost:3000](http://localhost:3000).

## Produktion

```bash
npm run build
npm start
```

## Struktur

- `app/` – Seiten (Startseite, PC-Detailseiten unter `/pc/[slug]`, Admin-Bereich unter `/admin`)
- `components/` – React-Komponenten der Website
- `lib/` – Firebase-Anbindung, PC-Service und Hilfsfunktionen
- `public/` – Bilder, Logos und Favicons

## Admin-Bereich

Unter `/admin` können PCs erstellt und bearbeitet werden. Der Zugang ist über Umgebungsvariablen geschützt:

- `ADMIN_USERNAME` / `ADMIN_PASSWORD` – Zugangsdaten
- `ADMIN_SESSION_COOKIE_NAME` – optionaler Cookie-Name (Standard: `disruptec_admin`)
