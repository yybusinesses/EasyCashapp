'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/contexts/AuthContext'

export function LanguagePreference() {
  const t = useTranslations('settings')
  const { user, updateUserSettings } = useAuth()

  const handleLanguageChange = async (language: string) => {
    try {
      const response = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferredLanguage: language })
      })

      if (!response.ok) throw new Error('Failed to update language preference')
      
      updateUserSettings({ preferredLanguage: language })
    } catch (error) {
      console.error('Failed to update language:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t('language.title')}</h3>
      <p className="text-gray-600">{t('language.description')}</p>
      
      <select
        value={user?.preferredLanguage || 'en'}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
    </div>
  )
} 