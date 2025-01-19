'use client'
import React from 'react'

export default function Payments() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Secure Payment System</h1>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Protection Features</h2>
          <div className="space-y-4">
            {[
              {
                title: "Escrow Protection",
                description: "Funds are held securely until work is completed and approved"
              },
              {
                title: "Instant Payments",
                description: "Get paid immediately after work approval"
              },
              {
                title: "Dispute Resolution",
                description: "Fair and transparent dispute resolution process"
              },
              {
                title: "Payment History",
                description: "Complete transaction history and payment tracking"
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 