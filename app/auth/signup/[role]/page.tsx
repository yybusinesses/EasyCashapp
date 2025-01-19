'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UserRole } from '@/types/shared'
import { Toast } from '@/components/Toast'
import { DataProtectionNotice } from '@/components/DataProtectionNotice'

export default function SignUpForm({ params }: { params: { role: UserRole } }) {
  const { role } = params
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simple form data collection
      const formData = new FormData(e.currentTarget)
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
        role: role,
        ...(role === 'client' 
          ? { companyName: formData.get('companyName') }
          : { skills: formData.get('skills')?.toString().split(',') }
        )
      }

      // Call API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Signup failed')

      // Redirect to dashboard
      window.location.href = `/${role}/dashboard`
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto py-12 px-4"
    >
      <h1 className="text-3xl font-bold text-center mb-8">
        Create your {role === 'client' ? 'Client' : 'Freelancer'} Account
      </h1>

      <DataProtectionNotice />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Common Fields */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role-specific fields */}
        {role === 'client' ? (
          <div>
            <label className="block text-sm font-medium mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              required
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-2">Skills</label>
            <input
              type="text"
              name="skills"
              required
              placeholder="e.g., JavaScript, React, Node.js"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {error && (
        <Toast
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </motion.div>
  )
} 