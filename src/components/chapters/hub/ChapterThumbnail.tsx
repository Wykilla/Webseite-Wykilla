'use client'

import { Card } from '@/components/ui'
import { useLenis } from '@/hooks/useLenis'
import type { ChapterMetadata } from '@/types/chapter'
import Image from 'next/image'

interface ChapterThumbnailProps {
  chapter: ChapterMetadata
  thumbnailSrc: string
}

export default function ChapterThumbnail({
  chapter,
  thumbnailSrc,
}: ChapterThumbnailProps) {
  const { scrollTo } = useLenis()

  const handleClick = () => {
    scrollTo(`#${chapter.id}`, { offset: -80, duration: 1.5 })
  }

  return (
    <Card
      hover
      className="group cursor-pointer overflow-hidden relative h-80"
      onClick={handleClick}
    >
      {/* Thumbnail Image */}
      <div className="relative h-full">
        <Image
          src={thumbnailSrc}
          alt={chapter.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent"
          style={{
            background: `linear-gradient(to top, rgba(10, 10, 15, 0.95), transparent), linear-gradient(135deg, ${chapter.color}20, transparent)`,
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3
            className="font-display text-3xl font-bold mb-2"
            style={{ color: chapter.color }}
          >
            {chapter.name}
          </h3>
          <p className="text-white/70 text-sm">{chapter.emotion}</p>
        </div>

        {/* Hover indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: chapter.color,
              boxShadow: `0 0 20px ${chapter.color}80`,
            }}
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  )
}
