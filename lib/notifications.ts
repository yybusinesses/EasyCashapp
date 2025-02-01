import { io } from 'socket.io-client'

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001'
const socket = io(WEBSOCKET_URL)

interface PaymentNotification {
  type: 'subscription';
  status: 'success' | 'failed' | 'pending';
  amount: number;
  description: string;
}

export function sendPaymentNotification(userId: string, data: PaymentNotification) {
  socket.emit('notification', {
    userId,
    title: 'Payment Update',
    message: `Payment ${data.status}: €${data.amount} for ${data.description}`,
    type: data.status === 'success' ? 'success' : data.status === 'failed' ? 'error' : 'info'
  })
}

export function sendJobMatchNotification(userId: string, jobId: string) {
  socket.emit('notification', {
    userId,
    title: 'New Job Match!',
    message: 'A new job matching your skills is available',
    type: 'job_match',
    data: { jobId }
  })
} 