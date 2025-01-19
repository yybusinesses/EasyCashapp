'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BaseComponentProps } from '@/types/shared'

interface LoadingSkeletonProps extends BaseComponentProps {
  count?: number;
}

export const LoadingSkeleton = ({ count = 3, className }: LoadingSkeletonProps) => (
  <div className={`space-y-8 ${className}`}>
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
) 