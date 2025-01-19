'use client'
import React from 'react'
import { motion } from 'framer-motion'
import type { Feature, MotionProps } from '@/types'

const motionProps: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  whileHover: { scale: 1.02 }
}

export default function PageName() {
  const features: Feature[] = [
    // ... feature objects
  ]

  return (
    <motion.div {...motionProps} className="max-w-6xl mx-auto">
      {/* ... rest of the component */}
    </motion.div>
  )
} 