'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Toast } from '@/components/Toast'
import { LoadingSkeleton } from '@/components/LoadingState'

export function ProfileManager() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/protected/profile')
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get('name'),
        bio: formData.get('bio'),
        location: formData.get('location'),
        ...(user?.role === 'freelancer' ? {
          skills: formData.get('skills')?.toString().split(','),
          hourlyRate: parseFloat(formData.get('hourlyRate') as string),
          availability: formData.get('availability')
        } : {
          companyName: formData.get('companyName'),
          industry: formData.get('industry')
        })
      }

      const response = await fetch('/api/protected/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to update profile')

      setSuccess('Profile updated successfully')
      fetchProfile()
    } catch (error) {
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Common Fields */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={profile?.name}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role-specific fields */}
        {user?.role === 'freelancer' ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Skills</label>
              <input
                type="text"
                name="skills"
                defaultValue={profile?.skills?.join(', ')}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hourly Rate</label>
              <input
                type="number"
                name="hourlyRate"
                defaultValue={profile?.hourlyRate}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                defaultValue={profile?.companyName}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <input
                type="text"
                name="industry"
                defaultValue={profile?.industry}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {error && (
        <Toast
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <Toast
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}
    </motion.div>
  )
} 