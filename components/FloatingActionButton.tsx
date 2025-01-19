'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BaseComponentProps } from '@/types/shared'

interface Action {
  icon: string;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FABProps extends BaseComponentProps {
  actions: Action[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const positionClasses = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6'
}

export const FloatingActionButton = ({ 
  actions, 
  position = 'bottom-right',
  className 
}: FABProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed ${positionClasses[position]} ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 space-y-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 rounded-full ${
                  action.color || 'bg-blue-500'
                } text-white shadow-lg flex items-center justify-center tooltip`}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                data-tip={action.label}
              >
                {action.icon}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center text-2xl"
      >
        {isOpen ? '×' : '+'}
      </motion.button>
    </div>
  );
}; 