'use client'
import React from 'react'

export function DataProtectionNotice() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6">
      <h3 className="font-semibold mb-2">Data Protection Notice</h3>
      <p className="text-sm text-gray-600">
        We process your data in accordance with GDPR and German data protection laws.
        Your data is stored securely in the EU. You can request your data or its deletion
        at any time. For more information, see our{' '}
        <a href="/privacy" className="text-blue-500 hover:underline">
          Privacy Policy
        </a>.
      </p>
    </div>
  )
} 