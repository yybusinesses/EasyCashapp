'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { Feature, MotionProps } from '@/types'

const motionProps: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

interface Assessment {
  id: string;
  skillName: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'pending' | 'completed' | 'failed';
}

export default function SkillVerification() {
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);

  const features: Feature[] = [
    {
      title: "Real-time Skill Assessment",
      description: "Live coding/skill demonstrations with AI analysis for instant verification",
      icon: "🎯",
      features: ["Live Assessment", "AI Analysis", "Instant Results"],
      color: "blue"
    },
    {
      title: "Blockchain Certificates",
      description: "Tamper-proof skill certificates stored on blockchain for permanent verification",
      icon: "🔐",
      features: ["NFT Certificates", "Permanent Record", "Shareable"],
      color: "purple"
    },
    {
      title: "Peer Review System",
      description: "Expert review system with reputation-based weighting",
      icon: "👥",
      features: ["Expert Validation", "Community Review", "Reputation System"],
      color: "green"
    }
  ]

  const startAssessment = async (skill: string) => {
    setIsAssessing(true);
    // Implement real-time assessment logic
    try {
      // Mock API call
      const response = await fetch('/api/assessment/start', {
        method: 'POST',
        body: JSON.stringify({ skill })
      });
      const assessment = await response.json();
      setActiveAssessment(assessment);
    } catch (error) {
      console.error('Failed to start assessment:', error);
    }
    setIsAssessing(false);
  };

  const mintCertificate = async (assessmentId: string) => {
    try {
      // Implement blockchain certificate minting
      const response = await fetch('/api/certificates/mint', {
        method: 'POST',
        body: JSON.stringify({ assessmentId })
      });
      const certificate = await response.json();
      // Handle success
    } catch (error) {
      console.error('Failed to mint certificate:', error);
    }
  };

  return (
    <motion.div {...motionProps} className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Skill Verification
        </h1>
        <p className="text-xl text-gray-600">
          Verify your skills with AI-powered assessments and blockchain certificates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
            <p className="text-gray-600 mb-6">{feature.description}</p>
            
            {/* Assessment Button */}
            <button
              onClick={() => startAssessment(feature.title)}
              disabled={isAssessing}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
            >
              {isAssessing ? 'Starting Assessment...' : 'Start Assessment'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Active Assessment Modal */}
      {activeAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">
              {activeAssessment.skillName} Assessment
            </h2>
            {/* Assessment Interface */}
            {/* Add your assessment interface here */}
          </div>
        </div>
      )}
    </motion.div>
  )
} 