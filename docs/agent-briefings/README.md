# WYKILLA Multi-Agent Briefings

## 📋 Übersicht

Diese 4 Agent-Briefings ermöglichen parallele Entwicklung der WYKILLA Website durch 4 separate Claude-Instanzen (in separaten Chat-Fenstern).

**Epic 0 (Foundation)** ist bereits abgeschlossen ✅

---

## 🎯 Agent-Aufteilung

| Agent | Epics | Stories | Story Points | Fokus |
|-------|-------|---------|--------------|-------|
| **Agent 1** | Epic 1, 6, 8 | 19 | 73 SP | Intro/Hero, Lore, Outro |
| **Agent 2** | Epic 3, 7 | 15 | 59 SP | Music, Merch/Community |
| **Agent 3** | Epic 4, 2 | 14 | 64 SP | 3D World, Hub |
| **Agent 4** | Epic 9, 5 | 17 | 83 SP | Backend/Auth/Payment, Tools |

**Total**: 65 Stories, 279 Story Points

---

## 🚀 Wie verwenden?

### Schritt-für-Schritt Anleitung:

**1. Öffne 4 neue Claude-Chat-Fenster** (separate Browser-Tabs oder Fenster)

**2. Kopiere die Briefings:**

#### Chat-Fenster 1:
- Öffne `AGENT-1-BRIEFING.md`
- Kopiere den **GESAMTEN Inhalt** (Strg+A, Strg+C)
- Füge ihn in das neue Chat-Fenster ein (Strg+V)
- Benenne den Chat: **"Agent 1"**

#### Chat-Fenster 2:
- Öffne `AGENT-2-BRIEFING.md`
- Kopiere den **GESAMTEN Inhalt**
- Füge ihn in das neue Chat-Fenster ein
- Benenne den Chat: **"Agent 2"**

#### Chat-Fenster 3:
- Öffne `AGENT-3-BRIEFING.md`
- Kopiere den **GESAMTEN Inhalt**
- Füge ihn in das neue Chat-Fenster ein
- Benenne den Chat: **"Agent 3"**

#### Chat-Fenster 4:
- Öffne `AGENT-4-BRIEFING.md`
- Kopiere den **GESAMTEN Inhalt**
- Füge ihn in das neue Chat-Fenster ein
- Benenne den Chat: **"Agent 4"**

**3. Jeder Agent startet automatisch** mit seiner Arbeit - KEINE weiteren Anweisungen nötig!

---

### Option A: Voll-parallel (schnellste Entwicklung)
Starte alle 4 Agents gleichzeitig für maximale Geschwindigkeit.

**Zeitersparnis: ~60%** (13-18 Wochen → 5-7 Wochen)

### Option B: Sequenziell (empfohlen wenn Backend-Setup nötig)
1. **Starte Agent 4 zuerst** (Epic 9: Backend-Setup mit Supabase/Stripe)
2. Nach Epic 9 Completion: Starte Agents 1-3 parallel
3. Agent 4 macht dann Epic 5 (Tools) parallel zu den anderen

---

## 📂 Briefing-Dateien

### AGENT-1-BRIEFING.md
- **Epic 1**: Intro / Hero Chapter (5 Stories, 22 SP)
  - Hero Section mit Logo Animation
  - Particle Background
  - Scroll-Triggered Text Reveals
- **Epic 6**: Lore Chapter (8 Stories, 32 SP)
  - Lore Section mit Glassmorphismus
  - Timeline Visualization
  - Parallax Scrolling
- **Epic 8**: Outro Chapter (6 Stories, 19 SP)
  - CTA Buttons
  - Newsletter Signup
  - Social Links & Footer

### AGENT-2-BRIEFING.md
- **Epic 3**: Music Chapter (8 Stories, 34 SP)
  - Audio Player mit Howler.js
  - Waveform Visualization
  - Track Cards & Playlist
- **Epic 7**: Merch / Community Chapter (7 Stories, 25 SP)
  - Product Cards
  - Community Section
  - Testimonials

### AGENT-3-BRIEFING.md
- **Epic 4**: 3D World Chapter (8 Stories, 40 SP)
  - React Three Fiber Setup
  - Procedural 3D Scene
  - Particle Field
  - Scroll-Triggered Camera
- **Epic 2**: Hub Chapter (6 Stories, 24 SP)
  - Chapter Thumbnails Grid
  - Smooth Scroll Navigation
  - Animations

### AGENT-4-BRIEFING.md
- **Epic 9**: Backend / Auth / Payment (10 Stories, 52 SP)
  - Supabase Setup & Schema
  - NextAuth.js v5 Integration
  - Stripe Subscriptions
  - Usage Tracking
