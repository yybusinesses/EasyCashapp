'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaMoneyBillWave, FaMapMarkerAlt, FaBriefcase, FaPencilAlt, FaTruck, FaStar } from 'react-icons/fa'
import Image from 'next/image'
import { JobType } from '@/types/job'
import { analyzeJobMatch, getJobRecommendations } from '@/services/ai'
import AIChatbot from './AIChatbot'
import { IconType } from 'react-icons'

const initialJobs: JobType[] = [
  { 
    id: 1, 
    title: 'Dog Walker Needed', 
    pay: '$20', 
    payType: 'Per hour', 
    location: 'New York, NY', 
    description: 'Looking for a reliable dog walker for daily walks.', 
    explanation: 'Perfect for animal lovers! Help keep pets healthy and happy with regular exercise.',
    image: '/placeholder.svg?height=200&width=300',
    icon: FaBriefcase
  },
  { 
    id: 2, 
    title: 'Freelance Web Designer', 
    pay: '$500', 
    payType: 'Per project', 
    location: 'Remote', 
    description: 'Need a creative web designer for a small business website.', 
    explanation: 'Showcase your design skills and help businesses establish their online presence.',
    image: '/placeholder.svg?height=200&width=300',
    icon: FaPencilAlt
  },
  { 
    id: 3, 
    title: 'Moving Help', 
    pay: '$100', 
    payType: 'Per project', 
    location: 'Los Angeles, CA', 
    description: 'Need help moving furniture to my new apartment.', 
    explanation: 'Great for those who enjoy physical work and helping others settle into new homes.',
    image: '/placeholder.svg?height=200&width=300',
    icon: FaTruck
  },
]

export default function JobSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [jobs, setJobs] = useState<JobType[]>(initialJobs)
  const [userPreferences, setUserPreferences] = useState("Looking for flexible work opportunities with good pay. Interested in both remote and local work.")

  useEffect(() => {
    // Get AI recommendations when component mounts
    const getRecommendations = async () => {
      const recommendedJobs = await getJobRecommendations(initialJobs, userPreferences);
      setJobs(recommendedJobs);
    };
    getRecommendations();
  }, []);

  useEffect(() => {
    // Analyze match score for current job
    const analyzeCurrentJob = async () => {
      const score = await analyzeJobMatch(jobs[currentIndex], userPreferences);
      const updatedJobs = [...jobs];
      updatedJobs[currentIndex] = { ...updatedJobs[currentIndex], matchScore: score };
      setJobs(updatedJobs);
    };
    analyzeCurrentJob();
  }, [currentIndex, jobs, userPreferences]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      console.log('Job accepted:', jobs[currentIndex])
      // Here you would typically handle job acceptance logic
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length)
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
      <div className="relative w-full h-[600px]">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full"
          >
            <Card className="w-full h-full overflow-hidden shadow-lg rounded-2xl bg-white">
              <div className="relative w-full h-48">
                <Image
                  src={jobs[currentIndex].image}
                  alt={jobs[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
                {jobs[currentIndex].matchScore && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
                    <FaStar className="w-4 h-4 mr-1" />
                    {jobs[currentIndex].matchScore}% Match
                  </div>
                )}
              </div>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-4">
                  {jobs[currentIndex].icon && (
                    <div className="w-12 h-12 text-blue-500">
                      {React.createElement(jobs[currentIndex].icon)}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-2 text-blue-800">{jobs[currentIndex].title}</h2>
                <p className="flex items-center justify-center text-sm mb-1 text-blue-600">
                  <FaMoneyBillWave className="w-4 h-4 mr-1" />
                  {jobs[currentIndex].pay} {jobs[currentIndex].payType}
                </p>
                <p className="flex items-center justify-center text-sm mb-4 text-blue-600">
                  <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                  {jobs[currentIndex].location}
                </p>
                <p className="text-blue-700 mb-4">{jobs[currentIndex].description}</p>
                <p className="text-sm text-blue-600 italic">{jobs[currentIndex].explanation}</p>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4 p-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleSwipe('left')} 
                  className="rounded-full w-14 h-14 p-0 border-2 border-red-500 text-red-500 hover:bg-red-50"
                >
                  ✕
                </Button>
                <Button 
                  onClick={() => handleSwipe('right')} 
                  className="rounded-full w-14 h-14 p-0 bg-blue-500 text-white hover:bg-blue-600"
                >
                  ✓
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      <AIChatbot currentJob={jobs[currentIndex]} />
    </div>
  )
} 