'use client'
import React, { useState } from 'react'

export function AgeVerification() {
  const [verified, setVerified] = useState(false)

  if (verified) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Age Verification</h2>
        <p className="mb-4">You must be 18 or older to use this service.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Exit
          </button>
          <button
            onClick={() => setVerified(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            I am 18 or older
          </button>
        </div>
      </div>
    </div>
  )
} 