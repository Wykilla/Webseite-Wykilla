'use client'

import { motion } from 'framer-motion'

export default function NavigationIndicators() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
      <p className="text-white/60 text-sm mb-2">Scroll to explore</p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg className="w-6 h-10 mx-auto text-cyan">
          <path
            d="M3 7l9 9 9-9"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
