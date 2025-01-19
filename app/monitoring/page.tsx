'use client'
import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'

interface MetricData {
  timestamp: string;
  value: number;
}

interface MonitoringData {
  responseTime: MetricData[];
  errorRate: MetricData[];
  activeUsers: MetricData[];
  cpuUsage: MetricData[];
  memoryUsage: MetricData[];
}

export default function MonitoringDashboard() {
  const { data, isLoading } = useQuery<MonitoringData>({
    queryKey: ['monitoring'],
    queryFn: async () => {
      const res = await fetch('/api/monitoring/metrics')
      if (!res.ok) throw new Error('Failed to fetch metrics')
      return res.json()
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  })

  if (isLoading) {
    return <div>Loading metrics...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">System Monitoring</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Response Time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold mb-4">Response Time (ms)</h2>
          <Line
            data={{
              labels: data?.responseTime.map(d => new Date(d.timestamp).toLocaleTimeString()),
              datasets: [{
                label: 'Response Time',
                data: data?.responseTime.map(d => d.value),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            }}
          />
        </motion.div>

        {/* Error Rate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold mb-4">Error Rate (%)</h2>
          <Bar
            data={{
              labels: data?.errorRate.map(d => new Date(d.timestamp).toLocaleTimeString()),
              datasets: [{
                label: 'Error Rate',
                data: data?.errorRate.map(d => d.value),
                backgroundColor: 'rgb(255, 99, 132)'
              }]
            }}
          />
        </motion.div>

        {/* Active Users */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold mb-4">Active Users</h2>
          <Line
            data={{
              labels: data?.activeUsers.map(d => new Date(d.timestamp).toLocaleTimeString()),
              datasets: [{
                label: 'Active Users',
                data: data?.activeUsers.map(d => d.value),
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
              }]
            }}
          />
        </motion.div>

        {/* System Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold mb-4">System Resources (%)</h2>
          <Line
            data={{
              labels: data?.cpuUsage.map(d => new Date(d.timestamp).toLocaleTimeString()),
              datasets: [
                {
                  label: 'CPU Usage',
                  data: data?.cpuUsage.map(d => d.value),
                  borderColor: 'rgb(255, 159, 64)',
                  tension: 0.1
                },
                {
                  label: 'Memory Usage',
                  data: data?.memoryUsage.map(d => d.value),
                  borderColor: 'rgb(153, 102, 255)',
                  tension: 0.1
                }
              ]
            }}
          />
        </motion.div>
      </div>
    </div>
  )
} 