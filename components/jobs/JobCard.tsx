'use client'
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

interface JobCardProps {
  job: {
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
  type: 'applied' | 'saved'
}

export function JobCard({ job, type }: JobCardProps) {
  const router = useRouter()

  const handleAction = async (action: 'withdraw' | 'apply' | 'unsave') => {
    try {
      const response = await fetch(`/api/jobs/${job.id}/${action}`, {
        method: 'POST'
      })
      if (!response.ok) throw new Error(`Failed to ${action} job`)
      router.refresh()
    } catch (error) {
      console.error(`Error ${action}ing job:`, error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-gray-600 mt-1">{job.company.name}</p>
        </div>
        {job.company.logo && (
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-12 h-12 rounded"
          />
        )}
      </div>

      <p className="text-gray-700 mt-4">{job.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
        </span>
        
        {type === 'applied' ? (
          <div className="space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm
              ${job.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                job.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'}`}
            >
              {job.status}
            </span>
            {job.status === 'APPLIED' && (
              <button
                onClick={() => handleAction('withdraw')}
                className="text-red-600 hover:text-red-800"
              >
                Withdraw
              </button>
            )}
          </div>
        ) : (
          <div className="space-x-2">
            <button
              onClick={() => handleAction('apply')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Apply
            </button>
            <button
              onClick={() => handleAction('unsave')}
              className="text-gray-600 hover:text-gray-800"
            >
              Unsave
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 