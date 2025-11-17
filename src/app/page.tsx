import MusicSection from '@/components/chapters/music/MusicSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Placeholder chapters - will be filled in during Epic 1-8 */}
      <section id="intro" className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-display font-bold mb-4 text-cyan">
            WYKILLA
          </h1>
          <p className="text-xl text-gray-300">
            Foundation Setup Complete
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Epic 0 in progress...
          </p>
        </div>
      </section>

      <section id="hub" className="h-screen flex items-center justify-center bg-ink/50">
        <p className="text-gray-400">Hub Chapter (Coming in Epic 2)</p>
      </section>

      <MusicSection />

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
