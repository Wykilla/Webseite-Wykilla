# Multi-Agent Branch Merge Strategy

## 🌳 Branch Structure

Da jeder Agent seine eigene Session-ID hat, arbeitet jeder auf seinem eigenen Branch:

```
main (oder master)
└── claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg (Basis mit Epic 0)
    ├── claude/agent-1-epic-1-6-8-<session-id>   (Agent 1: Intro, Lore, Outro)
    ├── claude/agent-2-epic-3-7-<session-id>     (Agent 2: Music, Merch)
    ├── claude/agent-3-epic-4-2-<session-id>     (Agent 3: 3D World, Hub)
    └── claude/agent-4-epic-9-5-<session-id>     (Agent 4: Backend, Tools)
```

---

## ✅ Warum separate Branches?

**Problem:** Jeder Agent hat eine andere Session-ID. Claude Code's Git-Push-Hook erlaubt nur Pushes zu Branches, die mit der eigenen Session-ID enden.

**Lösung:** Jeder Agent arbeitet auf seinem eigenen Branch → Keine Push-Konflikte während der Entwicklung!

**Vorteil:** Echte parallele Entwicklung ohne gegenseitige Blockierung.

---

## 🔀 Merge-Strategie: Option 1 (Empfohlen)

### Merge alle Agent-Branches nacheinander in den Basis-Branch

**Schritt 1: Check Status aller Agents**

```bash
# Liste alle Agent-Branches
git branch -a | grep agent

# Sollte zeigen:
# remotes/origin/claude/agent-1-epic-1-6-8-xxxxx
# remotes/origin/claude/agent-2-epic-3-7-xxxxx
# remotes/origin/claude/agent-3-epic-4-2-xxxxx
# remotes/origin/claude/agent-4-epic-9-5-xxxxx
```

**Schritt 2: Checkout Basis-Branch**

```bash
git checkout claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
git pull origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

**Schritt 3: Merge Agent 1 (Intro, Lore, Outro)**

```bash
# Ersetze <session-id> mit der echten ID
git fetch origin claude/agent-1-epic-1-6-8-<session-id>
git merge origin/claude/agent-1-epic-1-6-8-<session-id> --no-ff -m "Merge Agent 1: Epic 1, 6, 8 (Intro, Lore, Outro)"

# Check for conflicts (sollte keine geben!)
git status

# Wenn OK:
git push origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

**Schritt 4: Merge Agent 3 (3D World, Hub)**

```bash
git fetch origin claude/agent-3-epic-4-2-<session-id>
git merge origin/claude/agent-3-epic-4-2-<session-id> --no-ff -m "Merge Agent 3: Epic 4, 2 (3D World, Hub)"

# Check src/app/page.tsx - hier KÖNNTE ein Konflikt sein!
git status

# Wenn Konflikt in page.tsx:
git diff src/app/page.tsx
# Löse manuell (siehe unten)

git add src/app/page.tsx
git commit
git push origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

**Schritt 5: Merge Agent 2 (Music, Merch)**

```bash
git fetch origin claude/agent-2-epic-3-7-<session-id>
git merge origin/claude/agent-2-epic-3-7-<session-id> --no-ff -m "Merge Agent 2: Epic 3, 7 (Music, Merch)"

# Check page.tsx wieder
git status

# Löse Konflikte wenn nötig
git push origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

**Schritt 6: Merge Agent 4 (Backend, Tools)**

```bash
git fetch origin claude/agent-4-epic-9-5-<session-id>
git merge origin/claude/agent-4-epic-9-5-<session-id> --no-ff -m "Merge Agent 4: Epic 9, 5 (Backend, Tools)"

# Final check
git status

# Löse Konflikte wenn nötig
git push origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

**Schritt 7: Final Verification**

```bash
# TypeScript check
npx tsc --noEmit

# Build check
npm run build

# Dev-Server check
npm run dev

# Wenn alles OK → Ready to deploy!
```

---

## 🔀 Merge-Strategie: Option 2 (Sequenziell)

Falls du die Merges lieber einzeln machen und testen willst:

**Nach jedem Merge:**

1. Merge einen Agent-Branch
2. Test: `npx tsc --noEmit`
3. Test: `npm run dev`
4. Verify: Neue Features sichtbar
5. Commit & Push
6. Weiter zum nächsten Agent

**Reihenfolge:**

1. Agent 3 (Hub) → Provides navigation structure
2. Agent 1 (Intro, Lore, Outro) → Start and End
3. Agent 2 (Music, Merch) → Content chapters
4. Agent 4 (Backend, Tools) → Last (needs setup)

---

## 🚨 Konflikt-Resolution: page.tsx

**Der einzige erwartete Konflikt:** `src/app/page.tsx`

### Warum?

Jeder Agent fügt seine Section(s) zu `page.tsx` hinzu:

- Agent 1: `<HeroSection />`, `<LoreSection />`, `<OutroSection />`
- Agent 2: `<MusicSection />`, `<MerchSection />`
- Agent 3: `<HubSection />`, `<WorldSection />`
- Agent 4: `<ToolsSection />`

### Erwarteter Konflikt:

```diff
<<<<<<< HEAD
import HeroSection from '@/components/chapters/intro/HeroSection'
=======
import MusicSection from '@/components/chapters/music/MusicSection'
>>>>>>> origin/claude/agent-2-epic-3-7-xxxxx
```

### Lösung:

**BEHALTE ALLE IMPORTS UND ALLE SECTIONS!**

Finale `src/app/page.tsx` sollte so aussehen:

```typescript
import HeroSection from '@/components/chapters/intro/HeroSection'
import HubSection from '@/components/chapters/hub/HubSection'
import MusicSection from '@/components/chapters/music/MusicSection'
import WorldSection from '@/components/chapters/world/WorldSection'
import ToolsSection from '@/components/chapters/tools/ToolsSection'
import LoreSection from '@/components/chapters/lore/LoreSection'
import MerchSection from '@/components/chapters/merch/MerchSection'
import OutroSection from '@/components/chapters/outro/OutroSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HubSection />
      <MusicSection />
      <WorldSection />
      <ToolsSection />
      <LoreSection />
      <MerchSection />
      <OutroSection />
    </main>
  )
}
```

**Reihenfolge wichtig:**

1. Intro (Hero)
2. Hub (Navigation)
3. Music
4. World (3D)
5. Tools
6. Lore
7. Merch
8. Outro

---

## ✅ Conflict Resolution Workflow

```bash
# Wenn Konflikt auftritt:
git status
# Zeigt: both modified: src/app/page.tsx

