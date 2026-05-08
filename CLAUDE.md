# Viral Scout — Anweisung an Claude

> **Du bist hier, weil ein User dir den Repo-Link geteilt und gesagt hat: „Setz das lokal bei mir auf."**
> Diese Datei sagt dir, **wie du ihn Schritt für Schritt durchführst** — Beginner-Modus, jeder Klick erklärt.

## ⚠️ Next.js 16 — Breaking Changes

Dieses Projekt nutzt Next.js 16. Falls du Code änderst (nicht nur Setup), prüfe vorher `node_modules/next/dist/docs/` — die API hat Breaking Changes gegenüber älteren Versionen, deine Trainingsdaten kennen das nicht.

## 0. Vor allem anderen: Claude-Code-Check

**Bist du gerade in Claude Code Desktop?**
- Wenn der User in **Claude Chat** (claude.ai) oder **Cowork** ist → STOPP. Sag ihm:
  > *„Für lokales Setup brauchst du Claude Code Desktop — nur dort kann ich Dateien auf deinem Rechner anfassen, Dependencies installieren und einen Dev-Server starten. Lade das hier runter: https://claude.ai/download. Wenn du installiert hast, öffne Claude Code, klick auf **Code** → **Lokal** → wähl `~/claude/` aus. Wirf den Repo-Link dann nochmal hier rein."*
- Wenn er Claude Code Desktop noch nicht installiert hat → führ ihn durch die Installation.

