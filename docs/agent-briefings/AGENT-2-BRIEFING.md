# AGENT 2 BRIEFING - Epic 3, 7 (Music, Merch/Community)

## ⚠️ WICHTIG: KEINE FRAGEN STELLEN

Dieses Briefing enthält ALLE Informationen für die Implementierung. Alle Entscheidungen sind getroffen. **Stelle KEINE Fragen** - implementiere direkt gemäß den Spezifikationen unten.

---

## 🎯 DEINE AUFGABE

Du implementierst **2 Epics** parallel zur Arbeit anderer Agenten:

- **Epic 3**: Music Chapter (8 Stories, 34 SP)
- **Epic 7**: Merch / Community Chapter (7 Stories, 25 SP)

**Total**: 15 Stories, 59 Story Points

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
  "audio": "Howler.js",
  "icons": "Lucide React (oder SVG)"
}
```

### Brand Colors
```typescript
colors: {
  cyan: '#4CC9F0',      // Primary accent
  magenta: '#FF3AC0',   // Secondary accent - Music theme
  gold: '#FFD580',      // Highlight - Merch theme
  bordeaux: '#6C002A',  // Dark accent
  ink: '#0A0A0F',       // Background
}
```

---

## 📁 DATEISYSTEM-STRUKTUR

```
src/
├── app/
│   ├── layout.tsx          ✅ Fertig
│   ├── page.tsx            ✅ Fertig (Placeholder-Sections)
│   └── globals.css         ✅ Fertig
├── components/
│   ├── chapters/
│   │   ├── music/          ← DU ERSTELLST HIER: Epic 3
│   │   └── merch/          ← DU ERSTELLST HIER: Epic 7
│   ├── layout/             ✅ Fertig
│   └── ui/                 ✅ Fertig (Button, Card, GlassmorphCard, Input)
├── hooks/                  ✅ Fertig
├── config/                 ✅ Fertig (assets.ts, chapters.ts, site.ts)
├── types/                  ✅ Fertig (audio.ts enthält AudioTrack interface!)
└── lib/
    └── utils.ts            ✅ Fertig
```

### Assets (alle Placeholder)
```typescript
import { assets } from '@/config/assets'

// Music Assets
assets.music.tracks[0]       // Placeholder Track 01 (AudioTrack object)
assets.music.tracks[1]       // Placeholder Track 02
assets.music.tracks[2]       // Placeholder Track 03

// Merch Assets
assets.merch.products[0]     // T-Shirt placeholder
assets.merch.products[1]     // Cap placeholder
assets.merch.products[2]     // Print placeholder
assets.merch.products[3]     // Poster placeholder
```

### Audio Types (bereits definiert!)
```typescript
// In src/types/audio.ts:
interface AudioTrack {
  id: string
  title: string
  artist: string
  mp3: string
  ogg?: string
  duration: number
  isPlaceholder: boolean
  artwork?: string
}

interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  currentTrack: AudioTrack | null
}
```

---

## 🎵 EPIC 3: MUSIC CHAPTER

**Emotional Journey**: Euphoric Energy
**Duration**: ~5 seconds scroll time (LONGEST chapter!)
**Color**: Magenta (#FF3AC0)

### Story 3.1: Create Music Section Layout (3 SP)
**File**: `src/components/chapters/music/MusicSection.tsx`

**Acceptance Criteria**:
- Full-height section (min-h-screen)
- Dark background with magenta gradient accents
- Grid layout for tracks + featured player
- Sticky audio player (stays visible while scrolling)

**Implementation**:
```typescript
'use client'

import { useState } from 'react'
import { assets } from '@/config/assets'
import type { AudioTrack } from '@/types/audio'

