'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { UserRole } from '@/types/shared'

interface ProfileOption {
  role: UserRole;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

const profileOptions: ProfileOption[] = [
  {
    role: 'client',
    title: 'I want to hire',
    description: 'Looking for talented professionals to work on projects',
    icon: '💼',
    benefits: [
      'Post projects and hire professionals',
      'Browse portfolios and skills',
      'Manage projects and payments',
      'Get work done efficiently'
    ]
  },
  {
    role: 'freelancer',
    title: 'I want to work',
    description: 'Looking for projects and opportunities to work',
    icon: '👨‍💻',
    benefits: [
      'Find projects matching your skills',
      'Build your professional profile',
      'Get paid securely',
      'Grow your career'
    ]
  }
]

interface ProfileTypeSelectorProps {
  onSelect: (role: UserRole) => void;
}

export const ProfileTypeSelector = ({ onSelect }: ProfileTypeSelectorProps) => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Join as a Client or Freelancer
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {profileOptions.map((option) => (
          <motion.div
            key={option.role}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg cursor-pointer"
            onClick={() => onSelect(option.role)}
          >
            <div className="text-4xl mb-4">{option.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{option.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {option.description}
            </p>
            <ul className="space-y-2">
              {option.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 