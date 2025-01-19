'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Rewards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
          Rewards & Recognition
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Achievement Badges",
            description: "Earn badges for completing milestones and maintaining high standards.",
            icon: "🏆",
            features: ["Performance Badges", "Skill Mastery", "Client Satisfaction"]
          },
          {
            title: "Loyalty Program",
            description: "Earn points for platform activity and redeem for valuable rewards.",
            icon: "💎",
            features: ["Activity Points", "Reward Store", "VIP Benefits"]
          },
          {
            title: "Recognition System",
            description: "Get recognized for your expertise and contributions to the community.",
            icon: "🌟",
            features: ["Expert Status", "Featured Profile", "Success Stories"]
          }
        ].map((feature, index) => (
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