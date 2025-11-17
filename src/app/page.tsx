import HeroSection from '@/components/chapters/intro/HeroSection'
import HubSection from '@/components/chapters/hub/HubSection'
import WorldSection from '@/components/chapters/world/WorldSection'
import LoreSection from '@/components/chapters/lore/LoreSection'
import OutroSection from '@/components/chapters/outro/OutroSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Epic 1: Intro/Hero Chapter */}
      <HeroSection />

      {/* Epic 2: Hub Chapter */}
      <HubSection />

      <section id="music" className="h-screen flex items-center justify-center">
        <p className="text-gray-400">Music Chapter (Coming in Epic 3)</p>
      </section>

      {/* Epic 4: 3D World Chapter */}
      <WorldSection />

      <section id="tools" className="h-screen flex items-center justify-center">
        <p className="text-gray-400">Tools Chapter (Coming in Epic 5)</p>
      </section>

      {/* Epic 6: Lore Chapter */}
      <LoreSection />

      <section id="merch" className="h-screen flex items-center justify-center">
        <p className="text-gray-400">Merch/Community Chapter (Coming in Epic 7)</p>
      </section>

      {/* Epic 8: Outro Chapter */}
      <OutroSection />
    </main>
  )
}
