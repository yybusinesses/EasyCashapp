'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Finance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Financial Tools
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Invoicing & Billing",
            description: "Professional invoicing and payment management",
            icon: "💰",
            features: [
              "Automated Invoicing",
              "Payment Tracking",
              "Multi-currency Support",
              "Tax Calculations"
            ]
          },
          {
            title: "Financial Analytics",
            description: "Comprehensive financial reporting and insights",
            icon: "📈",
            features: [
              "Income Reports",
              "Expense Tracking",
              "Revenue Forecasting",
              "Profit Analysis"
            ]
          },
          {
            title: "Tax Management",
            description: "Simplified tax compliance and reporting",
            icon: "📑",
            features: [
              "Tax Calculator",
              "Document Storage",
              "1099 Generation",
              "Tax Reminders"
            ]
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