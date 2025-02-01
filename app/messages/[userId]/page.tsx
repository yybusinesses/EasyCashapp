'use client'
import React from 'react'
import { MessageList } from '@/components/messages/MessageList'
import { MessageInput } from '@/components/messages/MessageInput'
import { useAuth } from '@/contexts/AuthContext'

export default function ChatPage({ params }: { params: { userId: string } }) {
  const { user } = useAuth()
  const [refreshKey, setRefreshKey] = React.useState(0)

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto p-4">
      <MessageList key={refreshKey} />
      <MessageInput
        receiverId={params.userId}
        onMessageSent={() => setRefreshKey(prev => prev + 1)}
      />
    </div>
  )
} 