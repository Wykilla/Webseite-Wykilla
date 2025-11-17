/**
 * Asset Types
 * Type definitions for asset management system
 */

export interface ImageAsset {
  path: string
  alt: string
  width?: number
  height?: number
  isPlaceholder?: boolean
}

export interface AudioAsset {
  mp3: string
  ogg?: string
  isPlaceholder: boolean
}

export interface ModelAsset {
  glb: string
  isPlaceholder: boolean
}

export interface ChapterThumbnail {
  image: string
  title: string
  description: string
  color: string
}

export interface PlaceholderStatus {
  hasPlaceholders: boolean
  list: string[]
  count: number
}
