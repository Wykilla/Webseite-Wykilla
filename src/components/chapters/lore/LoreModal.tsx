'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassmorphCard } from '@/components/ui'

interface LoreModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export default function LoreModal({ isOpen, onClose, title, content }: LoreModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <GlassmorphCard intensity="high" glow>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>

                {/* Content */}
                <div className="pr-8">
                  <h3 className="font-display text-3xl font-bold mb-4 text-bordeaux">
                    {title}
                  </h3>
                  <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                </div>
              </GlassmorphCard>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
