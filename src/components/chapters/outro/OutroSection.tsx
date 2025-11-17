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
