'use client'
import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Tabs } from '../../components/Tabs'
import { JobList } from '@/components/jobs/JobList'
import { LoadingSkeleton } from '@/components/LoadingState'

type TabType = 'applied' | 'saved'

export default function MyJobs() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('applied')

  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Jobs</h1>
      
      <Tabs
        tabs={[
          { id: 'applied', label: 'Applied Jobs' },
          { id: 'saved', label: 'Saved Jobs' }
        ]}
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab as TabType)}
      />

      <div className="mt-6">
        <JobList type={activeTab} />
      </div>
    </div>
  )
} 