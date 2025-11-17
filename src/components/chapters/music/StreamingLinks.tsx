import { Button } from '@/components/ui'
import { siteConfig } from '@/config/site'

export default function StreamingLinks() {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-12">
      <Button
        variant="secondary"
        size="md"
        onClick={() => window.open(siteConfig.social.spotify, '_blank')}
      >
        🎵 Spotify
      </Button>
      <Button
        variant="secondary"
        size="md"
        onClick={() => window.open(siteConfig.social.soundcloud, '_blank')}
      >
        ☁️ SoundCloud
      </Button>
    </div>
  )
}
