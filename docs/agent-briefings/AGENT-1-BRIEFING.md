# 📋 KOPIERE DIESEN TEXT IN EIN NEUES CHAT-FENSTER

**Chat-Name:** `Agent 1 - Epic 1, 6, 8 (Intro, Lore, Outro)`

Kopiere den **GESAMTEN Inhalt** dieser Datei in ein neues Claude-Chat-Fenster und benenne den Chat **"Agent 1"**.

---

# AGENT 1 BRIEFING - Epic 1, 6, 8 (Intro/Hero, Lore, Outro)

## ⚠️ WICHTIG: KEINE FRAGEN STELLEN

Dieses Briefing enthält ALLE Informationen für die Implementierung. Alle Entscheidungen sind getroffen. **Stelle KEINE Fragen** - implementiere direkt gemäß den Spezifikationen unten.

---

## 🎯 DEINE AUFGABE

Du implementierst **3 Epics** parallel zur Arbeit anderer Agenten:

- **Epic 1**: Intro / Hero Chapter (5 Stories, 22 SP)
- **Epic 6**: Lore Chapter (8 Stories, 32 SP)
- **Epic 8**: Outro Chapter (6 Stories, 19 SP)

**Total**: 19 Stories, 73 Story Points

---

## 📋 PROJEKTKONTEXT

### Git-Branch
```bash
claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

### Projekt: WYKILLA Website
Cinematic, scroll-driven Next.js 15 Website für WYKILLA - Melodic Techno Producer, 3D Artist und AI Tool Creator.

### Epic 0 (Foundation) - BEREITS FERTIG ✅
- Next.js 15 + TypeScript + Tailwind CSS
- Lenis Smooth Scrolling + GSAP ScrollTrigger
- React Three Fiber (R3F) für 3D
- Alle Hooks, UI Components, Layout, Navigation
- Asset-System mit Placeholder-Tracking

### Technischer Stack
```json
{
  "framework": "Next.js 15 (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "animation": "GSAP + ScrollTrigger, Framer Motion",
  "scroll": "Lenis (smooth scroll)",
  "3D": "React Three Fiber (R3F) + Drei",
  "audio": "Howler.js"
}
```

### Brand Colors
```typescript
colors: {
  cyan: '#4CC9F0',      // Primary accent
  magenta: '#FF3AC0',   // Secondary accent
  gold: '#FFD580',      // Highlight
  bordeaux: '#6C002A',  // Dark accent
  ink: '#0A0A0F',       // Background
}
```

---

## 📁 DATEISYSTEM-STRUKTUR

```
src/
├── app/
│   ├── layout.tsx          ✅ Fertig (MainLayout integriert)
│   ├── page.tsx            ✅ Fertig (Placeholder-Sections)
│   └── globals.css         ✅ Fertig (Tailwind + utilities)
├── components/
│   ├── chapters/           ← DU ERSTELLST HIER:
│   │   ├── intro/          ← Epic 1 Komponenten
│   │   ├── lore/           ← Epic 6 Komponenten
│   │   └── outro/          ← Epic 8 Komponenten
│   ├── layout/             ✅ Fertig (MainLayout, Navigation, ScrollContainer)
│   └── ui/                 ✅ Fertig (Button, Card, GlassmorphCard, Input)
├── hooks/                  ✅ Fertig (useLenis, useGSAP, useMediaQuery, useReducedMotion)
├── config/                 ✅ Fertig (assets.ts, chapters.ts, site.ts)
├── types/                  ✅ Fertig (chapter.ts, audio.ts, assets.ts, user.ts, api.ts)
└── lib/
    └── utils.ts            ✅ Fertig (cn utility)
```

### Assets (alle Placeholder)
```typescript
// Alle Assets in src/config/assets.ts definiert
// Alle haben isPlaceholder: true Flags
// Einfach importieren: import { assets } from '@/config/assets'

