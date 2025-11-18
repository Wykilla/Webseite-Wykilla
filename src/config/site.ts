/**
 * Site Configuration
 * General site-wide settings and metadata
 */

export const siteConfig = {
  name: 'WYKILLA',
  title: 'WYKILLA — Futuristic Music & Creative AI Tools',
  description:
    'Melodic Techno producer, 3D artist, and AI tool creator. Experience cinematic sound design and cutting-edge creative technology.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://wykilla.com',

  author: {
    name: 'WYKILLA',
    email: 'contact@wykilla.com',
  },

  social: {
    spotify: 'https://open.spotify.com/artist/WYKILLA', // Update with real URL
    soundcloud: 'https://soundcloud.com/wykilla', // Update with real URL
    instagram: 'https://instagram.com/wykilla', // Update with real URL
    twitter: 'https://twitter.com/wykilla', // Update with real URL
    discord: 'https://discord.gg/wykilla', // Update with real URL
    youtube: 'https://youtube.com/@wykilla', // Update with real URL
  },

  contact: {
    email: 'contact@wykilla.com',
    support: 'support@wykilla.com',
  },

  // Feature flags
  features: {
    toolsEnabled: process.env.NEXT_PUBLIC_TOOLS_ENABLED === 'true',
    use3DPlaceholders: process.env.NEXT_PUBLIC_ENABLE_3D_PLACEHOLDERS === 'true',
  },

  // Analytics (when implemented)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  },
}

export type SiteConfig = typeof siteConfig
