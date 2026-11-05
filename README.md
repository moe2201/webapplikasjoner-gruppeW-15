# Booking Portal · Webapplikasjoner gruppe W-15

En bookingportal for kreative tjenester (logo, nettside, app-utvikling, fotografering).
Brukeren logger inn, bestiller en time og ser bookingene sine igjen på dashbordet.

**Stack:** RedwoodSDK på Cloudflare Workers · React 19 (server- og klientkomponenter) ·
Drizzle mot D1 · better-auth · Tailwind 4 · Vitest · Playwright

All koden ligger i [`starter/`](starter/). Alle kommandoer under kjøres fra den mappa.

---

## Kom i gang

Krever Node.js 22.12 eller nyere.

```bash
cd starter
npm install
```

Lag fila `starter/.dev.vars`. Den skal **ikke** committes, og står i `.gitignore`:

```
BETTER_AUTH_SECRET=<lang tilfeldig streng, minst 32 tegn>
BETTER_AUTH_URL=http://localhost:5173
```

En hemmelighet kan lages med:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Sett opp databasen og start appen:

```bash
npm run generate      # typer for .dev.vars og D1
npm run migrate:dev   # lager tabellene i den lokale D1-databasen
npm run dev           # http://localhost:5173
```

Ingen Cloudflare-konto trengs lokalt. Databasen ligger under `starter/.wrangler/`.

---

## Hovedflyt

1. **Logg inn** eller registrer deg på `/login`
2. **Lag noe:** velg dato, tjeneste og tidspunkt på `/booking`
3. **Se det igjen:** bookingen vises på `/dashboard` og via `GET /api/bookings`

`/booking` og `/dashboard` er beskyttet. Uten innlogging blir du sendt til `/login`.

---

## Slik oppfyller vi minstekravene

| Krav | Hvor |
| --- | --- |
| RedwoodSDK, server- og klientkomponenter | `Dashboard.tsx` er en async serverkomponent som henter fra D1. `BookingForm.tsx` og `Login.tsx` er klientkomponenter (`"use client"`) |
| Drizzle mot D1, eget skjema | `src/db/schema/booking-schema.ts` og `auth-schema.ts`, migrasjoner i `drizzle/migrations/` |
| REST-endepunkt | `GET /api/bookings` i `src/worker.tsx` |
| Server action med autorisasjon | `src/app/actions/booking-actions.ts` sjekker `ctx.user` på serveren før den lagrer |
| Innlogging og beskyttet rute | better-auth (`src/lib/auth.ts`), middleware og `requireAuth` i `src/worker.tsx` |
| Hovedflyt ende til ende | Se over. Dekket av integrasjonstesten og e2e-testen |
| Tester | Se under |

---

## Arkitektur

```
Nettleser
  │
  ├─ /login            Login.tsx (klient) ── better-auth ──► /api/auth/*
  ├─ /booking          BookingForm.tsx (klient) ── createBookingAction (server action)
  ├─ /dashboard        Dashboard.tsx (server) ─┐
  └─ GET /api/bookings (REST) ─────────────────┤
                                               ▼
                               src/lib/booking-service.ts
                               validateBooking · createBooking · listBookings
                                               │
                                               ▼
                                    Drizzle ──► D1 (SQLite)
```

All logikk og alle databasekall ligger i **servicen** (`src/lib/booking-service.ts`).
Server action, REST-endepunkt og dashbord er tynne lag som sjekker hvem brukeren er,
og så kaller servicen. Servicen tar `db` som parameter. Det er det som gjør at den
kan testes mot en SQLite-database i minnet i stedet for D1.

### Datamodell

| Tabell | Innhold |
| --- | --- |
| `user`, `session`, `account`, `verification` | Laget for better-auth. Passord lagres kun som hash i `account` |
| `bookings` | `id`, `user_id` → `user.id` (cascade), `service`, `date`, `time`, `created_at` |

`onDelete: "cascade"`: slettes en bruker, slettes bookingene deres også.

---

## REST-API

### `GET /api/bookings`

