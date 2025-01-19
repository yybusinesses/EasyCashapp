'use client'
import React from 'react'
import { motion } from 'framer-motion'
import type { Feature, MotionProps } from '@/types'

const motionProps: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export default function CRM() {
  const features: Feature[] = [
    {
      title: "HubSpot CRM",
      description: "Ideal for managing marketing, customer support, and sales, with powerful integrations and automated workflows.",
      icon: "🚀",
      features: ["Marketing", "Support", "Sales"],
      color: "orange"
    },
    {
      title: "Zoho CRM",
      description: "Cost-effective and scalable for startups, with customization options and advanced reporting features.",
      icon: "⚡",
      features: ["Customizable", "Reporting"],
      color: "blue"
    },
    {
      title: "Salesforce",
      description: "Advanced CRM for enterprise-level analytics, customizable features, and automation for marketing, sales, and support.",
      icon: "💼",
      features: ["Enterprise", "Analytics"],
      color: "green"
    }
  ]

  return (
    <motion.div {...motionProps} className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CRM Solutions
        </h1>
        <p className="text-xl text-gray-600">
          Powerful tools to manage your customer relationships
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((crm, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">{crm.icon}</div>
            <h2 className="text-2xl font-semibold mb-4">{crm.title}</h2>
            <p className="text-gray-600 mb-6">
              {crm.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {crm.features.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${crm.color === 'orange' ? 'bg-orange-100 text-orange-800' : ''}
                    ${crm.color === 'blue' ? 'bg-blue-100 text-blue-800' : ''}
                    ${crm.color === 'green' ? 'bg-green-100 text-green-800' : ''}
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium">
              Learn More
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 