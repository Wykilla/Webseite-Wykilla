/**
 * Asset Configuration
 * Central management for all asset paths across the application
 *
 * IMPORTANT: Change asset paths here, NO code changes needed elsewhere!
 * All placeholders are marked with isPlaceholder: true
 */

import type { AudioTrack, PlaceholderStatus } from '@/types'

export const assets = {
  // ==================== HERO / INTRO ====================
  hero: {
    image: '/images/hero/wykilla_hero.webp',
    imageFallback: '/images/hero/wykilla_hero.png',
    logo: '/images/logo/placeholder-logo.svg', // ⚠️ PLACEHOLDER
    isPlaceholder: {
      logo: true,
    },
  },

  // ==================== HUB / OVERVIEW ====================
  hub: {
    thumbMusic: '/images/thumbs/music.webp', // 🟡 PLACEHOLDER
    thumbWorld: '/images/thumbs/world.webp', // 🟡 PLACEHOLDER
    thumbTools: '/images/thumbs/tools.webp', // 🟡 PLACEHOLDER
    thumbLore: '/images/thumbs/lore.webp', // 🟡 PLACEHOLDER
    thumbMerch: '/images/thumbs/merch.webp', // 🟡 PLACEHOLDER
    thumbOutro: '/images/thumbs/outro.webp', // 🟡 PLACEHOLDER
    isPlaceholder: {
      thumbMusic: true,
      thumbWorld: true,
      thumbTools: true,
      thumbLore: true,
      thumbMerch: true,
      thumbOutro: true,
    },
  },

  // ==================== MUSIC CHAPTER ====================
  music: {
    tracks: [
      {
        id: 'track-01',
        title: 'Placeholder Track 01',
        artist: 'WYKILLA',
        mp3: '/audio/placeholder_track_01.mp3',
        ogg: '/audio/placeholder_track_01.ogg',
        duration: 300, // 5 minutes
        isPlaceholder: true,
        artwork: '/images/music/artwork-01.jpg',
      },
      {
        id: 'track-02',
        title: 'Placeholder Track 02',
        artist: 'WYKILLA',
        mp3: '/audio/placeholder_track_02.mp3',
        ogg: '/audio/placeholder_track_02.ogg',
        duration: 280,
        isPlaceholder: true,
        artwork: '/images/music/artwork-02.jpg',
      },
      {
        id: 'track-03',
        title: 'Placeholder Track 03',
        artist: 'WYKILLA',
        mp3: '/audio/placeholder_track_03.mp3',
        ogg: '/audio/placeholder_track_03.ogg',
        duration: 320,
        isPlaceholder: true,
        artwork: '/images/music/artwork-03.jpg',
      },
    ] as AudioTrack[],

    // Streaming links
    spotifyUrl: 'https://open.spotify.com/artist/WYKILLA', // Update with real URL
    soundcloudUrl: 'https://soundcloud.com/wykilla', // Update with real URL

    // Waveform data (generated from audio or JSON file)
    waveformData: null, // Will be generated
  },

  // ==================== 3D WORLD CHAPTER ====================
  world: {
    sceneModel: '/models/world_scene.glb', // ⚠️ Currently procedural primitives
    monumentModel: '/models/monument.glb', // ⚠️ Currently procedural
    environmentHDR: null, // Optional
    usePlaceholder: true, // If true, use primitives instead of loading models
    isPlaceholder: {
      sceneModel: true,
      monumentModel: true,
    },
  },

  // ==================== TOOLS CHAPTER ====================
  tools: {
    demoLyric: '/demos/lyric_generator.mp4', // ⚠️ Currently CSS animation
    demoAudioFX: '/demos/audiofx_tool.mp4', // ⚠️ Currently CSS animation
    usePlaceholder: true,
    isPlaceholder: {
      demoLyric: true,
      demoAudioFX: true,
    },
  },

  // ==================== LORE CHAPTER ====================
  lore: {
    background: '/images/lore/lore_bg.webp', // 🟡 PLACEHOLDER
    contentFile: '/content/lore.md', // ⚠️ PLACEHOLDER text
    isPlaceholder: {
      background: true,
      contentFile: true,
    },
  },

  // ==================== MERCH / COMMUNITY ====================
  merch: {
    products: [
      {
        id: 'product-01',
        name: 'WYKILLA T-Shirt',
        image: '/images/merch/tshirt.webp', // ⚠️ PLACEHOLDER
        price: '€25',
        url: '#', // External shop link
        isPlaceholder: true,
      },
      {
        id: 'product-02',
        name: 'WYKILLA Cap',
        image: '/images/merch/cap.webp', // ⚠️ PLACEHOLDER
        price: '€20',
        url: '#',
        isPlaceholder: true,
      },
      {
        id: 'product-03',
        name: 'Art Print',
        image: '/images/merch/print.webp', // ⚠️ PLACEHOLDER
        price: '€15',
        url: '#',
        isPlaceholder: true,
      },
      {
        id: 'product-04',
        name: 'Poster',
        image: '/images/merch/poster.webp', // ⚠️ PLACEHOLDER
        price: '€30',
        url: '#',
        isPlaceholder: true,
      },
    ],
  },

  // ==================== GLOBAL ASSETS ====================
  global: {
    faviconSVG: '/favicon.svg', // 🟡 PLACEHOLDER
    faviconICO: '/favicon.ico',
    ogImage: '/og_image.jpg', // 🟡 PLACEHOLDER (auto-gen from hero)
    isPlaceholder: {
      faviconSVG: true,
      ogImage: true,
    },
  },
}