- **Epic 5**: Tools Chapter (7 Stories, 31 SP)
  - Lyric Generator UI + API
  - Audio FX Generator UI + API
  - Tools Section

---

## 🔄 Konflikt-Management

Die Epics wurden so aufgeteilt, dass **KEINE Datei-Konflikte** entstehen:

| Agent | Dateien | Ordner |
|-------|---------|--------|
| Agent 1 | `src/components/chapters/intro/`, `lore/`, `outro/` | Intro, Lore, Outro |
| Agent 2 | `src/components/chapters/music/`, `merch/` | Music, Merch |
| Agent 3 | `src/components/chapters/world/`, `hub/` | World, Hub |
| Agent 4 | `src/app/api/`, `src/lib/`, `src/components/chapters/tools/` | Backend, Tools |

**Einzige gemeinsame Datei**: `src/app/page.tsx` - wird von jedem Agent einmal aktualisiert (beim Integrieren ihrer Sections). Kleine Merge-Konflikte möglich, aber einfach lösbar.

---

## ✅ Fortschritts-Tracking

Jedes Briefing enthält eine **Completion Checklist** am Ende. Du kannst:

1. Manuell abhaken in den Briefing-Dateien
2. Git-Commits tracken (jede Story = 1 Commit)
3. Kanban-Board verwenden (optional)

---

## 📊 Geschätzte Zeiten

Bei paralleler Arbeit (alle 4 Agents gleichzeitig):

- **Epic 0**: ✅ Fertig (8 Stories, ~4 Stunden)
- **Epics 1-9**: ~5-7 Wochen → **1-2 Wochen** (mit 4 Agents parallel!)

Bei sequenzieller Arbeit (1 Agent):

- **Epic 0**: ✅ Fertig
- **Epics 1-9**: ~13-18 Wochen

**Zeitersparnis durch Parallelisierung: ~60%!**

---

## 🎓 Wichtige Hinweise

### Für Agents:
- **KEINE FRAGEN STELLEN** - Alle Entscheidungen sind in den Briefings getroffen
- Strikt den Code-Beispielen folgen
- Nach jeder Story committen & pushen
- TypeScript-Kompilierung vor jedem Commit testen

### Für den User:
- Alle Agents verwenden den **gleichen Git-Branch**: `claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg`
- Agents können gleichzeitig committen (verschiedene Dateien)
- Nur bei `page.tsx` kann es zu Merge-Konflikten kommen
- Regelmäßig `git pull` in jedem Chat, um Updates zu synchronisieren

---

## 🛠️ Setup-Anforderungen

### Bereits installiert ✅
- Next.js 15, TypeScript, Tailwind CSS
- GSAP, Lenis, React Three Fiber, Howler.js
- NextAuth.js, Supabase, Stripe

### User muss konfigurieren:
**Agent 4 benötigt** folgende Credentials in `.env.local`:

```bash
# Supabase (kostenloser Account: https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe (Test-Modus: https://stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# OpenAI (für AI Tools: https://openai.com)
OPENAI_API_KEY=

# Optional: Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Agents 1-3** benötigen keine zusätzlichen Credentials.

---

## 🚦 Start-Reihenfolge

### Empfohlene Reihenfolge:

**Phase 1**: Agent 4 (Backend Foundation)
```
Epic 9: Backend/Auth/Payment (Stories 9.1-9.5)
```
→ Supabase, NextAuth, Stripe müssen funktionieren

**Phase 2**: Alle parallel
```
Agent 1: Epic 1, 6, 8
Agent 2: Epic 3, 7
Agent 3: Epic 4, 2
Agent 4: Epic 5 + Rest of Epic 9
```

**Phase 3**: Integration & Testing
- Alle `page.tsx` Updates mergen
- Cross-Chapter Navigation testen
- Full-Site Scroll-Test

---

## 📞 Support

Bei Problemen:

1. **Merge-Konflikte**: Löse Konflikte in `page.tsx` manuell (alle Sections importieren)
2. **TypeScript-Fehler**: Prüfe, ob alle dependencies installiert sind (`npm install`)
3. **Build-Fehler**: Teste mit `npm run build` vor jedem großen Commit
4. **Git-Probleme**: Nutze `git status` und `git log` für Debugging

---

## 🎉 Los geht's!

**Nächster Schritt**: Kopiere ein Briefing in ein neues Claude-Chat-Fenster und starte die Implementierung!

Viel Erfolg mit der parallelen Entwicklung! 🚀
