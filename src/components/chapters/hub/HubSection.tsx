'use client'

import { useRef, useEffect } from 'react'
import { assets } from '@/config/assets'
import { chapters } from '@/config/chapters'
import ChapterThumbnail from './ChapterThumbnail'
import { useGSAP } from '@/hooks/useGSAP'

export default function HubSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const { gsap, ScrollTrigger } = useGSAP()

  // Filter relevant chapters (exclude intro and hub itself)
  const hubChapters = chapters.filter(
    (ch) => !['intro', 'hub'].includes(ch.id)
  )

  // Map chapter IDs to thumbnail paths
  const getThumbnail = (chapterId: string): string => {
    const thumbnailMap: Record<string, string> = {
      music: assets.hub.thumbMusic,
      world: assets.hub.thumbWorld,
      tools: assets.hub.thumbTools,
      lore: assets.hub.thumbLore,
      merch: assets.hub.thumbMerch,
      outro: assets.hub.thumbOutro,
    }
    return thumbnailMap[chapterId] || assets.hub.thumbMusic
  }

  useEffect(() => {
    if (!gridRef.current || !gsap || !ScrollTrigger) return

    const thumbnails = gridRef.current.querySelectorAll('.chapter-thumbnail')

    gsap.fromTo(
      thumbnails,
      { opacity: 0, scale: 0.8, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 70%',
        },
      }
    )
  }, [gsap, ScrollTrigger])

  return (
    <section
      id="hub"
      className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-ink via-cyan/5 to-ink"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            Explore
          </span>
        </h2>

        {/* Thumbnail grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hubChapters.map((chapter) => (
            <div key={chapter.id} className="chapter-thumbnail">
              <ChapterThumbnail
                chapter={chapter}
                thumbnailSrc={getThumbnail(chapter.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
