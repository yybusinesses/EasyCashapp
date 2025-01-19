'use client'
import React from 'react'
import { motion } from 'framer-motion'
import type { Feature, MotionProps } from '@/types'

export default function DisputeResolution() {
  const features: Feature[] = [
    {
      title: "Community Jury System",
      description: "Disputes resolved by qualified community members with stake in the platform",
      icon: "⚖️",
      features: ["Peer Jury", "Stake-based Voting", "Fair Resolution"],
      color: "blue"
    },
    {
      title: "Smart Contract Arbitration",
      description: "Automated dispute resolution based on predefined conditions",
      icon: "📜",
      features: ["Auto-resolution", "Transparent Rules", "Instant Execution"],
      color: "green"
    }
  ]

  return (
    <motion.div {...motionProps} className="max-w-6xl mx-auto">
      {/* Component implementation */}
    </motion.div>
  )
} 