**Hat der User Node.js 22+ installiert?**
- Check: `node --version`
- Wenn < 22: führ ihn durch `nvm install 22` oder Download von [nodejs.org](https://nodejs.org)
- **Wichtig:** Dieses Tool nutzt `better-sqlite3`, das Native Bindings braucht. Ohne korrektes Node 22 stürzt's beim ersten Start ab.

**Hat der User ein globales `~/.claude/CLAUDE.md`?**
- Frag kurz, biete an es vorher anzulegen falls nicht.

## 1. Was wir hier tun — kurz erklären

> *„Wir setzen jetzt Viral Scout lokal bei dir auf. Du gibst später einen TikTok- oder Instagram-Handle ein → das Tool zieht passende virale Videos und schlägt dir Reel-Ideen vor. Setup dauert ~20 Minuten, davon 5–10 Min für API-Keys holen."*

**WICHTIG: Sag dem User die Kosten ehrlich.**

> *„Vorher noch das wichtige: Das Tool ist nicht gratis im Betrieb. Pro Scout-Lauf zahlst du ~$3–4 für Apify (TikTok-Scraping) und Anthropic. Apify hat $5 Free-Credit/Monat — ein bis zwei Tests sind kostenlos. Wir setzen bei beiden ein Monatslimit, damit du nicht überrascht wirst."*

## 2. Repo klonen

```bash
cd ~/claude
git clone <REPO-URL> viral-scout
cd viral-scout
```

Sag: *„Repo ist geklont nach `~/claude/viral-scout/`. Jetzt holen wir die zwei API-Keys."*

## 3. API-Keys holen — Schritt für Schritt mit dem User

**Wichtig: Niemals raten oder Beispiel-Keys eintragen. Der User holt sich die Keys selbst.**

### a) Anthropic API Key

Sag dem User:

> *„Erst der Anthropic-Key (für die KI-Analyse). Folge diesen Schritten — ich warte hier:
>
> 1. Öffne https://console.anthropic.com (mit deinem Claude-Pro-Account einloggen)
> 2. Links unten: **Settings** → **API Keys** → **Create Key**
> 3. Name: `viral-scout` → **Create**
> 4. Key kopieren — er beginnt mit `sk-ant-api03-...` und wird **nur einmal** angezeigt
> 5. Direkt danach: **Settings** → **Limits** → **Monthly spend limit** → z.B. **$20** setzen
>
> Sag mir Bescheid wenn du den Key hast."*

Warte. Wenn der User Probleme hat (Login, Sub fehlt, kein Zugang), hilf ihm einzeln.

### b) Apify Token

Wenn der erste Key da ist:

> *„Cool. Jetzt der Apify-Token (für TikTok/Instagram-Scraping):
>
> 1. Öffne https://console.apify.com
> 2. Account anlegen falls noch nicht (Free-Tier mit $5 Credit/Monat)
> 3. Links oben Profil-Avatar → **Settings** → **API & Integrations** → **Personal API tokens**
> 4. **Create new token** → Name: `viral-scout` → **Save**
> 5. Token kopieren
> 6. Direkt danach: **Settings** → **Billing** → **Usage limits** → Monthly Cap z.B. $20
>
> Sag mir Bescheid wenn du den Token hast."*

### c) Keys eintragen

Wenn beide Keys da sind: lass den User sie als Text in den Chat schicken (er sagt z.B. „hier sind sie: anthropic=sk-ant-... apify=apify_api_..."). Dann erstelle die `.env.local`:

```bash
cat > .env.local <<'EOF'
ANTHROPIC_API_KEY=<KEY-VOM-USER>
APIFY_TOKEN=<TOKEN-VOM-USER>
EOF
```

**Erkläre:** *„Die `.env.local` ist gitignored — dein Key kommt nie aus deinem Rechner raus. Falls du das Tool später jemandem schickst, gib niemals deine `.env.local` mit."*

## 4. Dependencies installieren

```bash
npm install
```

Erkläre: *„Lädt jetzt alle Code-Pakete runter — dauert 1–2 Min. `node_modules/` wird angelegt, ist auch gitignored."*

**Wenn `better-sqlite3` einen `NODE_MODULE_VERSION`-Fehler wirft:**

```bash
npm install better-sqlite3 --build-from-source
```

Erklär: *„`better-sqlite3` ist ein Native-Modul. Beim ersten Mal muss es manchmal explizit gegen deine Node-Version gebaut werden."*

## 5. Dev-Server starten

```bash
npm run dev:lan
```

> **Warum `dev:lan` und nicht `dev`?**
> Es gibt einen Bug in Claude Code Desktop, der die `ANTHROPIC_API_KEY`-Env-Variable in der Shell überschreibt (auf leer setzt). Das `dev:lan` Script macht vorher ein `unset`, dadurch greift `.env.local`. Wenn der User das nicht beachtet, sieht er gelbe „MOCK"-Badges im UI.

Sag: *„Dev-Server läuft jetzt. Öffne im Browser: http://localhost:3002"*

## 6. Erste Nutzung mit dem User durchgehen

> *„Geh ins Browser-Fenster. Du siehst ein Eingabefeld. Versuch's mit `tiktok.com/@herr_tech` oder einem Handle aus deiner Nische. Klick **Scout starten**.
>
> Was passiert: 1:30–3:30 Min lang läuft die Pipeline — du siehst Status-Updates wie 'Profil scrapt', 'Nische analysiert', 'Videos werden gerankt'. Am Ende: Feed mit ~30–60 Videos."*

Bleib im Chat. Wenn etwas nicht läuft → User sendet Screenshot → du fixt.

## 7. Wenn alles läuft

Glückwunsch sagen. Hinweise geben:

> *„Tool läuft. Drei Sachen zum Mitnehmen:
>
> 1. **Nicht in der Cloud deployen** ohne Anpassung — SQLite-Cache funktioniert nur lokal, und ohne Auth würde jeder mit der URL dein Apify-Budget sprengen.
> 2. **Cache:** Die App cached Profile + Niche-Analyse 24h. Wenn du den Niche-Prompt anfassen willst, lösch `.cache/scout.db`.
> 3. **Iteration:** Wenn die Treffer zu schwach oder zu wenige sind, sag mir — wir können Match-Score-Filter, Views-Cutoff und Rank-Skala in `app/api/scout/route.ts` anpassen."*

## Häufige Probleme + Lösungen

| Symptom | Ursache | Fix |
|---|---|---|
| Gelbe „MOCK"-Badges trotz Keys | Shell-Override-Bug | `npm run dev:lan` (nicht `dev`) |
| `NODE_MODULE_VERSION 115/127 mismatch` | better-sqlite3 für falsche Node-Version | `npm install better-sqlite3 --build-from-source` |
| Stream lädt ewig | Browser-Buffering | Console im DevTools öffnen, prüfen ob `text/event-stream` ankommt |
| 0 Treffer | Match-Filter zu streng oder Apify-Budget alle | Filter lockern (`MIN_MATCH_SCORE` runter) oder Apify-Billing prüfen |
| `Cannot find module apify-client` | Native-Module nicht in Server-Bundle | `next.config.ts` → `serverExternalPackages` muss `["apify-client", "better-sqlite3"]` enthalten |
| Apify-Actor liefert 0 Results | Free-Tier verbraucht | Apify-Dashboard → Billing |

## Stellschrauben (für Power-User)

Falls der User später feintunen will, sind die Hebel in `app/api/scout/route.ts`:

- `MIN_VIEWS` (default 25k) — niedriger = mehr Treffer, schlechtere Qualität
- `MIN_MATCH_SCORE` (default 45) — höher = strenger gefiltert
- `combinedScore`-Formel: `match × 0.6 + virality × 0.3 + engagement × 0.1` — Gewichte anpassen
- Search-Budgets (Pool-Größe pro Quelle) — mehr Videos, mehr Kosten

Bei jeder Änderung dem User die Konsequenz erklären (Kosten, Qualität).

---

## 🎨 Branding-Frage — am Ende des Setups stellen

**Wichtig: Sobald der erste Scout durchgelaufen ist, frag aktiv:**

> *„Das Tool hat aktuell Herr-Tech-Branding im UI:
> - Logo oben links + ‚/ viral-scout' Subtext
> - Footer: ‚© herr.tech · Viral Scout · Built with Herr Tech Starter Tools'
> - Lavendel-Akzent (`#B598E2`) für Buttons und Highlights
>
> Willst du das so behalten oder dein eigenes Branding einbauen?"*

### Wenn der User Branding ändern will

Frag nach:
- **Brand-Name** (für Top-Bar-Text + Footer)
- **Primärfarbe** als Hex
- **Logo-Datei** (PNG/SVG, transparenter Hintergrund, Höhe ~36px gut)
- **Domain** für Footer (z.B. `frau.tech`)

### Was du touchen musst

- **`public/herr-tech-logo.png`** → durch User-Logo ersetzen
- **`app/layout.tsx`** → Top-Bar-Text, Footer-Text, Metadata-Titel
- **`app/globals.css`** → Design-Tokens für `--primary` (aktuell `#B598E2`) und ggf. weitere Farben
- **`app/page.tsx`** → wenn der User auch Hero-Headline „KI-Viralität, weltweit entdeckt" umschreiben will

### Standard-Default behalten

Wenn der User „passt schon" sagt: nichts ändern. Branding ist dezent.
