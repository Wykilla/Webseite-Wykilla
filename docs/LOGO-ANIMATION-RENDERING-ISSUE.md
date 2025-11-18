# LogoAnimation Rendering Problem

## 🔍 Problem-Beschreibung

Die `LogoAnimation` Komponente wird nicht korrekt gerendert. Statt des animierten Logos werden HTML-Tags als Text angezeigt.

### Symptome

**Was der Benutzer sieht:**
```
<LogoAnimation src="/images/logo/placeholder-logo.svg" alt="WYKILLA" width={200} height={200} className="mx-auto mb-8"></LogoAnimation>
<div class="glow-cyan transition-transform duration-300 mx-auto mb-8" style="filter: drop-shadow(rgba(4, 10, 11, 0.04) 0px 0px 0.9517px);"></div>
<ForwardRef alt="WYKILLA" width={200} height={200} decoding="async" style="[Object]" src="/images/logo/placeholder-logo.svg" unoptimized={true} placeholder="empty" fill={false} onLoadRef="[Object]" onLoadingCompleteRef="[Object]" setBlurComplete="[Function]" setShowAltText="[Function]" ref={null}></ForwardRef>
<img alt="WYKILLA" width="200" height="200" decoding="async" data-nimg="1" style="color:transparent" src="/images/logo/placeholder-logo.svg"></img>
```

**Was erwartet wird:**
- Ein animiertes WYKILLA-Logo (200x200px)
- Mit cyan Glow-Effekt (leuchtender Rand)
- Smooth Animation (Pulsieren des Glows)

## 📍 Wo das Problem auftritt

### Dateien betroffen:

1. **`src/components/chapters/intro/HeroSection.tsx`**
   - Zeile 30-36: Verwendet `LogoAnimation` Komponente
   - Import: `import LogoAnimation from './LogoAnimation'`

2. **`src/components/chapters/intro/LogoAnimation.tsx`**
   - Die Komponente selbst, die das Problem verursacht
   - Verwendet `next/image` Image-Komponente
   - Verwendet GSAP für Animationen

3. **`src/app/page.tsx`**
   - Zeile 16: Rendert `HeroSection` (welches `LogoAnimation` enthält)

## 🔧 Root Cause Analysis

### Mögliche Ursachen:

1. **React Hydration Mismatch**
   - Server-seitiges Rendering (SSR) generiert anderes HTML als Client-seitiges Rendering
   - `Math.random()` oder andere client-only APIs werden während SSR aufgerufen

2. **Next.js Image Optimization**
   - `next/image` Komponente wird nicht korrekt geladen
   - Static Export Modus könnte Image-Optimierung deaktiviert haben

3. **GSAP/Animation Library**
   - GSAP wird möglicherweise vor React Hydration geladen
   - Animation-Initialisierung schlägt fehl

4. **Client/Server Component Mismatch**
   - Komponente ist als Server Component markiert, benötigt aber Client-Side Features

## 🛠️ Lösungsschritte für AI-Assistenten

### Schritt 1: Komponente prüfen

**Datei:** `src/components/chapters/intro/LogoAnimation.tsx`

**Prüfe:**
- Ist `'use client'` am Anfang der Datei?
- Werden client-only APIs (`Math.random()`, `window`, etc.) in der Render-Funktion verwendet?
- Wird GSAP korrekt initialisiert?

### Schritt 2: HeroSection prüfen

**Datei:** `src/components/chapters/intro/HeroSection.tsx`

**Prüfe:**
- Ist `'use client'` vorhanden?
- Wird `LogoAnimation` korrekt importiert?
- Gibt es Suspense-Boundaries?

### Schritt 3: Browser Console prüfen

**Fehler die auftreten könnten:**
- `Hydration failed because the initial UI does not match what was rendered on the server`
- `Text content does not match server-rendered HTML`
- `Cannot read properties of undefined`

### Schritt 4: Lösung implementieren

**Option A: Client-Only Rendering**
```typescript
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LogoAnimation({ src, alt, width, height, className }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div style={{ width, height }} /> // Placeholder
  }
  
  // Rest der Komponente
}
```

**Option B: Dynamic Import mit SSR: false**
```typescript
// In HeroSection.tsx
const LogoAnimation = dynamic(
  () => import('./LogoAnimation'),
  { ssr: false }
)
```

**Option C: Math.random() in useEffect verschieben**
```typescript
// Statt direkt im Render:
const [glowIntensity, setGlowIntensity] = useState(0.4)

useEffect(() => {
  // Animation nur client-side initialisieren
  if (typeof window !== 'undefined' && gsap) {
    // GSAP Animation hier
  }
}, [])
```

## 📋 Checkliste für Reparatur

- [ ] `LogoAnimation.tsx` hat `'use client'` Direktive
- [ ] Alle `Math.random()` Aufrufe sind in `useEffect` verschoben
- [ ] GSAP wird nur client-side initialisiert
- [ ] `next/image` wird korrekt verwendet (keine SSR-Probleme)
- [ ] Browser Console zeigt keine Hydration-Fehler
- [ ] Logo wird visuell korrekt angezeigt (nicht als Text)
- [ ] Glow-Animation funktioniert

## 🔗 Verwandte Dateien

- `src/components/chapters/intro/HeroSection.tsx` - Verwendet LogoAnimation
- `src/components/chapters/intro/LogoAnimation.tsx` - Die problematische Komponente
- `src/hooks/useGSAP.ts` - GSAP Hook (falls vorhanden)
- `src/hooks/useReducedMotion.ts` - Reduced Motion Hook

## 📝 Notizen

- Das Problem ähnelt dem React Three Fiber Problem (siehe `docs/` für weitere Infos)
- Next.js 15 hat striktere Hydration-Checks
- Static Export Modus könnte zusätzliche Probleme verursachen
- Prüfe `next.config.mjs` für Image-Optimierung Einstellungen

## 🎯 Erwartetes Ergebnis nach Fix

Nach erfolgreicher Reparatur sollte:
1. Das Logo visuell angezeigt werden (nicht als HTML-Text)
2. Der cyan Glow-Effekt sichtbar sein
3. Die Animation smooth laufen (Pulsieren)
4. Keine Console-Fehler auftreten
5. Keine Hydration-Warnings in der Browser Console

---

**Erstellt:** 2025-01-XX  
**Status:** 🔴 Offen - Benötigt Reparatur  
**Priorität:** Hoch (sichtbares Problem auf der Hauptseite)

