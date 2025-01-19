'use client'
import { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Toast } from '@/components/Toast'

interface PayPalButtonProps {
  amount: number;
  description: string;
  onSuccess: (details: any) => void;
}

export function PayPalButton({ amount, description, onSuccess }: PayPalButtonProps) {
  const [error, setError] = useState<string | null>(null)

  return (
    <div>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description,
                amount: {
                  value: amount.toString(),
                  currency_code: "EUR"
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture()
            onSuccess(details)
          }
        }}
        onError={(err) => {
          setError('Payment failed. Please try again.')
          console.error('PayPal Error:', err)
        }}
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