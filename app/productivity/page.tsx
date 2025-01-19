'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Productivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Time & Productivity Tools
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Time Tracking",
            description: "Automated time tracking with detailed reporting",
            icon: "⏱️",
            features: [
              "Automatic Time Capture",
              "Project Time Allocation",
              "Billable Hours Tracking",
              "Activity Monitoring"
            ]
          },
          {
            title: "Task Management",
            description: "Comprehensive task and project management tools",
            icon: "📋",
            features: [
              "Kanban Boards",
              "Sprint Planning",
              "Task Dependencies",
              "Progress Analytics"
            ]
          },
          {
            title: "Productivity Analytics",
            description: "Insights and metrics to optimize performance",
            icon: "📊",
            features: [
              "Performance Metrics",
              "Productivity Scores",
              "Team Analytics",
              "Goal Tracking"
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