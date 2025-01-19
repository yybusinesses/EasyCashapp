'use client'
import React from 'react'
import { motion } from 'framer-motion'
import type { Feature, MotionProps } from '@/types'

const motionProps: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export default function AIFeatures() {
  const features: Feature[] = [
    {
      title: "Job Matching AI",
      description: "AI-powered recommendations for users based on their job history, ratings, preferences, and availability.",
      icon: "🎯",
      features: ["Smart Matching", "Personalized"],
      color: "purple"
    },
    {
      title: "AI Chatbots",
      description: "AI-powered customer support for 24/7 assistance, ensuring a smooth user experience and timely responses.",
      icon: "💬",
      features: ["24/7 Support", "Quick Response"],
      color: "blue"
    },
    {
      title: "Data Analytics AI",
      description: "Real-time insights into user behavior, job trends, and performance metrics for data-driven decision making.",
      icon: "📊",
      features: ["Real-time", "Analytics"],
      color: "indigo"
    },
    {
      title: "Fraud Detection AI",
      description: "Advanced AI system that protects users from scams, fake profiles, and fraudulent transactions.",
      icon: "🛡️",
      features: ["Security", "Protection"],
      color: "red"
    },
    {
      title: "Smart Pricing AI",
      description: "Dynamic pricing recommendations based on market demand, skill level, and project complexity.",
      icon: "💰",
      features: ["Market Analysis", "Optimization"],
      color: "green"
    },
    {
      title: "Quality Assurance AI",
      description: "AI-driven work quality verification and milestone tracking system.",
      icon: "✅",
      features: ["Quality Control", "Verification"],
      color: "blue"
    }
  ]

  return (
    <motion.div {...motionProps} className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          AI-Powered Features
        </h1>
        <p className="text-xl text-gray-600">
          Advanced artificial intelligence solutions to enhance your experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
            <p className="text-gray-600 mb-6">
              {feature.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {feature.features.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${feature.color === 'purple' ? 'bg-purple-100 text-purple-800' : ''}
                    ${feature.color === 'blue' ? 'bg-blue-100 text-blue-800' : ''}
                    ${feature.color === 'indigo' ? 'bg-indigo-100 text-indigo-800' : ''}
                    ${feature.color === 'red' ? 'bg-red-100 text-red-800' : ''}
                    ${feature.color === 'green' ? 'bg-green-100 text-green-800' : ''}
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-medium">
              Explore Feature
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 