'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function BusinessFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Revenue Generating Features
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Premium Subscriptions",
            description: "Tiered membership plans offering enhanced visibility, priority support, and advanced tools.",
            icon: "⭐",
            features: ["Featured Listings", "Priority Matching", "Advanced Analytics"]
          },
          {
            title: "Commission System",
            description: "Fair and transparent fee structure with volume-based incentives.",
            icon: "💎",
            features: ["Competitive Rates", "Volume Discounts", "Referral Rewards"]
          },
          {
            title: "Skill Verification",
            description: "Paid certification programs and skill assessments.",
            icon: "📜",
            features: ["Industry Certifications", "Skill Badges", "Verified Profiles"]
          },
          {
            title: "Enterprise Solutions",
            description: "Custom solutions for large organizations with specialized needs.",
            icon: "🏢",
            features: ["Custom Integration", "Dedicated Support", "Bulk Hiring"]
          },
          {
            title: "Insurance & Protection",
            description: "Optional insurance coverage for both workers and clients.",
            icon: "🔒",
            features: ["Work Protection", "Payment Protection", "Dispute Resolution"]
          },
          {
            title: "Learning Marketplace",
            description: "Platform for skill development and professional growth.",
            icon: "📚",
            features: ["Online Courses", "Mentorship", "Industry Resources"]
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
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
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