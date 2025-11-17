# Agent 4 Starter

**Schritt 1: Basis-Branch auschecken und eigenen Branch erstellen**
```bash
# Basis-Branch holen
git checkout claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
git pull origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg

# EIGENEN Branch erstellen (mit deiner Session-ID)
# Format: claude/agent-4-epic-9-5-<deine-session-id>
git checkout -b claude/agent-4-epic-9-5-$(date +%s)
```

**Schritt 2: Briefing lesen und starten**

Lies die Datei `docs/agent-briefings/AGENT-4-BRIEFING.md` und folge den Anweisungen darin.

Starte mit Epic 9, Story 9.1 und arbeite chronologisch durch alle Stories.

**WICHTIG:**
- Keine Fragen stellen - alle Informationen sind im Briefing!
- Du arbeitest auf DEINEM eigenen Branch
- Pushe zu DEINEM Branch (nicht zum Basis-Branch)
- Am Ende werden alle Agent-Branches zusammengeführt
