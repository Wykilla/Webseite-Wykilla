import { GlassmorphCard, Button } from '@/components/ui'

export default function ComingSoon() {
  return (
    <GlassmorphCard intensity="high" className="text-center py-12">
      <h3 className="font-display text-3xl font-bold mb-4">Coming Soon!</h3>
      <p className="text-white/80 mb-6">
        Exclusive WYKILLA merch is on the way. Join the waitlist to be notified.
      </p>
      <Button variant="primary" size="lg" glow>
        Join Waitlist
      </Button>
    </GlassmorphCard>
  )
}
