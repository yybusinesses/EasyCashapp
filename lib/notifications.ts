import { io } from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL!)

export function sendPaymentNotification(userId: string, data: {
  type: 'payment' | 'subscription';
  status: 'success' | 'failed' | 'pending';
  amount: number;
  description: string;
}) {
  socket.emit('notification', {
    userId,
    title: 'Payment Update',
    message: `${data.type === 'payment' ? 'Payment' : 'Subscription'} ${data.status}: €${data.amount} for ${data.description}`,
    type: data.status === 'success' ? 'success' : data.status === 'failed' ? 'error' : 'info'
  })
} 