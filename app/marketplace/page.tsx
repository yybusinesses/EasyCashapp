'use client'
import React from 'react'
import { motion } from 'framer-motion'
import type { Feature, MotionProps } from '@/types'

const motionProps: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export default function Marketplace() {
  const features: Feature[] = [
    {
      title: "Smart Job Matching",
      description: "AI-powered job recommendations and matching system",
      icon: "🎯",
      features: [
        "Skill-based Matching",
        "Budget Range Filtering",
        "Availability Matching",
        "Location-based Search"
      ]
    },
    {
      title: "Bidding System",
      description: "Transparent and competitive bidding platform",
      icon: "💼",
      features: [
        "Real-time Bidding",
        "Counter Offers",
        "Proposal Templates",
        "Budget Suggestions"
      ]
    },
    {
      title: "Contract Management",
      description: "Secure and automated contract handling",
      icon: "📄",
      features: [
        "Smart Contracts",
        "Milestone Setup",
        "Payment Schedule",
        "Legal Templates"
      ]
    }
  ]

  return (
    <motion.div {...motionProps} className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
            <p className="text-gray-600 mb-6">{feature.description}</p>
            <ul className="space-y-2">
              {feature.features.map((item, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <span className="mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 