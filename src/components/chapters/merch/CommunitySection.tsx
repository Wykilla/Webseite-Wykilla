import { GlassmorphCard, Button } from '@/components/ui'

export default function CommunitySection() {
  return (
    <div className="max-w-4xl mx-auto">
      <GlassmorphCard intensity="medium" className="text-center p-12">
        <h3 className="font-display text-4xl font-bold mb-4">
          Join the WYKILLA Community
        </h3>
        <p className="text-xl text-white/80 mb-8">
          Connect with fellow creators, get exclusive updates, and share your journey.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="lg" glow>
            💬 Join Discord
          </Button>
          <Button variant="secondary" size="lg">
            📷 Follow on Instagram
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
          <div>
            <p className="text-3xl font-bold text-gold">1.2K+</p>
            <p className="text-white/60 text-sm">Community Members</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-magenta">50+</p>
            <p className="text-white/60 text-sm">Weekly Events</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan">24/7</p>
            <p className="text-white/60 text-sm">Support</p>
          </div>
        </div>
      </GlassmorphCard>
    </div>
  )
}
