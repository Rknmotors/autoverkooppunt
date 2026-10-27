# Autoverkooppunt (AVP) — Next.js-website voor GoDaddy Node.js Hosting

Dit project is een technische migratie van de originele `index.html` naar Next.js. Het is geen redesign.

- Alle teksten, kleuren, animaties, foto's en video's zijn overgenomen.
- De CSS komt letterlijk uit het origineel (`app/globals.css`).
- Er is geen database, geen backend, geen adminpaneel en geen e-mail.

## Versies

| Onderdeel  | Versie |
|------------|--------|
| Next.js    | 15.5.28 (App Router) |
| React      | 19.2.9 |
| TypeScript | 5.9.3 |
| Node.js    | 18.18 of hoger (getest met 22) |

## Structuur

```
app/          layout.tsx (meta, lettertypes), page.tsx (de one-pager), globals.css, not-found.tsx
components/   Header, Hero, OfferCard (formulier + WhatsApp), Steps, Customers, ReviewCarousel,
              Buy, Videos, Why, Faq, Cta, Footer, FloatingWhatsApp, Reveal, CurrentYear, icons
lib/          contact.ts (telefoon / WhatsApp / e-mail op één plek)
public/       img/ en video/ (originele bestanden, ongewijzigd)
```

## Commando's

```
npm ci            # schone installatie volgens package-lock.json
npm run build     # productiebuild
npm start         # start op de poort uit de PORT-variabele (standaard 3000)
npm run typecheck # TypeScript-controle
```

`build` en `start` zetten zelf `NODE_ENV=production`. GoDaddy kan een andere `NODE_ENV` doorgeven, en dan crasht Next.js op de 404-pagina.

## Waarom geen devDependencies?

GoDaddy installeert in productiemodus en slaat `devDependencies` dus over. Alles wat nodig is om te bouwen staat daarom in `dependencies`. Er zijn maar 7 pakketten nodig, zonder Tailwind, PostCSS-plugins of andere extra's.

## Online zetten op GoDaddy

1. Upload `AVP-GODADDY-READY.zip` in Node.js Hosting. Upload de zip zelf; pak hem niet uit.
2. GoDaddy voert zelf deze drie stappen uit:
   - installatie;
   - `npm run build`;
   - `npm start`.
3. Er zijn geen secrets of omgevingsvariabelen nodig.
