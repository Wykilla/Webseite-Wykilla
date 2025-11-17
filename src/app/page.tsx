import HeroSection from '@/components/chapters/intro/HeroSection'
import HubSection from '@/components/chapters/hub/HubSection'
import MusicSection from '@/components/chapters/music/MusicSection'
import WorldSection from '@/components/chapters/world/WorldSection'
import LoreSection from '@/components/chapters/lore/LoreSection'
import MerchSection from '@/components/chapters/merch/MerchSection'
import OutroSection from '@/components/chapters/outro/OutroSection'

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
      <WorldSection />

      <section id="tools" className="h-screen flex items-center justify-center">
        <p className="text-gray-400">Tools Chapter (Coming in Epic 5)</p>
      </section>

      {/* Epic 6: Lore Chapter */}
      <LoreSection />

      {/* Epic 7: Merch/Community Chapter */}
      <MerchSection />

      {/* Epic 8: Outro Chapter */}
      <OutroSection />
    </main>
  )
}
