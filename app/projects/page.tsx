'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Project Tracking",
            description: "Comprehensive project management with milestones and deadlines.",
            features: [
              "Timeline Management",
              "Task Dependencies",
              "Progress Tracking",
              "Resource Allocation"
            ]
          },
          {
            title: "Collaboration Tools",
            description: "Built-in tools for seamless team collaboration.",
            features: [
              "Real-time Chat",
              "File Sharing",
              "Video Meetings",
              "Shared Calendar"
            ]
          },
          {
            title: "Quality Control",
            description: "Tools to ensure project quality and satisfaction.",
            features: [
              "Milestone Reviews",
              "Code Review Tools",
              "Testing Integration",
              "Client Approval System"
            ]
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
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