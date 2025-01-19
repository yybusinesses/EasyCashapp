'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSkeleton } from '@/components/LoadingState'

export default function ClientDashboard() {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSkeleton />

  if (!user || user.role !== 'client') {
    window.location.href = '/auth'
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Post New Project
            </button>
            <button className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
              Browse Freelancers
            </button>
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
          <div className="text-gray-500">No active projects</div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="text-gray-500">No recent activity</div>
        </div>
      </div>
    </motion.div>
  )
} 