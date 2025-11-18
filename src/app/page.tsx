'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/chapters/intro/HeroSection'
import HubSection from '@/components/chapters/hub/HubSection'
import MusicSection from '@/components/chapters/music/MusicSection'
import { ToolsSection } from '@/components/chapters/tools'
import LoreSection from '@/components/chapters/lore/LoreSection'
import MerchSection from '@/components/chapters/merch/MerchSection'
import OutroSection from '@/components/chapters/outro/OutroSection'

// Dynamischer Import für 3D World Section (nur client-side)
const WorldSection = dynamic(
  () => import('@/components/chapters/world/WorldSection'),
  { 
    ssr: false,
    loading: () => (
      <section id="world" className="relative h-screen overflow-hidden bg-ink flex items-center justify-center">
        <div className="text-white/60">Loading 3D World...</div>
      </section>
    )
  }
)

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Epic 1: Intro/Hero Chapter */}
      <HeroSection />

      {/* Epic 2: Hub Chapter */}
      <HubSection />

      {/* Epic 3: Music Chapter */}
      <MusicSection />

      {/* Epic 4: 3D World Chapter */}
      <Suspense fallback={
        <section id="world" className="relative h-screen overflow-hidden bg-ink flex items-center justify-center">
          <div className="text-white/60">Initializing 3D Universe...</div>
        </section>
      }>
        <WorldSection />
      </Suspense>

      {/* Epic 5: Tools Chapter */}
      <ToolsSection />

      {/* Epic 6: Lore Chapter */}
      <LoreSection />

      {/* Epic 7: Merch/Community Chapter */}
      <MerchSection />

      {/* Epic 8: Outro Chapter */}
      <OutroSection />
    </main>
  )
}