export default function MusicSection() {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)

  return (
    <section
      id="music"
      className="relative min-h-screen py-20 bg-gradient-to-b from-ink via-magenta/10 to-ink"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-magenta to-cyan bg-clip-text text-transparent">
            Music
          </span>
        </h2>

        <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
          Cinematic soundscapes crafted to take you on an emotional journey.
          Each track tells a story.
        </p>

        {/* Track grid will be added in Story 3.2 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* TrackCard components */}
        </div>

        {/* Audio player will be added in Story 3.3 */}
        {currentTrack && (
          <div className="sticky bottom-8">
            {/* AudioPlayer component */}
          </div>
        )}
      </div>
    </section>
  )
}
```

---

### Story 3.2: Create Track Card Component (5 SP)
**File**: `src/components/chapters/music/TrackCard.tsx`

**Acceptance Criteria**:
- Card with artwork, title, duration
- Play button overlay
- Hover effect (scale + glow)
- Click to play/pause
- Waveform visualization (placeholder or simple bars)

**Implementation**:
```typescript
'use client'

import { Card } from '@/components/ui'
import type { AudioTrack } from '@/types/audio'
import Image from 'next/image'

interface TrackCardProps {
  track: AudioTrack
  isPlaying: boolean
  onPlay: () => void
}

