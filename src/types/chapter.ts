/**
 * Chapter Types
 * Type definitions for all chapter components
 */

export interface ChapterProps {
  id: string
  className?: string
  onVisible?: () => void
  onExit?: () => void
}

export interface ChapterMetadata {
  id: string
  name: string
  title: string
  emotion: string
  color: string
  duration: number // scroll duration in seconds
}

export type ChapterId =
  | 'intro'
  | 'hub'
  | 'music'
  | 'world'
  | 'tools'
  | 'lore'
  | 'merch'
  | 'outro'
