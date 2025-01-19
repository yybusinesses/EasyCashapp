'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const handleAcceptAll = () => {
    setSettings({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    })
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    })
    setShow(false)
  }

  const handleSaveSettings = () => {
    saveConsent(settings)
    setShow(false)
  }

  const saveConsent = (settings: CookieSettings) => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      ...settings,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }))
  }

  if (!show) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 p-4"
    >
      <div className="max-w-6xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Cookie Settings</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          We use cookies to improve your experience. Please select your preferences below.
          For more information, please see our{' '}
          <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.necessary}
                disabled
                className="mr-2"
              />
              <span>Necessary (Required)</span>
            </label>
            <span className="text-sm text-gray-500">Always active</span>
          </div>

          {Object.entries(settings).map(([key, value]) => {
            if (key === 'necessary') return null
            return (
              <div key={key} className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    className="mr-2"
                  />
                  <span className="capitalize">{key}</span>
                </label>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            Save Settings
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Accept All
          </button>
        </div>
      </div>
    </motion.div>
  )
} 