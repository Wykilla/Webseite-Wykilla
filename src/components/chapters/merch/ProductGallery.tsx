'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrentIndex(i)
              setIsOpen(true)
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image src={img} alt={`${productName} ${i + 1}`} width={100} height={100} />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={images[currentIndex]}
              alt={productName}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
