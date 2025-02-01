'use client'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { formatDistanceToNow } from 'date-fns'

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string | Date
  read: boolean
  sender?: {
    name: string | null
    email: string
  }
}

export function MessageList() {
  const { user } = useAuth()
  const [messages, setMessages] = React.useState<Message[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (user) {
      fetchMessages()
    }
  }, [user])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading messages...</div>

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg ${
            message.senderId === user?.id
              ? 'bg-blue-100 ml-auto'
              : 'bg-gray-100'
          } max-w-[80%]`}
        >
          <p className="text-gray-800">{message.content}</p>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </span>
        </div>
      ))}
    </div>
  )
} 