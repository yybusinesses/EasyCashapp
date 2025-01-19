'use client'
import { useState } from 'react'
import { PayPalButton } from './payments/PayPalButton'
import { Toast } from './Toast'

interface ProjectPaymentProps {
  projectId: string;
  amount: number;
  description: string;
}

export function ProjectPayment({ projectId, amount, description }: ProjectPaymentProps) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePaymentSuccess = async (details: any) => {
    try {
      const response = await fetch('/api/payments/paypal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: details.id,
          amount,
          projectId,
        })
      })

      if (!response.ok) throw new Error('Failed to verify payment')

      setSuccess(true)
    } catch (err) {
      setError('Payment verification failed')
      console.error(err)
    }
  }

  if (success) {
    return (
      <div className="text-center py-4">
        <h3 className="text-xl font-semibold text-green-600">Payment Successful!</h3>
        <p className="text-gray-600 mt-2">Thank you for your payment.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <div className="mb-6">
        <p className="text-gray-600">Amount: €{amount}</p>
        <p className="text-gray-600">Description: {description}</p>
      </div>

      <PayPalButton
        amount={amount}
        description={description}
        onSuccess={handlePaymentSuccess}
      />

      {error && (
        <Toast
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  )
} 