export default function TrackCard({ track, isPlaying, onPlay }: TrackCardProps) {
  return (
    <Card
      hover
      className="group cursor-pointer relative overflow-hidden"
      onClick={onPlay}
    >
      {/* Artwork */}
      <div className="relative h-48 bg-gradient-to-br from-magenta/20 to-cyan/20 mb-4 rounded-lg overflow-hidden">
        {track.artwork ? (
          <Image
            src={track.artwork}
            alt={track.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🎵</span>
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-magenta flex items-center justify-center glow-magenta">
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" /* Pause icon */>
                <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" fill="currentColor" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" /* Play icon */>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Track info */}
      <h3 className="font-display text-xl font-bold mb-1">{track.title}</h3>
      <p className="text-white/60 text-sm">{track.artist}</p>
      <p className="text-white/40 text-xs mt-2">
        {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
      </p>
    </Card>
  )
}
```

---

### Story 3.3: Implement Audio Player with Howler.js (8 SP)
**File**: `src/components/chapters/music/AudioPlayer.tsx`

**Acceptance Criteria**:
- Howler.js integration für audio playback
- Play/pause, seek, volume controls
- Progress bar (clickable to seek)
- Current time / total time display
- Glassmorphism styling

**Implementation**:
```typescript
'use client'

import { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'
import { GlassmorphCard, Button } from '@/components/ui'
import type { AudioTrack } from '@/types/audio'

interface AudioPlayerProps {
  track: AudioTrack
  onEnded?: () => void
}

export default function AudioPlayer({ track, onEnded }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const soundRef = useRef<Howl | null>(null)
  const animationRef = useRef<number>()

  // Initialize Howler
  useEffect(() => {
    soundRef.current = new Howl({
      src: [track.mp3],
      html5: true,
      volume: volume,
      onend: () => {
        setIsPlaying(false)
        setCurrentTime(0)
        onEnded?.()
      },
    })

    return () => {
      soundRef.current?.unload()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [track, volume, onEnded])

  // Update current time
  useEffect(() => {
    if (!isPlaying) return

    const updateTime = () => {
      if (soundRef.current) {
        setCurrentTime(soundRef.current.seek() as number)
      }
      animationRef.current = requestAnimationFrame(updateTime)
    }

    animationRef.current = requestAnimationFrame(updateTime)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (!soundRef.current) return

    if (isPlaying) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!soundRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const time = percent * track.duration
    soundRef.current.seek(time)
    setCurrentTime(time)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  return (
    <GlassmorphCard intensity="high" glow className="p-6">
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button variant="primary" size="md" glow onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        {/* Track Info */}
        <div className="flex-1">
          <p className="font-display font-bold">{track.title}</p>
          <p className="text-sm text-white/60">{track.artist}</p>
        </div>

        {/* Time */}
        <div className="text-sm text-white/80">
          {formatTime(currentTime)} / {formatTime(track.duration)}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="mt-4 h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-gradient-to-r from-magenta to-cyan transition-all"
          style={{ width: `${(currentTime / track.duration) * 100}%` }}
        />
      </div>

      {/* Volume Control */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm text-white/60">Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const vol = parseFloat(e.target.value)
            setVolume(vol)
            soundRef.current?.volume(vol)
          }}
          className="flex-1"
        />
      </div>
    </GlassmorphCard>
  )
}
```

---

### Story 3.4: Add Waveform Visualization (8 SP)
**File**: `src/components/chapters/music/Waveform.tsx`

**Acceptance Criteria**:
- Canvas-based waveform visualization
- Syncs with audio playback
- Animated bars that pulse with music
- **Simplified**: Use placeholder bars with random heights for now (real audio analysis can be added later)

**Implementation (Simplified)**:
```typescript
'use client'

import { useEffect, useRef } from 'react'

interface WaveformProps {
  isPlaying: boolean
  currentTime: number
  duration: number
}

export default function Waveform({ isPlaying, currentTime, duration }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const barCount = 100
    const barWidth = width / barCount
    const progress = currentTime / duration

    ctx.clearRect(0, 0, width, height)

    // Draw bars
    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * height * 0.8
      const isPassed = i / barCount < progress

      ctx.fillStyle = isPassed
        ? 'rgba(255, 58, 192, 0.8)' // magenta
        : 'rgba(255, 255, 255, 0.2)'

      ctx.fillRect(
        i * barWidth,
        height / 2 - barHeight / 2,
        barWidth - 2,
        barHeight
      )
    }
  }, [currentTime, duration])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={100}
      className="w-full h-24 rounded-lg"
    />
  )
}
```

---

### Story 3.5: Implement Track Playlist Logic (3 SP)
**File**: Update `MusicSection.tsx`

**Acceptance Criteria**:
- Track state management (current track, playing state)
- Auto-play next track when current ends
- Highlight currently playing track

**Implementation**:
```typescript
const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null)
const [isPlaying, setIsPlaying] = useState(false)

const tracks = assets.music.tracks

const handlePlayTrack = (index: number) => {
  if (currentTrackIndex === index) {
    setIsPlaying(!isPlaying)
  } else {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
  }
}

const handleTrackEnded = () => {
  const nextIndex = currentTrackIndex !== null ? (currentTrackIndex + 1) % tracks.length : 0
  setCurrentTrackIndex(nextIndex)
  setIsPlaying(true)
}
```

---

### Story 3.6: Add Spotify/SoundCloud Links (2 SP)
**File**: `src/components/chapters/music/StreamingLinks.tsx`

**Acceptance Criteria**:
- Buttons linking to Spotify, SoundCloud, etc.
- Import URLs from `siteConfig.social`
- Icon + text layout

**Implementation**:
```typescript
import { Button } from '@/components/ui'
import { siteConfig } from '@/config/site'

export default function StreamingLinks() {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-12">
      <Button
        variant="secondary"
        size="md"
        onClick={() => window.open(siteConfig.social.spotify, '_blank')}
      >
        🎵 Spotify
      </Button>
      <Button
        variant="secondary"
        size="md"
        onClick={() => window.open(siteConfig.social.soundcloud, '_blank')}
      >
        ☁️ SoundCloud
      </Button>
    </div>
  )
}
```

---

### Story 3.7: Implement Scroll-Triggered Album Art Animation (3 SP)
**File**: Update `MusicSection.tsx`

**Acceptance Criteria**:
- Album artworks fade in + scale on scroll
- Stagger effect (one by one)
- GSAP ScrollTrigger

**Implementation**:
```typescript
const cardsRef = useRef<HTMLDivElement>(null)
const { gsap, ScrollTrigger } = useGSAP()

useEffect(() => {
  if (!cardsRef.current) return

  const cards = cardsRef.current.querySelectorAll('.track-card')

  gsap.fromTo(
    cards,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 70%',
      },
    }
  )
}, [gsap, ScrollTrigger])
```

---

### Story 3.8: Integrate Music Section into Main Page (2 SP)
**File**: Update `src/app/page.tsx`

**Acceptance Criteria**:
- Replace music placeholder with `<MusicSection />`
- Import all music components
- Verify audio playback works

---

## 🛍️ EPIC 7: MERCH / COMMUNITY CHAPTER

**Emotional Journey**: Connection & Belonging
**Duration**: ~3 seconds scroll time
**Color**: Gold (#FFD580) + Magenta accents

### Story 7.1: Create Merch Section Layout (3 SP)
**File**: `src/components/chapters/merch/MerchSection.tsx`

**Acceptance Criteria**:
- Grid layout for products (2x2 or 3x3)
- Gold gradient background accents
- "Coming Soon" badge if feature flag disabled

**Implementation**:
```typescript
'use client'

