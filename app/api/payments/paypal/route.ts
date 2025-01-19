import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from '@/lib/auth'
import { sendPaymentNotification } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, amount, description } = body

    // Verify payment with PayPal
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PAYPAL_SECRET}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      sendPaymentNotification(user.id, {
        type: 'payment',
        status: 'failed',
        amount,
        description
      })
      throw new Error('Payment verification failed')
    }

    // Record payment in database
    await prisma.payment.create({
      data: {
        userId: user.id,
        amount,
        paymentMethod: 'PAYPAL',
        status: 'COMPLETED',
        paypalOrderId: orderId,
        description
      }
    })

    // Send success notification
    sendPaymentNotification(user.id, {
      type: 'payment',
      status: 'success',
      amount,
      description
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    )
  }
} 