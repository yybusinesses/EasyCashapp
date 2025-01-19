'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BaseComponentProps } from '@/types/shared'

interface Step {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressTrackerProps extends BaseComponentProps {
  steps: Step[];
  currentStep?: number;
}

export const ProgressTracker = ({ steps, className }: ProgressTrackerProps) => {
  return (
    <div className={`py-8 ${className}`}>
      <div className="flex justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700" />
        
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center flex-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                step.status === 'completed'
                  ? 'bg-green-500'
                  : step.status === 'current'
                  ? 'bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              } text-white`}
            >
              {step.status === 'completed' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </motion.div>
            <div className="mt-4 text-center max-w-xs mx-auto">
              <div className="font-semibold text-gray-900 dark:text-white">
                {step.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 