'use client'
import React from 'react'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Secure Freelance Platform</h1>
        <p className="text-xl text-gray-600">Connect, Work, and Get Paid Securely</p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Secure Payments",
            description: "Fast and transparent payment system with built-in dispute resolution mechanisms. Get paid instantly upon task completion.",
            icon: "🔒"
          },
          {
            title: "Premium Features",
            description: "Boost your job postings for higher visibility. Access advanced analytics to understand performance metrics and trends.",
            icon: "⭐"
          },
          {
            title: "Review System",
            description: "Build trust through our reliable rating and feedback system. Showcase your reputation to potential clients.",
            icon: "⭐"
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: "1", title: "Post Job", description: "Create detailed job listings" },
            { step: "2", title: "Get Proposals", description: "Review qualified candidates" },
            { step: "3", title: "Work Together", description: "Collaborate seamlessly" },
            { step: "4", title: "Secure Payment", description: "Pay safely upon completion" },
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                {step.step}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 