import { assets } from '@/config/assets'

export default function MerchSection() {
  const products = assets.merch.products

  return (
    <section
      id="merch"
      className="relative min-h-screen py-20 bg-gradient-to-b from-ink via-gold/10 to-ink"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-gold to-magenta bg-clip-text text-transparent">
            Merch & Community
          </span>
        </h2>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((product) => (
            <div key={product.id}>
              {/* ProductCard component - Story 7.2 */}
            </div>
          ))}
        </div>

        {/* Community section - Story 7.4 */}
      </div>
    </section>
  )
}
```

---

### Story 7.2: Create Product Card Component (5 SP)
**File**: `src/components/chapters/merch/ProductCard.tsx`

**Acceptance Criteria**:
- Product image, name, price
- "Buy Now" button (placeholder link for now)
- Hover effect (lift + glow)
- Glassmorphism card styling

**Implementation**:
```typescript
'use client'

import { Card, Button } from '@/components/ui'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    id: string
    name: string
    image: string
    price: number
    isPlaceholder: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      hover
      gradient
      className="overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gold/10 mb-4 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.isPlaceholder && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-gold/80 text-ink text-xs font-bold rounded-full">
            PLACEHOLDER
          </div>
        )}
      </div>

      {/* Product Info */}
      <h3 className="font-display text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-2xl font-bold text-gold mb-4">€{product.price}</p>

      {/* Buy Button */}
      <Button variant="primary" fullWidth glow>
        Buy Now
      </Button>
    </Card>
  )
}
```

---

### Story 7.3: Add "Coming Soon" Overlay (2 SP)
**File**: `src/components/chapters/merch/ComingSoon.tsx`

**Acceptance Criteria**:
- Overlay message if merch not available yet
- "Join Waitlist" button
- Conditional rendering based on feature flag

**Implementation**:
```typescript
import { GlassmorphCard, Button } from '@/components/ui'

export default function ComingSoon() {
  return (
    <GlassmorphCard intensity="high" className="text-center py-12">
      <h3 className="font-display text-3xl font-bold mb-4">Coming Soon!</h3>
      <p className="text-white/80 mb-6">
        Exclusive WYKILLA merch is on the way. Join the waitlist to be notified.
      </p>
      <Button variant="primary" size="lg" glow>
        Join Waitlist
      </Button>
    </GlassmorphCard>
  )
}
```

---

### Story 7.4: Create Community Section (5 SP)
**File**: `src/components/chapters/merch/CommunitySection.tsx`

**Acceptance Criteria**:
- Discord invite link
- Instagram feed placeholder
- "Join the Community" CTA

**Implementation**:
```typescript
import { GlassmorphCard, Button } from '@/components/ui'

export default function CommunitySection() {
  return (
    <div className="max-w-4xl mx-auto">
      <GlassmorphCard intensity="medium" className="text-center p-12">
        <h3 className="font-display text-4xl font-bold mb-4">
          Join the WYKILLA Community
        </h3>
        <p className="text-xl text-white/80 mb-8">
          Connect with fellow creators, get exclusive updates, and share your journey.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="lg" glow>
            💬 Join Discord
          </Button>
          <Button variant="secondary" size="lg">
            📷 Follow on Instagram
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
          <div>
            <p className="text-3xl font-bold text-gold">1.2K+</p>
            <p className="text-white/60 text-sm">Community Members</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-magenta">50+</p>
            <p className="text-white/60 text-sm">Weekly Events</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan">24/7</p>
            <p className="text-white/60 text-sm">Support</p>
          </div>
        </div>
      </GlassmorphCard>
    </div>
  )
}
```

---

### Story 7.5: Implement Product Image Gallery (5 SP)
**File**: `src/components/chapters/merch/ProductGallery.tsx`

**Acceptance Criteria**:
- Lightbox modal for product images
- Image carousel (multiple views)
- Framer Motion for modal animations

**Implementation** (Simplified):
```typescript
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrentIndex(i)
              setIsOpen(true)
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image src={img} alt={`${productName} ${i + 1}`} width={100} height={100} />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={images[currentIndex]}
              alt={productName}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

