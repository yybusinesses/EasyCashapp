'use client'
import React from 'react'

export default function Integrations() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Integrations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Processors */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Payment Processors</h2>
          <p className="text-gray-600 mb-4">
            Seamless and low-cost international payment processing through trusted partners.
          </p>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">Stripe</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">PayPal</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">Wise</span>
          </div>
        </div>

        {/* Insurance Providers */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Insurance Protection</h2>
          <p className="text-gray-600 mb-4">
            Worker protection against accidents or issues while performing tasks.
          </p>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Filock</span>
          </div>
        </div>

        {/* Cloud Infrastructure */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Cloud Infrastructure</h2>
          <p className="text-gray-600 mb-4">
            Scalable cloud solutions ensuring reliable performance as user demand grows.
          </p>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">AWS</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">Google Cloud</span>
          </div>
        </div>

        {/* AI Providers */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">AI Solutions</h2>
          <p className="text-gray-600 mb-4">
            Advanced AI for job matching and predictive analytics to enhance user experience.
          </p>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded">Custom AI</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded">Analytics</span>
          </div>
        </div>

        {/* Marketing Platforms */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Marketing Integration</h2>
          <p className="text-gray-600 mb-4">
            Integrated marketing solutions for targeted advertising and growth.
          </p>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded">Google Ads</span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded">Social Media</span>
          </div>
        </div>
      </div>
    </div>
  )
} 