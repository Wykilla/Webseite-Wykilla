import HeroSection from '@/components/chapters/intro/HeroSection'

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

      <section id="lore" className="h-screen flex items-center justify-center bg-ink/50">
        <p className="text-gray-400">Lore Chapter (Coming in Epic 6)</p>
      </section>

      <section id="merch" className="h-screen flex items-center justify-center">
        <p className="text-gray-400">Merch/Community Chapter (Coming in Epic 7)</p>
      </section>

      <section id="outro" className="h-screen flex items-center justify-center bg-ink/50">
        <p className="text-gray-400">Outro Chapter (Coming in Epic 8)</p>
      </section>
    </main>
  )
}