assets.hero.logo         // '/images/logo/placeholder-logo.svg'
assets.hero.image        // Hero Background
assets.lore.background   // '/images/lore/lore_bg.webp'
```

---

## 🎬 EPIC 1: INTRO / HERO CHAPTER

**Emotional Journey**: Wonder & Anticipation
**Duration**: ~2.5 seconds scroll time
**Color**: Cyan (#4CC9F0)

### Story 1.1: Create Hero Section Component (3 SP)
**File**: `src/components/chapters/intro/HeroSection.tsx`

**Acceptance Criteria**:
- Full-screen hero section (100vh)
- Centered WYKILLA logo (placeholder-logo.svg)
- Tagline: "Melodic Techno • 3D Art • AI Tools"
- Subtle particle effect background (canvas or CSS)
- Fade-in on load (Framer Motion)
- Respects `prefers-reduced-motion`

**Implementation**:
```typescript
'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Image from 'next/image'
import { assets } from '@/config/assets'

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="intro" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background particles - subtle animated dots */}
      <div className="absolute inset-0 z-0">
        {/* Canvas or CSS particle effect */}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : 1.2,
          ease: 'easeOut',
        }}
        className="relative z-10 text-center"
      >
        {/* Logo */}
        <Image
          src={assets.hero.logo}
          alt="WYKILLA"
          width={200}
          height={200}
          className="mx-auto mb-8 glow-cyan"
        />

        {/* Title */}
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
          WYKILLA
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/80">
          Melodic Techno • 3D Art • AI Tools
        </p>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <svg className="w-6 h-10 text-cyan" /* scroll arrow SVG */>
            {/* ... */}
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
```

---

### Story 1.2: Implement Logo Animation (5 SP)
**File**: `src/components/chapters/intro/LogoAnimation.tsx`

**Acceptance Criteria**:
- Subtle glow pulse on logo
- Rotation on hover (optional, only if NOT reduced motion)
- GSAP Timeline für sophisticated animation
- Export as separate component for reuse

**Implementation Pattern**:
```typescript
'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Image from 'next/image'

export default function LogoAnimation({ src, alt }: { src: string; alt: string }) {
  const logoRef = useRef<HTMLDivElement>(null)
  const { gsap } = useGSAP()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !logoRef.current) return

    // Glow pulse animation
    gsap.to(logoRef.current, {
      filter: 'drop-shadow(0 0 20px rgba(76, 201, 240, 0.8))',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [gsap, prefersReducedMotion])

  return (
    <div ref={logoRef} className="glow-cyan">
      <Image src={src} alt={alt} width={200} height={200} />
    </div>
  )
}
```

---

### Story 1.3: Add Particle Background Effect (5 SP)
**File**: `src/components/chapters/intro/ParticleBackground.tsx`

**Acceptance Criteria**:
- Canvas-based or CSS-based particle system
- 50-100 floating particles
- Slow drift animation
- Performance-optimized (requestAnimationFrame)
- Disabled if `prefers-reduced-motion`

**Empfehlung**: Use simple CSS approach with absolute positioned divs + random delays:

```typescript
'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ParticleBackground() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${10 + Math.random() * 10}s`,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan/20 rounded-full animate-float"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}
```

Add to `globals.css`:
```css
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-40px) translateX(-10px); }
  75% { transform: translateY(-20px) translateX(5px); }
}

.animate-float {
  animation: float 15s infinite ease-in-out;
}
```

---

### Story 1.4: Implement Scroll-Triggered Text Reveal (5 SP)
**File**: `src/components/chapters/intro/ScrollRevealText.tsx`

**Acceptance Criteria**:
- Text fades in as user scrolls down
- Use GSAP ScrollTrigger
- Stagger effect (words appear one by one)
- Smooth opacity + y-position animation

**Implementation**:
```typescript
'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ScrollRevealText({ text }: { text: string }) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const { gsap, ScrollTrigger } = useGSAP()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !textRef.current) return

    const words = textRef.current.querySelectorAll('.word')

    gsap.fromTo(
      words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
        },
      }
    )
  }, [gsap, ScrollTrigger, prefersReducedMotion])

  const words = text.split(' ')

  return (
    <p ref={textRef} className="text-lg">
      {words.map((word, i) => (
        <span key={i} className="word inline-block mr-1">
          {word}
        </span>
      ))}
    </p>
  )
}
```

---

### Story 1.5: Integrate Hero into Main Page (4 SP)
**File**: `src/app/page.tsx` (update existing)

**Acceptance Criteria**:
- Replace `<section id="intro">` placeholder with `<HeroSection />`
- Import all sub-components
- Verify smooth transition to Hub section
- Test scroll behavior

**Update**:
```typescript
import HeroSection from '@/components/chapters/intro/HeroSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Hub placeholder - wird von Agent 3 implementiert */}
      <section id="hub" className="h-screen flex items-center justify-center">
        <h2>Hub Chapter (Agent 3)</h2>
      </section>

      {/* ... other sections */}
    </main>
  )
}
```

---

## 📖 EPIC 6: LORE CHAPTER

**Emotional Journey**: Curiosity & Immersion
**Duration**: ~4 seconds scroll time
**Color**: Bordeaux (#6C002A)

### Story 6.1: Create Lore Section Layout (3 SP)
**File**: `src/components/chapters/lore/LoreSection.tsx`

**Acceptance Criteria**:
- Dark, moody background (bordeaux gradient)
- Full-height section (min-h-screen)
- Content grid: Left (text), Right (visual)
- Glassmorphism cards for lore entries

**Implementation**:
```typescript
'use client'

