# 🎯 Viral Scout

Findet die best laufenden Reels in deiner Nische — analysiert die Hooks, schlägt 10 Reel-Ideen in deinem Stil vor.

Du wirfst einen TikTok- oder Instagram-Handle rein → das Tool zieht passende virale Videos der letzten 3 Monate aus 5 Weltregionen, sortiert nach Match-Qualität + Viralität, zeigt pro Video Hook + Nachbau-Idee auf Deutsch.

## Was das ist

- **Web-App, lokal auf deinem Rechner** (Next.js)
- Du gibst einen Creator-Handle ein → Output: Feed mit ~30–60 viralen Videos + Analyse
- Pro Video: Hook, Nachbau-Idee, Region-Badge, Views, Engagement
- Quellen: TikTok, Instagram Reels, YouTube Shorts (alle parallel)

## Was du brauchst

- **Claude Code Desktop** — [claude.ai/download](https://claude.ai/download)
- **Node.js 22+** — [nodejs.org](https://nodejs.org) (LTS-Version reicht aus)
- **2 API-Keys** (kostet Geld — siehe unten)
- 20 Minuten Zeit fürs Setup

## Kosten — ehrlich

Das Tool ist nicht gratis im Betrieb. Pro „Scout"-Lauf:

| Posten | Kosten |
|---|---|
| Apify (TikTok + Instagram-Scraping) | ~$2.50–3.50 |
| Anthropic Claude (Niche-Analyse + Ranking) | ~$0.20–0.40 |
| **Pro Scout** | **~$3–4** |

Apify hat $5 Free-Tier-Credit/Monat → ein bis zwei Test-Scouts gehen kostenlos. Danach pay-as-you-go.

> **Wichtig:** Setz dir bei beiden Anbietern ein **monatliches Spend-Cap** in deren Dashboard, damit du nie überrascht wirst.

---

## Setup in 5 Schritten

### 1. Repo klonen

In **Claude Code Desktop** sagst du:

> *„Setz das Viral Scout Tool lokal bei mir auf: https://github.com/jacob-sc/herr-tech-viral-scout"*

Claude klont nach `~/claude/viral-scout/` und führt dich durch die nächsten Schritte.

> ℹ️ Falls du gerade in **Claude Chat** oder **Cowork** bist: erst Claude Code Desktop öffnen.

### 2. API-Keys holen

Du brauchst zwei Keys. Hol dir beide jetzt — Claude wartet, bis du beide hast.

#### a) Anthropic API Key
1. Geh zu [console.anthropic.com](https://console.anthropic.com)
2. Login (mit deinem Claude-Account)
3. Links auf **Settings** → **API Keys** → **Create Key**
4. Name: `viral-scout` → **Create**
5. Key kopieren (beginnt mit `sk-ant-...`) — du siehst ihn nur einmal!
6. **Spend-Cap setzen:** Settings → Limits → Monthly Spend Cap → z.B. $20

#### b) Apify Token
1. Geh zu [console.apify.com](https://console.apify.com)
2. Account anlegen oder Login (Free-Tier mit $5/Monat Credit)
3. Links auf **Settings** → **Integrations** → **Personal API Tokens**
4. **Create new token** → Name: `viral-scout` → **Save**
5. Token kopieren
6. **Spend-Cap setzen:** Billing → Usage Limits → z.B. $20/Monat

### 3. Keys eintragen

Sag Claude einfach:

> *„Hier sind meine Keys:
> - Anthropic: \[Key]
> - Apify: \[Token]"*

Claude trägt sie in `.env.local` ein — diese Datei ist gitignored, kommt nie auf GitHub.

### 4. Dependencies installieren

Claude führt aus:

```bash
cd ~/claude/viral-scout
npm install
```

Dauert 1–2 Minuten beim ersten Mal.

### 5. Dev-Server starten

```bash
npm run dev:lan
```

Browser öffnen: **http://localhost:3002**

> ℹ️ **Warum `dev:lan` und nicht `dev`?** Es gibt einen bekannten Bug bei Claude Code Desktop, der die Anthropic-Env-Variable überschreibt. `dev:lan` macht vorher `unset` — sicherer Weg.

## Erste Nutzung

1. URL oder Handle eingeben — z.B. `tiktok.com/@herr_tech` oder einfach `herr_tech`
2. **Scout starten** klicken
3. Pipeline läuft 1:30–3:30 Minuten:
   - Profil scrapen
   - Nische analysieren (Claude)
   - 7 parallele Suchen über TikTok, Instagram Reels, YouTube Shorts
   - Ranking durch Claude
4. Feed erscheint sortiert nach Match-Score + Viralität

Pro Video bekommst du:
- **Hook** (was funktioniert am Anfang)
- **Nachbau-Idee** (wie du es in deinen Stil übersetzt)
- **Region-Badge** (Afrika / Asien / Europa / Nord-/Südamerika)
- Views, Engagement-Rate, Alter

## Optional — YouTube Shorts dazu

Standardmäßig läuft TikTok + Instagram. Wenn du YouTube Shorts mit dazu willst:

1. Geh zu [console.cloud.google.com](https://console.cloud.google.com)
2. **Projekt erstellen** → Name frei wählen
3. **APIs & Dienste** → **Bibliothek** → suche **YouTube Data API v3** → **Aktivieren**
4. **Anmeldedaten** → **Anmeldedaten erstellen** → **API-Schlüssel**
5. Schlüssel kopieren
6. Sag Claude: *„Hier ist mein YouTube API Key: \[Key]"*

Free-Tier: 10.000 Anfragen/Tag = ~30 Scouts kostenlos.

## Troubleshooting

**Mock-Daten trotz Keys?**
Du siehst gelbe „MOCK"-Badges? Dann hat die Shell deine Keys überschrieben. Lösung: nutz `npm run dev:lan` statt `npm run dev`. Wenn das Problem bleibt, sag Claude: *„Mock-Badge wird angezeigt obwohl Keys da sind — fix das."*

**`NODE_MODULE_VERSION` Fehler beim Start?**
Native Modul (`better-sqlite3`) muss neu gebaut werden:
```bash
npm install better-sqlite3 --build-from-source
```

**Scout liefert nur 5–10 Treffer?**
Manche Nischen haben einfach wenig viralen Content (besonders Afrika/Asien für deutsche Themen). Sag Claude: *„Loosen die Match-Score-Filter, ich will mehr Treffer auch wenn schwächer."*

**Browser zeigt nichts oder hängt?**
Stream-Buffering. Sag Claude: *„Stream lädt nicht, prüf die Console."*

**Apify-Aktoren liefern 0 Results?**
Apify-Free-Tier-Credit aufgebraucht oder Apify-Aktor temporär down. In Apify-Dashboard → Billing prüfen.

## Was das Tool kann (und was nicht)

✅ Findet virale Videos basierend auf einem Creator-Profil
✅ 5 Weltregionen parallel
✅ Deutsche UI, deutsche Hook-Analyse
✅ Cache (24h) für wiederholte Scans desselben Profils

❌ Keine Auth — Single-User-MVP, läuft nur lokal
❌ Kein Deploy auf Vercel ohne Anpassung (SQLite muss raus, Auth muss rein)
❌ Kein Multi-Plattform-Cross-Posting

---

> Teil von [Herr Tech Starter Tools](../README.md) — Modul 3 vom Claude Code Starter Paket.
