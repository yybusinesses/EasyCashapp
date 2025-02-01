'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { JobCard } from './JobCard'
import { LoadingSkeleton } from '../LoadingState'

interface Job {
  id: string
  title: string
  description: string
  status: string
  createdAt: string
  company: {
    name: string
    logo?: string
  }
}

export function JobList({ type }: { type: 'applied' | 'saved' }) {
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ['jobs', type],
    queryFn: async () => {
      const response = await fetch(`/api/jobs/${type}`)
      if (!response.ok) throw new Error('Failed to fetch jobs')
      return response.json()
    }
  })

  if (isLoading) return <LoadingSkeleton count={3} />

  return (
    <div className="space-y-4">
      {jobs?.map((job) => (
        <JobCard key={job.id} job={job} type={type} />
      ))}
      {jobs?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No {type} jobs found
        </div>
      )}
    </div>
  )
} 