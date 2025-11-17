# AGENT 3 BRIEFING - Epic 4, 2 (3D World, Hub)

## ⚠️ WICHTIG: KEINE FRAGEN STELLEN

Dieses Briefing enthält ALLE Informationen für die Implementierung. Alle Entscheidungen sind getroffen. **Stelle KEINE Fragen** - implementiere direkt gemäß den Spezifikationen unten.

---

## 🎯 DEINE AUFGABE

Du implementierst **2 Epics** parallel zur Arbeit anderer Agenten:

- **Epic 4**: 3D World Chapter (8 Stories, 40 SP) - KOMPLEX!
- **Epic 2**: Hub Chapter (6 Stories, 24 SP)

**Total**: 14 Stories, 64 Story Points

---

## 📋 PROJEKTKONTEXT

### Git-Branch
```bash
claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

### Projekt: WYKILLA Website
Cinematic, scroll-driven Next.js 15 Website mit 3D-Elementen.

### Epic 0 (Foundation) - BEREITS FERTIG ✅
- Next.js 15 + TypeScript + Tailwind CSS
- **React Three Fiber (R3F) + Drei** - für 3D installiert!
- Lenis Smooth Scrolling + GSAP ScrollTrigger
- Alle Hooks, UI Components, Layout, Navigation

### Technischer Stack
```json
{
  "framework": "Next.js 15 (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "3D": "React Three Fiber (@react-three/fiber) + Drei (@react-three/drei)",
  "animation": "GSAP + ScrollTrigger, Framer Motion",
  "scroll": "Lenis"
}
```

### Brand Colors
```typescript
colors: {
  cyan: '#4CC9F0',      // Primary - World theme
  magenta: '#FF3AC0',   // Secondary
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
│   ├── page.tsx            ✅ Fertig (Placeholder-Sections)
│   └── globals.css         ✅ Fertig
├── components/
│   ├── chapters/
│   │   ├── world/          ← DU ERSTELLST HIER: Epic 4 (3D World)
│   │   └── hub/            ← DU ERSTELLST HIER: Epic 2 (Hub)
│   ├── layout/             ✅ Fertig
│   └── ui/                 ✅ Fertig
├── hooks/                  ✅ Fertig
├── config/
│   ├── assets.ts           ✅ Fertig (enthält world.usePlaceholder: true)
│   └── chapters.ts         ✅ Fertig
└── types/                  ✅ Fertig
```

### Assets
```typescript
import { assets } from '@/config/assets'

// World Assets
assets.world.sceneModel      // '/models/world_scene.glb'
assets.world.usePlaceholder  // true - Use procedural geometry!

// Hub Assets
assets.hub.thumbnails[0]     // Music thumbnail
assets.hub.thumbnails[1]     // World thumbnail
assets.hub.thumbnails[2]     // Tools thumbnail
// ... etc (6 total)
```

---

## 🌐 EPIC 4: 3D WORLD CHAPTER

**Emotional Journey**: Awe & Exploration
**Duration**: ~4 seconds scroll time
**Color**: Cyan (#4CC9F0)

**WICHTIG**: Da keine echten 3D-Modelle vorhanden sind (`assets.world.usePlaceholder: true`), verwende **procedural geometry** mit R3F (Boxen, Kugeln, Torus, etc.) für eine abstrakte 3D-Szene!

### Story 4.1: Setup React Three Fiber Canvas (5 SP)
**File**: `src/components/chapters/world/WorldSection.tsx`

**Acceptance Criteria**:
- R3F `<Canvas>` component
- Full-height section (h-screen)
- Camera setup (perspective)
- Basic lighting (ambient + directional)
- Dark background matching brand

**Implementation**:
```typescript
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export default function WorldSection() {
  return (
    <section id="world" className="relative h-screen overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Canvas>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#4CC9F0" />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#FF3AC0" />

          {/* Controls (optional - allows user to rotate camera) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />

          {/* 3D Scene will be added in Story 4.2 */}
        </Canvas>
      </div>

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h2 className="font-display text-6xl md:text-8xl font-bold text-center">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            3D Universe
          </span>
        </h2>
      </div>
    </section>
  )
}
```

---

### Story 4.2: Create Procedural 3D Scene (8 SP)
**File**: `src/components/chapters/world/ProceduralScene.tsx`

**Acceptance Criteria**:
- Multiple geometric shapes (Box, Sphere, Torus, Cone, etc.)
- Positioned in 3D space (abstract composition)
- Brand color materials (cyan, magenta, gold)
- Emissive materials (glowing effect)

**Implementation**:
```typescript
'use client'

import { useRef } from 'react'
import { Mesh } from 'three'

export default function ProceduralScene() {
  return (
    <group>
      {/* Central Sphere - Cyan glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4CC9F0"
          emissive="#4CC9F0"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Torus - Magenta */}
      <mesh position={[2.5, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <torusGeometry args={[0.8, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#FF3AC0"
          emissive="#FF3AC0"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Floating Boxes - Gold */}
      <mesh position={[-2, 1.5, -1]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#FFD580"
          emissive="#FFD580"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[-2.5, -1, 0.5]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#FFD580"
          emissive="#FFD580"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cone - Bordeaux */}
      <mesh position={[1.5, -1.5, -2]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 1.5, 32]} />
        <meshStandardMaterial
          color="#6C002A"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Icosahedron - Cyan */}
      <mesh position={[0, 2, -3]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#4CC9F0"
          wireframe
        />
      </mesh>
    </group>
  )
}
```

---

### Story 4.3: Implement Auto-Rotation Animation (5 SP)
**File**: Update `ProceduralScene.tsx`

**Acceptance Criteria**:
- All objects rotate slowly
- Different rotation speeds for variety
- Use `useFrame` hook from R3F
- Respects `prefers-reduced-motion`

**Implementation**:
```typescript
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ProceduralScene() {
  const sphereRef = useRef<Mesh>(null)
  const torusRef = useRef<Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const prefersReducedMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (prefersReducedMotion) return

    // Rotate sphere
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.3
      sphereRef.current.rotation.x += delta * 0.1
    }

    // Rotate torus
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.5
      torusRef.current.rotation.z += delta * 0.3
    }

    // Rotate entire group slowly
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        {/* ... sphere geometry */}
      </mesh>

      <mesh ref={torusRef} position={[2.5, 0, 0]}>
        {/* ... torus geometry */}
      </mesh>

      {/* ... other shapes */}
    </group>
  )
}
```

---

### Story 4.4: Add Particle Field Background (8 SP)
**File**: `src/components/chapters/world/ParticleField.tsx`

**Acceptance Criteria**:
- 500-1000 floating particles
- Use `<Points>` from Drei
- Random positions in 3D space
- Slow drift animation
- Brand colors (cyan/magenta/gold mix)

**Implementation**:
```typescript
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  // Generate random particle positions
  const particles = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // z
    }

    return positions
  }, [])

  // Animate particles
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4CC9F0"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}
```

---

### Story 4.5: Implement Camera Animation on Scroll (8 SP)
**File**: `src/components/chapters/world/ScrollCamera.tsx`

**Acceptance Criteria**:
- Camera position/rotation changes based on scroll
- Use GSAP ScrollTrigger to sync with scroll position
- Smooth interpolation
- Camera moves through the 3D scene

**Implementation**:
```typescript
'use client'