Returnerer bookingene til innlogget bruker, nyeste først.

| Situasjon | Status | Svar |
| --- | --- | --- |
| Innlogget | `200` | `[{ "id": "...", "service": "nettside", "date": "2030-01-15", "time": "10:30", ... }]` |
| Ikke innlogget | `401` | `{ "error": "Unauthorized" }` |
| Annen metode enn GET | `405` | `{ "error": "Method not allowed" }` |

---

## Tester

```bash
npm test                            # Vitest
npx playwright install chromium     # første gang
npm run test:e2e                    # Playwright (starter dev-serveren selv)
```

| Type | Fil | Hva og hvorfor |
| --- | --- | --- |
| Enhet (hjelpefunksjon) | `src/lib/__tests__/booking-service.test.ts` | `validateBooking`: det er her ugyldig data stoppes før den når databasen |
| Enhet (service) | `src/lib/__tests__/booking-service.test.ts` | `createBooking`/`listBookings` mot SQLite i minnet. Tester ekte SQL raskt, og at ingenting lagres ved ugyldig input |
| Komponent | `src/components/__tests__/BookingForm.test.tsx` | Knappen er låst til dato og tid er valgt, riktige data sendes til server action, og feil fra serveren vises |
| Komponent | `src/components/__tests__/Navbar.test.tsx` | Navigasjonen vises |
| Integrasjon | `src/__tests__/booking-flow.test.ts` | Hovedflyten med to brukere: **en bruker ser bare sine egne bookinger**. Pluss at cascade-sletting virker |
| E2E | `e2e/home.e2e.ts` | Ekte nettleser: beskyttet rute, 401 fra API-et, og hele flyten registrer → book → se på dashbordet og i API-et |

**Testdatabasen** (`src/test/test-db.ts`) lager en SQLite-database i minnet og kjører
de samme migrasjonene som D1. Hver test får sin egen ferske database.

**Om e2e og hydrering:** sidene kommer fra serveren som ferdig HTML, men knappene virker
ikke før React har tatt over i nettleseren. E2E-testen bruker derfor `toPass` til å prøve
igjen til siden faktisk reagerer, i stedet for å klikke for tidlig.

---

## Sikkerhet

- **Autorisasjon på serveren:** server action og API sjekker `ctx.user` selv. Sjekker i
  nettleseren kan omgås, så de er bare for brukervennlighet.
- **Hver bruker ser kun sine egne data:** `listBookings` filtrerer alltid på `userId`.
- **Passord hashes** av better-auth og kan ikke leses ut av databasen.
- **Samme feilmelding** for feil e-post og feil passord, så ingen kan teste hvem som har konto.
- **Hemmeligheter** ligger i `.dev.vars`, som ikke committes.

---

## Nyttige kommandoer

| Kommando | Gjør |
| --- | --- |
| `npm run dev` | Starter appen lokalt |
| `npm run lint` | Typesjekk |
| `npm run migrate:new` | Lager ny migrasjon etter endring i skjemaet |
| `npm run migrate:dev` | Kjører migrasjonene mot lokal D1 |
| `npm test` | Vitest |
| `npm run test:e2e` | Playwright |

Se brukerne i den lokale databasen:

```bash
npx wrangler d1 execute DB --local --command "SELECT name, email FROM user"
```

## Feilsøking

| Problem | Løsning |
| --- | --- |
| `Invalid origin` ved innlogging | Bruk nøyaktig adressen i `BETTER_AUTH_URL` (`localhost`, ikke `127.0.0.1`), og start serveren på nytt |
| Komponent er `undefined` etter ny `"use client"`-fil | Start `npm run dev` på nytt. rwsdk leter etter direktiver bare ved oppstart |
| `There is a new version of the pre-bundle` | Start på nytt. Hjelper ikke det, slett `node_modules/.vite` |
| Alt er ekstremt tregt på Mac | Ikke legg prosjektet i en iCloud-synket mappe (Dokumenter/Skrivebord) |

Mer om oppsettet fra starteren står i [`starter/README.md`](starter/README.md).

