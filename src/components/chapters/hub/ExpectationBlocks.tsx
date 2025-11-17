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
