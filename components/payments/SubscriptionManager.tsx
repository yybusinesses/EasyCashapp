'use client'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Toast } from '@/components/Toast'

interface Subscription {
  id: string;
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  currentPeriodEnd: string;
  price: number;
}

interface SubscriptionError {
  message: string;
}

const plans = {
  BASIC: {
    name: 'Basic Plan',
    price: 29,
    features: ['Basic Features', '5 Projects', 'Email Support']
  },
  PRO: {
    name: 'Pro Plan',
    price: 99,
    features: ['Advanced Features', 'Unlimited Projects', 'Priority Support']
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 299,
    features: ['Custom Features', 'Dedicated Support', 'SLA Guarantee']
  }
}

export function SubscriptionManager() {
  const [error, setError] = useState<string | null>(null)

  const { data: subscription, isLoading } = useQuery<Subscription, SubscriptionError>({
    queryKey: ['subscription'],
    queryFn: async () => {
      const response = await fetch('/api/subscription')
      if (!response.ok) throw new Error('Failed to fetch subscription')
      return response.json()
    }
  })

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Failed to cancel subscription')
      return response.json()
    },
    onError: (error: Error) => {
      setError(error.message)
    }
  })

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      await cancelMutation.mutateAsync()
    }
  }

  if (isLoading) {
    return <div className="animate-pulse">Loading subscription...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Subscription Management</h2>

      {subscription ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {plans[subscription.plan].name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Status: {subscription.status}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Renews: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={handleCancel}
              disabled={subscription.status !== 'ACTIVE'}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(plans).map(([key, plan]) => (
            <div key={key} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">€{plan.price}/mo</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.location.href = `/payments/subscribe/${key.toLowerCase()}`}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      )}

      {cancelMutation.isError && (
        <Toast
          type="error"
          message="Failed to cancel subscription"
          onClose={() => cancelMutation.reset()}
        />
      )}
    </div>
  )
} 