### Story 7.6: Add Testimonials Section (3 SP)
**File**: `src/components/chapters/merch/Testimonials.tsx`

**Acceptance Criteria**:
- 3-4 community testimonials (placeholder text)
- Avatar + quote + name
- Carousel or grid layout

**Implementation**:
```typescript
import { GlassmorphCard } from '@/components/ui'

const testimonials = [
  {
    quote: "WYKILLA's music changed my creative workflow. Pure inspiration!",
    name: 'Alex M.',
    avatar: '👤',
  },
  {
    quote: 'The AI tools are game-changers for producers. Highly recommend!',
    name: 'Sarah K.',
    avatar: '👩‍🎤',
  },
  {
    quote: 'Best community for electronic music creators. So supportive!',
    name: 'Marcus L.',
    avatar: '🎵',
  },
]

export default function Testimonials() {
  return (
    <div className="mt-16">
      <h3 className="font-display text-3xl font-bold mb-8 text-center">
        What the Community Says
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <GlassmorphCard key={i} intensity="low" className="p-6">
            <p className="text-lg italic mb-4">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{t.avatar}</span>
              <p className="font-bold text-gold">{t.name}</p>
            </div>
          </GlassmorphCard>
        ))}
      </div>
    </div>
  )
}
```

---

### Story 7.7: Integrate Merch Section into Main Page (2 SP)
**File**: Update `src/app/page.tsx`

**Acceptance Criteria**:
- Replace merch placeholder with `<MerchSection />`
- Import all merch components
- Verify product cards render correctly

---

## 🛠️ ENTWICKLUNGSRICHTLINIEN

### Code Standards
- **TypeScript**: Strict mode, alle Props typisiert
- **'use client'**: Alle Komponenten mit Hooks oder Audio benötigen diese Direktive
- **Accessibility**: `aria-labels`, keyboard navigation für audio controls
- **Performance**: Lazy load product images, optimize audio loading

### Howler.js Best Practices
```typescript
// ✅ Always cleanup
useEffect(() => {
  const sound = new Howl({ /* ... */ })

  return () => {
    sound.unload() // WICHTIG!
  }
}, [])

// ✅ Check if sound is loaded
if (sound.state() === 'loaded') {
  sound.play()
}
```

### Audio Player Patterns
```typescript
// ✅ Use refs for Howl instances
const soundRef = useRef<Howl | null>(null)

// ✅ Update UI in sync with audio
const updateTime = () => {
  if (soundRef.current) {
    setCurrentTime(soundRef.current.seek() as number)
  }
  requestAnimationFrame(updateTime)
}
```

---

## 📦 GIT WORKFLOW

### Commit pro Story
```bash
git add -A
git commit -m "feat: <description> (Story X.Y)

<Detaillierte Beschreibung>"

git push -u origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

---

## ✅ COMPLETION CHECKLIST

### Epic 3 (Music)
- [ ] Story 3.1: MusicSection layout
- [ ] Story 3.2: TrackCard component
- [ ] Story 3.3: AudioPlayer with Howler.js
- [ ] Story 3.4: Waveform visualization
- [ ] Story 3.5: Playlist logic
- [ ] Story 3.6: Streaming links
- [ ] Story 3.7: Scroll-triggered animations
- [ ] Story 3.8: Integration in page.tsx

### Epic 7 (Merch/Community)
- [ ] Story 7.1: MerchSection layout
- [ ] Story 7.2: ProductCard component
- [ ] Story 7.3: Coming Soon overlay
- [ ] Story 7.4: CommunitySection
- [ ] Story 7.5: ProductGallery
- [ ] Story 7.6: Testimonials
- [ ] Story 7.7: Integration in page.tsx

---

## 🚀 LOS GEHT'S!

**Starte mit Epic 3, Story 3.1** und arbeite sequenziell durch.

**KEINE FRAGEN STELLEN - ALLE INFORMATIONEN SIND HIER!**

Viel Erfolg! 🎉
