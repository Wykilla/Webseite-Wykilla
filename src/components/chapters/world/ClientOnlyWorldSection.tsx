'use client'

// Temporarily disabled due to React Three Fiber compatibility issues with Next.js 15
// TODO: Re-enable once React Three Fiber is compatible or alternative solution is found
export default function ClientOnlyWorldSection() {
  return (
    <section id="world" className="relative h-screen overflow-hidden bg-ink flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-display text-6xl md:text-8xl font-bold mb-8">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            3D Universe
          </span>
        </h2>
        <p className="text-white/60 text-lg">
          3D World Section - Coming Soon
        </p>
        <p className="text-white/40 text-sm mt-4">
          (Temporarily disabled due to React Three Fiber compatibility)
        </p>
      </div>
    </section>
  )
}

