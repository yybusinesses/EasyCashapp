'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Auth() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Types */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">For Freelancers</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Portfolio Showcase
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Skill Verification
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Work History & Reviews
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Availability Calendar
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">For Clients</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Company Profile
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Project Management
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Team Management
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Budget Controls
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
} 