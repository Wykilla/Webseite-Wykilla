import { siteConfig } from '@/config/site'

const socials = [
  { name: 'Spotify', url: siteConfig.social.spotify, icon: '🎵' },
  { name: 'SoundCloud', url: siteConfig.social.soundcloud, icon: '☁️' },
  { name: 'Instagram', url: siteConfig.social.instagram, icon: '📷' },
  { name: 'YouTube', url: siteConfig.social.youtube, icon: '🎬' },
  { name: 'Twitter', url: siteConfig.social.twitter, icon: '🐦' },
  { name: 'Discord', url: siteConfig.social.discord, icon: '💬' },
]

export default function SocialLinks() {
  return (
    <div className="flex gap-6 justify-center mt-12">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-cyan/20 hover:scale-110 transition-all duration-200"
          aria-label={social.name}
        >
          <span className="text-2xl">{social.icon}</span>
        </a>
      ))}
    </div>
  )
}