/**
 * Helper: Get placeholder status across all assets
 * Useful for displaying warnings in development
 */
export function getPlaceholderStatus(): PlaceholderStatus {
  const placeholders: string[] = []

  // Check hero
  if (assets.hero.isPlaceholder.logo) {
    placeholders.push('Logo (Hero)')
  }

  // Check hub thumbnails
  if (assets.hub.isPlaceholder.thumbMusic) placeholders.push('Music Thumbnail')
  if (assets.hub.isPlaceholder.thumbWorld) placeholders.push('World Thumbnail')
  if (assets.hub.isPlaceholder.thumbTools) placeholders.push('Tools Thumbnail')
  if (assets.hub.isPlaceholder.thumbLore) placeholders.push('Lore Thumbnail')
  if (assets.hub.isPlaceholder.thumbMerch) placeholders.push('Merch Thumbnail')
  if (assets.hub.isPlaceholder.thumbOutro) placeholders.push('Outro Thumbnail')

  // Check music
  const placeholderTracks = assets.music.tracks.filter((t) => t.isPlaceholder)
  if (placeholderTracks.length > 0) {
    placeholders.push(`${placeholderTracks.length} Music Track(s)`)
  }

  // Check 3D world
  if (assets.world.usePlaceholder) {
    placeholders.push('3D World Scene (using primitives)')
  }

  // Check tools
  if (assets.tools.usePlaceholder) {
    placeholders.push('Tool Demos (CSS animations)')
  }

  // Check lore
  if (assets.lore.isPlaceholder.background) {
    placeholders.push('Lore Background')
  }
  if (assets.lore.isPlaceholder.contentFile) {
    placeholders.push('Lore Content')
  }

  // Check merch
  const placeholderProducts = assets.merch.products.filter((p) => p.isPlaceholder)
  if (placeholderProducts.length > 0) {
    placeholders.push(`${placeholderProducts.length} Merch Product(s)`)
  }

  // Check global
  if (assets.global.isPlaceholder.faviconSVG) {
    placeholders.push('Favicon')
  }
  if (assets.global.isPlaceholder.ogImage) {
    placeholders.push('OG Image')
  }

  return {
    hasPlaceholders: placeholders.length > 0,
    list: placeholders,
    count: placeholders.length,
  }
}

/**
 * Log placeholder status to console (development only)
 */
export function logPlaceholderStatus() {
  if (process.env.NODE_ENV !== 'development') return

  const status = getPlaceholderStatus()

  if (status.hasPlaceholders) {
    console.warn(
      `⚠️ ${status.count} PLACEHOLDER ASSET(S) ACTIVE:\n` +
        status.list.map((p) => `  - ${p}`).join('\n')
    )
  } else {
    console.log('✅ All assets are final (no placeholders)')
  }
}
