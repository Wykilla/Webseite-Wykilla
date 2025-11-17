import HeroSection from '@/components/chapters/intro/HeroSection'
import LoreSection from '@/components/chapters/lore/LoreSection'
import OutroSection from '@/components/chapters/outro/OutroSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Epic 1: Intro/Hero Chapter */}
      <HeroSection />

      <section id="hub" className="h-screen flex items-center justify-center bg-ink/50">
        <p className="text-gray-400">Hub Chapter (Coming in Epic 2)</p>
      </section>

      <section id="music" className="h-screen flex items-center justify-center">
        <p className="text-gray-400">Music Chapter (Coming in Epic 3)</p>
      </section>

      <section id="world" className="h-screen flex items-center justify-center bg-ink/50">
        <p className="text-gray-400">3D World Chapter (Coming in Epic 4)</p>
      </section>

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
