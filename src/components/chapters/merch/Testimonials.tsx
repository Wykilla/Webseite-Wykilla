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