import { GlassmorphCard } from '@/components/ui'
import { assets } from '@/config/assets'

export default function LoreSection() {
  return (
    <section
      id="lore"
      className="relative min-h-screen py-20"
      style={{
        backgroundImage: `url(${assets.lore.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bordeaux/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-bordeaux to-magenta bg-clip-text text-transparent">
            The Story
          </span>
        </h2>

        {/* Lore entries grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Lore cards will be added in Story 6.2 */}
        </div>
      </div>
    </section>
  )
}
```

---

### Story 6.2: Create Lore Entry Card Component (4 SP)
**File**: `src/components/chapters/lore/LoreCard.tsx`

**Acceptance Criteria**:
- Glassmorphism card with title, text, optional image
- Hover effect (subtle scale + glow)
- Fade-in on scroll
- Reusable for multiple lore entries

**Implementation**:
```typescript
'use client'

import { useRef, useEffect } from 'react'
import { GlassmorphCard } from '@/components/ui'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface LoreCardProps {
  title: string
  text: string
  image?: string
}

export default function LoreCard({ title, text, image }: LoreCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { gsap, ScrollTrigger } = useGSAP()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      }
    )
  }, [gsap, ScrollTrigger, prefersReducedMotion])

  return (
    <div ref={cardRef}>
      <GlassmorphCard
        intensity="medium"
        glow
        className="hover:scale-[1.02] transition-transform duration-300"
      >
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
          </div>
        )}
        <h3 className="font-display text-2xl font-bold mb-3 text-bordeaux">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed">{text}</p>
      </GlassmorphCard>
    </div>
  )
}
```

---

### Story 6.3: Add Lore Content (Placeholder Text) (2 SP)
**File**: `src/config/lore.ts` (CREATE NEW)

**Acceptance Criteria**:
- 4-6 lore entries with placeholder text
- Export as array
- Structure: { title, text, image? }

**Implementation**:
```typescript
export interface LoreEntry {
  id: string
  title: string
  text: string
  image?: string
}

export const loreEntries: LoreEntry[] = [
  {
    id: 'origin',
    title: 'The Beginning',
    text: 'In the depths of creative exploration, WYKILLA emerged from the fusion of sound, vision, and code. A journey that started with a single beat evolved into a multidimensional artistic universe.',
  },
  {
    id: 'sound',
    title: 'Sound Design',
    text: 'Melodic Techno is not just music—it\'s an emotional landscape. Every track is crafted to take listeners on a cinematic journey through carefully designed soundscapes.',
  },
  {
    id: 'vision',
    title: '3D Worlds',
    text: 'Using Unreal Engine and Blender, WYKILLA creates immersive 3D environments that complement the music. Visual storytelling meets sonic exploration.',
  },
  {
    id: 'future',
    title: 'AI Innovation',
    text: 'The future of creativity lies in the intersection of human intuition and artificial intelligence. WYKILLA\'s AI tools empower artists to push creative boundaries.',
  },
]
```

---

### Story 6.4: Implement Parallax Scrolling Background (5 SP)
**File**: Update `LoreSection.tsx`

**Acceptance Criteria**:
- Background image scrolls slower than content (parallax effect)
- GSAP ScrollTrigger for smooth parallax
- Performance-optimized (transform instead of position)

**Add to LoreSection.tsx**:
```typescript
const bgRef = useRef<HTMLDivElement>(null)
const { gsap, ScrollTrigger } = useGSAP()

useEffect(() => {
  if (!bgRef.current) return

  gsap.to(bgRef.current, {
    y: '30%',
    ease: 'none',
    scrollTrigger: {
      trigger: bgRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}, [gsap, ScrollTrigger])

// In JSX:
<div
  ref={bgRef}
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: `url(${assets.lore.background})` }}
/>
```

---

### Story 6.5: Add Timeline Visualization (8 SP)
**File**: `src/components/chapters/lore/Timeline.tsx`

**Acceptance Criteria**:
- Vertical timeline with milestones
- Animated line drawing on scroll
- Icon/year markers
- Glassmorphism milestone cards

**Implementation** (Simplified):
```typescript
'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'

const milestones = [
  { year: '2018', title: 'First Track', description: 'The journey begins' },
  { year: '2020', title: '3D Exploration', description: 'Discovering Unreal Engine' },
  { year: '2023', title: 'AI Tools Launch', description: 'Empowering creators' },
  { year: '2025', title: 'WYKILLA Universe', description: 'The complete experience' },
]

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null)
  const { gsap, ScrollTrigger } = useGSAP()

  useEffect(() => {
    if (!lineRef.current) return

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    )
  }, [gsap, ScrollTrigger])

  return (
    <div className="relative max-w-3xl mx-auto py-12">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-bordeaux/20">
        <div
          ref={lineRef}
          className="w-full h-full bg-gradient-to-b from-bordeaux to-magenta origin-top"
        />
      </div>

      {/* Milestones */}
      <div className="space-y-12">
        {milestones.map((m, i) => (
          <div
            key={m.year}
            className={`flex items-center gap-8 ${
              i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Year marker */}
            <div className="flex-1 text-right">
              <span className="font-display text-3xl font-bold text-bordeaux">
                {m.year}
              </span>
            </div>

            {/* Icon */}
            <div className="w-4 h-4 rounded-full bg-magenta border-4 border-ink z-10" />

            {/* Content */}
            <div className="flex-1">
              <h4 className="font-display text-xl font-bold mb-1">{m.title}</h4>
              <p className="text-white/70">{m.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### Story 6.6: Create Ambient Animation Overlay (5 SP)
**File**: `src/components/chapters/lore/AmbientOverlay.tsx`

**Acceptance Criteria**:
- Subtle animated gradient overlay
- Floating light particles (like dust in light)
- CSS animations or GSAP
- Low performance impact

---

### Story 6.7: Implement "Read More" Modal (3 SP)
**File**: `src/components/chapters/lore/LoreModal.tsx`

**Acceptance Criteria**:
- Modal component for expanded lore text
- Glassmorphism styling
- Close button + ESC key support
- Framer Motion for enter/exit animations

---

### Story 6.8: Integrate Lore Section into Main Page (2 SP)
**File**: Update `src/app/page.tsx`

**Acceptance Criteria**:
- Replace lore placeholder with `<LoreSection />`
- Import all lore components
- Verify scroll transitions

---

## 🎭 EPIC 8: OUTRO CHAPTER

**Emotional Journey**: Reflection & Call-to-Action
**Duration**: ~3 seconds scroll time
**Color**: Cyan (#4CC9F0)

### Story 8.1: Create Outro Section Layout (2 SP)
**File**: `src/components/chapters/outro/OutroSection.tsx`

**Acceptance Criteria**:
- Full-height section (100vh)
- Centered content
- Gradient background (ink to cyan)
- Simple, clean design

**Implementation**:
```typescript
'use client'

export default function OutroSection() {
  return (
    <section
      id="outro"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan/20 via-ink to-ink" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
          Ready to Create?
        </h2>
        <p className="text-xl md:text-2xl text-white/80 mb-12">
          Join the WYKILLA universe and start your creative journey today.
        </p>

        {/* CTA buttons will be added in Story 8.2 */}
      </div>
    </section>
  )
}
```

---

### Story 8.2: Add Call-to-Action Buttons (3 SP)
**File**: Update `OutroSection.tsx`

**Acceptance Criteria**:
- 2-3 CTA buttons (e.g., "Explore Tools", "Listen Now", "Join Waitlist")
- Use `<Button>` component from UI library
- Hover animations
- Link to respective sections or external URLs

**Implementation**:
```typescript
import { Button } from '@/components/ui'

// In JSX:
<div className="flex flex-wrap gap-4 justify-center">
  <Button variant="primary" size="lg" glow>
    Explore AI Tools
  </Button>
  <Button variant="secondary" size="lg">
    Listen on Spotify
  </Button>
  <Button variant="ghost" size="lg">
    Join Waitlist
  </Button>
</div>
```

---

### Story 8.3: Implement Newsletter Signup Form (5 SP)
**File**: `src/components/chapters/outro/NewsletterForm.tsx`

**Acceptance Criteria**:
- Email input + submit button
- Form validation (basic email check)
- Success/error states
- Glassmorphism card styling
- **Note**: Backend integration happens in Epic 9 (Agent 4), for now use placeholder submit handler

**Implementation**:
```typescript
'use client'

import { useState } from 'react'
import { Input, Button } from '@/components/ui'
import { GlassmorphCard } from '@/components/ui'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // TODO: Connect to API (Epic 9 - Agent 4 will implement)
    // For now: Placeholder
    setTimeout(() => {
      console.log('Newsletter signup:', email)
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <GlassmorphCard intensity="medium" className="max-w-md mx-auto mt-12">
      <h3 className="font-display text-2xl font-bold mb-4 text-center">
        Stay Updated
      </h3>
      <p className="text-white/70 mb-6 text-center">
        Get notified about new tracks, tools, and releases.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>

        {status === 'success' && (
          <p className="text-green-400 text-sm text-center">
            ✓ Thanks for subscribing!
          </p>
        )}
      </form>
    </GlassmorphCard>
  )
}
```

---

### Story 8.4: Add Social Media Links (2 SP)
**File**: `src/components/chapters/outro/SocialLinks.tsx`

**Acceptance Criteria**:
- Icons for Spotify, SoundCloud, Instagram, YouTube, etc.
- Import social URLs from `src/config/site.ts`
- Hover effects (scale + glow)
- Horizontal flex layout

**Implementation**:
```typescript
import { siteConfig } from '@/config/site'

const socials = [
  { name: 'Spotify', url: siteConfig.social.spotify, icon: '🎵' },
  { name: 'SoundCloud', url: siteConfig.social.soundcloud, icon: '☁️' },
  { name: 'Instagram', url: siteConfig.social.instagram, icon: '📷' },
  // Add more...
]

export default function SocialLinks() {
  return (
    <div className="flex gap-6 justify-center mt-12">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-cyan/20 hover:scale-110 transition-all duration-200"
          aria-label={social.name}
        >
          <span className="text-2xl">{social.icon}</span>
        </a>
      ))}
    </div>
  )
}
```

---

### Story 8.5: Implement Footer Credits (2 SP)
**File**: `src/components/chapters/outro/Footer.tsx`

**Acceptance Criteria**:
- Copyright notice
- "Made with ♥ by WYKILLA"
- Links to Privacy Policy, Terms (placeholder links for now)
- Small text, centered

**Implementation**:
```typescript
export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-white/50">
      <p className="mb-2">© 2025 WYKILLA. All rights reserved.</p>
      <p className="mb-4">Made with ♥ and AI</p>
      <div className="flex gap-4 justify-center">
        <a href="/privacy" className="hover:text-cyan transition-colors">
          Privacy Policy
        </a>
        <span>•</span>
        <a href="/terms" className="hover:text-cyan transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  )
}
```

---

### Story 8.6: Integrate Outro Section into Main Page (3 SP)
**File**: Update `src/app/page.tsx`

**Acceptance Criteria**:
- Replace outro placeholder with `<OutroSection />`
- Include all sub-components (NewsletterForm, SocialLinks, Footer)
- Verify it's the last section
- Test full-page scroll from Intro to Outro

**Implementation**:
```typescript
import OutroSection from '@/components/chapters/outro/OutroSection'

// In page.tsx:
<OutroSection />
```

---

## 🛠️ ENTWICKLUNGSRICHTLINIEN

### Code Standards
- **TypeScript**: Strict mode, alle Props typisiert
- **'use client'**: Alle Komponenten mit Hooks benötigen diese Direktive
- **Accessibility**: `aria-labels`, `alt` tags, keyboard navigation
- **Performance**: `useMemo`, `useCallback` wo sinnvoll, lazy loading für Images

### Naming Conventions
```typescript
// Komponenten: PascalCase
HeroSection.tsx
LoreCard.tsx

// Hooks: camelCase mit 'use' Prefix
useLenis.ts
useGSAP.ts

// Utilities: camelCase
cn()
getPlaceholderStatus()

// Config: camelCase objects
assets.hero.logo
chapters[0].id
```

### Import Order
```typescript
// 1. React
import { useEffect, useRef } from 'react'

// 2. Next.js
import Image from 'next/image'

// 3. Third-party
import { motion } from 'framer-motion'
import gsap from 'gsap'

// 4. Hooks
import { useLenis } from '@/hooks/useLenis'

// 5. Components
import { Button } from '@/components/ui'

// 6. Config/Utils
import { assets } from '@/config/assets'
import { cn } from '@/lib/utils'

// 7. Types
import type { ChapterProps } from '@/types/chapter'
```

### Animation Best Practices
```typescript
// ✅ IMMER prefers-reduced-motion checken
const prefersReducedMotion = useReducedMotion()

if (prefersReducedMotion) {
  // Keine Animationen ODER instant transitions
  return
}

// ✅ GSAP Cleanup
useEffect(() => {
  const tl = gsap.timeline()
  // ... animations

  return () => {
    tl.kill() // Cleanup!
  }
}, [])

// ✅ ScrollTrigger Cleanup
ScrollTrigger.create({
  // ...
  onLeave: () => {
    // Cleanup if needed
  }
})
```

---

## 📦 GIT WORKFLOW

### Branch
```bash
claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

### Commit Messages
```bash
# Format:
feat: <kurze Beschreibung> (Story X.Y)

<Detaillierte Beschreibung was gemacht wurde>

# Beispiel:
git commit -m "feat: create hero section component (Story 1.1)

Implemented full-screen hero section with:
- Centered WYKILLA logo (placeholder)
- Tagline with brand colors
- Fade-in animation with Framer Motion
- Respects prefers-reduced-motion
- Scroll indicator animation"
```

### Push Command
```bash
git push -u origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

### Workflow pro Story
```bash
# 1. Implementiere die Story
# 2. Teste TypeScript
npx tsc --noEmit

# 3. Committe
git add -A
git commit -m "feat: <description> (Story X.Y)"

# 4. Pushe
git push -u origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

---

## ✅ COMPLETION CHECKLIST

### Epic 1 (Intro/Hero)
- [ ] Story 1.1: HeroSection component
- [ ] Story 1.2: LogoAnimation component
- [ ] Story 1.3: ParticleBackground component
- [ ] Story 1.4: ScrollRevealText component
- [ ] Story 1.5: Integration in page.tsx
- [ ] TypeScript compilation OK
- [ ] All commits pushed

### Epic 6 (Lore)
- [ ] Story 6.1: LoreSection layout
- [ ] Story 6.2: LoreCard component
- [ ] Story 6.3: Lore content config
- [ ] Story 6.4: Parallax background
- [ ] Story 6.5: Timeline visualization
- [ ] Story 6.6: Ambient overlay
- [ ] Story 6.7: Read More modal
- [ ] Story 6.8: Integration in page.tsx
- [ ] TypeScript compilation OK
- [ ] All commits pushed

### Epic 8 (Outro)
- [ ] Story 8.1: OutroSection layout
- [ ] Story 8.2: CTA buttons
- [ ] Story 8.3: Newsletter form
- [ ] Story 8.4: Social links
- [ ] Story 8.5: Footer credits
- [ ] Story 8.6: Integration in page.tsx
- [ ] TypeScript compilation OK
- [ ] All commits pushed

---

## 🚀 LOS GEHT'S!

1. **Clone das Repo** (falls noch nicht geschehen)
2. **Checkout Branch**: `claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg`
3. **Install Dependencies**: `npm install`
4. **Start mit Epic 1, Story 1.1**
5. **Arbeite sequenziell durch alle Stories**
6. **Committe & pushe nach jeder Story**
7. **Teste regelmäßig mit**: `npx tsc --noEmit` und `npm run dev`

**KEINE FRAGEN STELLEN - ALLE INFORMATIONEN SIND HIER!**

Bei Unsicherheiten: Folge den Code-Beispielen exakt wie oben angegeben.

Viel Erfolg! 🎉