# Öffne Datei
code src/app/page.tsx

# Manuelle Konflikt-Lösung:
# 1. Lösche alle Konflikt-Marker (<<<<<<, =======, >>>>>>>)
# 2. Behalte ALLE Imports
# 3. Behalte ALLE Sections in korrekter Reihenfolge
# 4. Save

# Mark als resolved
git add src/app/page.tsx

# Complete merge
git commit

# Test!
npx tsc --noEmit
npm run dev

# Wenn OK:
git push
```

---

## 📊 Progress Tracking

**Check welche Agents fertig sind:**

```bash
# Liste alle Branches mit letztem Commit
git for-each-ref --sort=-committerdate refs/remotes/origin/ --format='%(refname:short) | %(committerdate:relative) | %(subject)'

# Filter Agent-Branches
git for-each-ref --sort=-committerdate refs/remotes/origin/ --format='%(refname:short) | %(committerdate:relative) | %(subject)' | grep agent
```

**Count Stories per Agent:**

```bash
# Agent 1 Stories
git log origin/claude/agent-1-epic-1-6-8-<id> --oneline | grep -i story | wc -l
# Sollte: 19

# Agent 2 Stories
git log origin/claude/agent-2-epic-3-7-<id> --oneline | grep -i story | wc -l
# Sollte: 15

# Agent 3 Stories
git log origin/claude/agent-3-epic-4-2-<id> --oneline | grep -i story | wc -l
# Sollte: 14

# Agent 4 Stories
git log origin/claude/agent-4-epic-9-5-<id> --oneline | grep -i story | wc -l
# Sollte: 17
```

---

## 🎯 Final Checklist (Nach allen Merges)

- [ ] Alle 4 Agent-Branches gemerged
- [ ] TypeScript kompiliert: `npx tsc --noEmit`
- [ ] Build erfolgreich: `npm run build`
- [ ] Dev-Server läuft: `npm run dev`
- [ ] Alle 8 Sections laden in Browser
- [ ] Navigation funktioniert
- [ ] Keine Console Errors
- [ ] `INTEGRATION-CHECKLIST.md` durchgegangen

**Wenn alle Checks grün:** ✅ **READY FOR PRODUCTION!**

---

## 🚀 Deploy to Production

Nach erfolgreichen Merges:

```bash
# Merge in main/master
git checkout main
git merge claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg

# Push to main
git push origin main

# Vercel auto-deploys!
```

---

## 📝 Notizen

- **Keine Panik bei Merge-Konflikten** - nur `page.tsx` ist betroffen
- **Alle anderen Dateien** haben 0% Konflikt-Chance (separate Ordner!)
- **Backup before Merge:** `git checkout -b backup-before-merge`
- **Test nach jedem Merge** - nicht alles auf einmal
- **Communication:** Stelle sicher, dass alle Agents ihre Arbeit gepusht haben

---

## 🛟 Rollback bei Problemen

Wenn nach einem Merge etwas schief geht:

```bash
# Vorheriger Commit
git log --oneline -5

# Rollback
git reset --hard <commit-hash-before-merge>

# Force push (Vorsicht!)
git push -f origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

**Oder:**

```bash
# Merge rückgängig machen
git revert -m 1 HEAD
```

---

## ✅ Success!

Nach allen Merges:

```
claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
├── Epic 0: Foundation ✅
├── Epic 1: Intro/Hero ✅ (Agent 1)
├── Epic 2: Hub ✅ (Agent 3)
├── Epic 3: Music ✅ (Agent 2)
├── Epic 4: 3D World ✅ (Agent 3)
├── Epic 5: Tools ✅ (Agent 4)
├── Epic 6: Lore ✅ (Agent 1)
├── Epic 7: Merch ✅ (Agent 2)
├── Epic 8: Outro ✅ (Agent 1)
└── Epic 9: Backend ✅ (Agent 4)

= 100% Complete! 🎉
```
