/**
 * Chapter Configuration
 * Metadata for all chapters in the scroll experience
 */

import type { ChapterMetadata } from '@/types'

export const chapters: ChapterMetadata[] = [
  {
    id: 'intro',
    name: 'Intro / Hero',
    title: 'WYKILLA',
    emotion: 'Wonder & Anticipation',
    color: '#4CC9F0', // Cyan
    duration: 2.5, // seconds
  },
  {
    id: 'hub',
    name: 'Hub / Overview',
    title: 'Explore Dimensions',
    emotion: 'Curiosity',
    color: '#4CC9F0', // Multi-color, but primary is Cyan
    duration: 1.5,
  },
  {
    id: 'music',
    name: 'Music',
    title: 'Melodic Heartbeat',
    emotion: 'Euphoric Energy',
    color: '#FF3AC0', // Magenta
    duration: 5, // Longest chapter
  },
  {
    id: 'world',
    name: '3D World',
    title: 'Digital Dimension',
    emotion: 'Awe & Scale',
    color: '#4CC9F0', // Cyan
    duration: 6, // Peak experience
  },
  {
    id: 'tools',
    name: 'Software Tools',
    title: 'Creative Arsenal',
    emotion: 'Empowerment',
    color: '#FFD580', // Gold
    duration: 2.5,
  },
  {
    id: 'lore',
    name: 'Lore / Story',
    title: 'Synthetic Humanity',
    emotion: 'Emotional Resonance',
    color: '#6C002A', // Bordeaux
    duration: 3.5,
  },
  {
    id: 'merch',
    name: 'Merch / Community',
    title: 'Join the Movement',
    emotion: 'Belonging',
    color: '#FF3AC0', // Magenta
    duration: 2,
  },
  {
    id: 'outro',
    name: 'Outro',
    title: 'Your Journey Begins',
    emotion: 'Call to Adventure',
    color: '#4CC9F0', // Cyan
    duration: 2,
  },
]

/**
 * Get chapter by ID
 */
export function getChapter(id: string): ChapterMetadata | undefined {
  return chapters.find((c) => c.id === id)
}

/**
 * Get total scroll duration
 */
export function getTotalDuration(): number {
  return chapters.reduce((sum, chapter) => sum + chapter.duration, 0)
}