import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollCamera() {
  const { camera } = useThree()
  const cameraRef = useRef(camera)

  useEffect(() => {
    const section = document.getElementById('world')
    if (!section) return

    gsap.to(cameraRef.current.position, {
      z: 2,
      x: 2,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to(cameraRef.current.rotation, {
      y: Math.PI / 4,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null // This component doesn't render anything
}
```

Add to `WorldSection.tsx`:
```typescript
<Canvas>
  <ScrollCamera />
  {/* ... rest */}
</Canvas>
```

---

### Story 4.6: Add Post-Processing Effects (3 SP)
**File**: Update `WorldSection.tsx`

**Acceptance Criteria**:
- Bloom effect for glowing objects
- Use `@react-three/postprocessing` (optional, kann auch weggelassen werden wenn zu komplex)
- **SIMPLIFIED**: Just use emissive materials (already done in Story 4.2)

**Implementation**: SKIP oder verwende `EffectComposer` von `@react-three/postprocessing`:
```typescript
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// In Canvas:
<EffectComposer>
  <Bloom
    intensity={0.5}
    luminanceThreshold={0.8}
    luminanceSmoothing={0.9}
  />
</EffectComposer>
```

---

### Story 4.7: Create Interactive Hover Effects (3 SP)
**File**: Update `ProceduralScene.tsx`

**Acceptance Criteria**:
- Objects scale up on hover
- Color shift on hover
- Pointer cursor change

**Implementation**:
```typescript
const [hovered, setHovered] = useState(false)

<mesh
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
  scale={hovered ? 1.2 : 1}
>
  <sphereGeometry />
  <meshStandardMaterial
    color={hovered ? '#FF3AC0' : '#4CC9F0'}
    emissive={hovered ? '#FF3AC0' : '#4CC9F0'}
  />
</mesh>
```

---

### Story 4.8: Integrate World Section into Main Page (2 SP)
**File**: Update `src/app/page.tsx`

**Acceptance Criteria**:
- Replace world placeholder with `<WorldSection />`
- Import all 3D components
- Verify 3D scene renders correctly

---

## 🎨 EPIC 2: HUB CHAPTER

**Emotional Journey**: Discovery & Direction
**Duration**: ~3 seconds scroll time
**Color**: Cyan + Multiple accents (chapter colors)

**KONZEPT**: Hub ist das "Inhaltsverzeichnis" mit 6 Thumbnails zu allen Hauptkapiteln (Music, World, Tools, Lore, Merch, Outro)

### Story 2.1: Create Hub Section Layout (3 SP)
**File**: `src/components/chapters/hub/HubSection.tsx`

**Acceptance Criteria**:
- Full-height section (min-h-screen)
- Centered title "Explore"
- Grid layout for chapter thumbnails (2x3 oder 3x2)
- Dark background with subtle gradient

**Implementation**:
```typescript
'use client'

import { assets } from '@/config/assets'
import { chapters } from '@/config/chapters'

export default function HubSection() {
  // Filter relevant chapters (exclude intro and hub itself)
  const hubChapters = chapters.filter(
    (ch) => !['intro', 'hub'].includes(ch.id)
  )

  return (
    <section
      id="hub"
      className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-ink via-cyan/5 to-ink"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            Explore
          </span>
        </h2>

        {/* Thumbnail grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hubChapters.map((chapter) => (
            <div key={chapter.id}>
              {/* ChapterThumbnail component - Story 2.2 */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### Story 2.2: Create Chapter Thumbnail Component (5 SP)
**File**: `src/components/chapters/hub/ChapterThumbnail.tsx`

**Acceptance Criteria**:
- Large clickable card
- Chapter thumbnail image from assets
- Chapter title + emotion text
- Hover effect (scale + glow in chapter color)
- Click scrolls to chapter section (use `useLenis`)

**Implementation**:
```typescript
'use client'

import { Card } from '@/components/ui'
import { useLenis } from '@/hooks/useLenis'
import type { ChapterMetadata } from '@/types/chapter'
import Image from 'next/image'

interface ChapterThumbnailProps {
  chapter: ChapterMetadata
  thumbnailSrc: string
}

export default function ChapterThumbnail({
  chapter,
  thumbnailSrc,
}: ChapterThumbnailProps) {
  const { scrollTo } = useLenis()

  const handleClick = () => {
    scrollTo(`#${chapter.id}`, { offset: -80, duration: 1.5 })
  }

  return (
    <Card
      hover
      className="group cursor-pointer overflow-hidden relative h-80"
      onClick={handleClick}
    >
      {/* Thumbnail Image */}
      <div className="relative h-full">
        <Image
          src={thumbnailSrc}
          alt={chapter.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent"
          style={{
            background: `linear-gradient(to top, rgba(10, 10, 15, 0.95), transparent), linear-gradient(135deg, ${chapter.color}20, transparent)`,
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3
            className="font-display text-3xl font-bold mb-2"
            style={{ color: chapter.color }}
          >
            {chapter.name}
          </h3>
          <p className="text-white/70 text-sm">{chapter.emotion}</p>
        </div>

        {/* Hover indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: chapter.color,
              boxShadow: `0 0 20px ${chapter.color}80`,
            }}
          >
            <svg className="w-6 h-6 text-white" /* Arrow icon */>
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth={2} fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  )
}
```

---

### Story 2.3: Implement Thumbnail Grid Animation (5 SP)
**File**: Update `HubSection.tsx`

**Acceptance Criteria**:
- Thumbnails fade in + scale on scroll
- Stagger effect (one by one)
- GSAP ScrollTrigger

**Implementation**:
```typescript
const gridRef = useRef<HTMLDivElement>(null)
const { gsap, ScrollTrigger } = useGSAP()

useEffect(() => {
  if (!gridRef.current) return

  const thumbnails = gridRef.current.querySelectorAll('.chapter-thumbnail')

  gsap.fromTo(
    thumbnails,
    { opacity: 0, scale: 0.8, y: 40 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 70%',
      },
    }
  )
}, [gsap, ScrollTrigger])

// In JSX:
<div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {hubChapters.map((chapter) => (
    <div key={chapter.id} className="chapter-thumbnail">
      <ChapterThumbnail /* ... */ />
    </div>
  ))}
</div>
```

---

### Story 2.4: Add "What to Expect" Text Blocks (3 SP)
**File**: `src/components/chapters/hub/ExpectationBlocks.tsx`

**Acceptance Criteria**:
- Small text blocks describing what user will find
- One block per chapter category
- Glassmorphism cards
- Icon + text layout

**Implementation**:
```typescript
import { GlassmorphCard } from '@/components/ui'

const expectations = [
  {
    icon: '🎵',
    title: 'Music',
    text: 'Discover cinematic soundscapes and melodic techno tracks.',
  },
  {
    icon: '🌐',
    title: '3D Worlds',
    text: 'Explore immersive 3D environments and visual storytelling.',
  },
  {
    icon: '🤖',
    title: 'AI Tools',
    text: 'Unlock creative potential with AI-powered songwriting tools.',
  },
]

export default function ExpectationBlocks() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-16">
      {expectations.map((exp) => (
        <GlassmorphCard key={exp.title} intensity="low" className="p-6 text-center">
          <div className="text-4xl mb-3">{exp.icon}</div>
          <h4 className="font-display text-xl font-bold mb-2">{exp.title}</h4>
          <p className="text-white/70 text-sm">{exp.text}</p>
        </GlassmorphCard>
      ))}
    </div>
  )
}
```

---

### Story 2.5: Create Navigation Indicators (3 SP)
**File**: `src/components/chapters/hub/NavigationIndicators.tsx`

**Acceptance Criteria**:
- Visual cues showing user can scroll down
- Animated arrows or dots
- Positioned at bottom of Hub section

**Implementation**:
```typescript
'use client'

import { motion } from 'framer-motion'

export default function NavigationIndicators() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
      <p className="text-white/60 text-sm mb-2">Scroll to explore</p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg className="w-6 h-10 mx-auto text-cyan">
          <path
            d="M3 7l9 9 9-9"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
```

---

### Story 2.6: Integrate Hub Section into Main Page (5 SP)
**File**: Update `src/app/page.tsx`

**Acceptance Criteria**:
- Replace hub placeholder with `<HubSection />`
- Import all hub components
- Map thumbnails from `assets.hub.thumbnails` to chapters
- Verify smooth scroll to chapters works

**Implementation**:
```typescript
import HubSection from '@/components/chapters/hub/HubSection'
import { assets } from '@/config/assets'
import { chapters } from '@/config/chapters'

export default function Home() {
  const hubChapters = chapters.filter((ch) => !['intro', 'hub'].includes(ch.id))

  return (
    <main>
      {/* ... other sections */}

      <HubSection chapters={hubChapters} thumbnails={assets.hub.thumbnails} />

      {/* ... other sections */}
    </main>
  )
}
```

---

## 🛠️ ENTWICKLUNGSRICHTLINIEN

### React Three Fiber Best Practices
```typescript
// ✅ Use 'use client' directive
'use client'

// ✅ Import from correct packages
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

// ✅ Cleanup in useEffect
useEffect(() => {
  return () => {
    // Cleanup GSAP, ScrollTrigger, etc.
  }
}, [])

// ✅ Use refs for meshes
const meshRef = useRef<THREE.Mesh>(null)

// ✅ Type Three.js objects
import * as THREE from 'three'
const groupRef = useRef<THREE.Group>(null)
```

### Performance Tips
```typescript
// ✅ Use frustumCulled für Particles
<Points frustumCulled={false}>

// ✅ Memoize geometry/materials wenn möglich
const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])

// ✅ Limit particle count on mobile
const particleCount = isMobile ? 500 : 1000
```

---

## 📦 GIT WORKFLOW

### Commit pro Story
```bash
git add -A
git commit -m "feat: <description> (Story X.Y)

<Details>"

git push -u origin claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

---

## ✅ COMPLETION CHECKLIST

### Epic 4 (3D World)
- [ ] Story 4.1: R3F Canvas setup
- [ ] Story 4.2: Procedural 3D scene
- [ ] Story 4.3: Auto-rotation animation
- [ ] Story 4.4: Particle field background
- [ ] Story 4.5: Camera scroll animation
- [ ] Story 4.6: Post-processing effects (optional)
- [ ] Story 4.7: Interactive hover effects
- [ ] Story 4.8: Integration in page.tsx

### Epic 2 (Hub)
- [ ] Story 2.1: HubSection layout
- [ ] Story 2.2: ChapterThumbnail component
- [ ] Story 2.3: Thumbnail grid animation
- [ ] Story 2.4: Expectation blocks
- [ ] Story 2.5: Navigation indicators
- [ ] Story 2.6: Integration in page.tsx

---

## 🚀 LOS GEHT'S!

**Starte mit Epic 4, Story 4.1** (3D World ist das komplexeste Epic!)

**KEINE FRAGEN STELLEN - ALLE INFORMATIONEN SIND HIER!**

Falls R3F-Probleme auftreten: Nutze die Drei-Helpers (`OrbitControls`, `PerspectiveCamera`) - sie vereinfachen vieles.

Viel Erfolg! 🎉
