'use client'
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotificationStore } from '@/store/notifications'
import { io } from 'socket.io-client'

export function NotificationSystem() {
  const { notifications, addNotification, removeNotification } = useNotificationStore()

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL!)
    
    socket.on('notification', (data) => {
      addNotification({
        id: Date.now().toString(),
        title: data.title,
        message: data.message,
        type: data.type,
        createdAt: new Date()
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [addNotification])

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            } text-white`}
          >
            <h4 className="font-semibold">{notification.title}</h4>
            <p>{notification.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 