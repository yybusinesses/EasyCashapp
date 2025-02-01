'use client'
import React, { useEffect, useState } from 'react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { JobLocationFilter } from './JobLocationFilter'
import { SearchFilters, Project } from '@/types/shared'
import { Toast } from './Toast'

export function NearbyJobs() {
  const [jobs, setJobs] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation()

  const fetchJobs = async (filters: Partial<SearchFilters>) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (filters.location) {
        params.set('latitude', filters.location.latitude.toString())
        params.set('longitude', filters.location.longitude.toString())
        params.set('radius', filters.location.radius.toString())
      }
      if (filters.jobType?.length) {
        params.set('jobType', filters.jobType[0])
      }

      const response = await fetch(`/api/projects/search?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch jobs')
      
      const data = await response.json()
      setJobs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      fetchJobs({
        location: {
          latitude,
          longitude,
          radius: 50 // Default radius
        }
      })
    }
  }, [latitude, longitude])

  return (
    <div className="space-y-6">
      <JobLocationFilter
        onFilterChange={fetchJobs}
        currentLocation={latitude && longitude ? { latitude, longitude } : undefined}
      />

      {loading && <div>Loading jobs...</div>}
      
      {error && (
        <Toast
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {job.location.type}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {job.budget.currency} {job.budget.min} - {job.budget.max}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 