'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ProfileTypeSelector } from '@/components/ProfileTypeSelector'
import { UserRole } from '@/types/shared'
import { useAuth } from '@/contexts/AuthContext'

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const { signup } = useAuth()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    // Navigate to specific registration form
    window.location.href = `/auth/signup/${role}`
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <ProfileTypeSelector onSelect={handleRoleSelect} />
    </div>
  )
} 