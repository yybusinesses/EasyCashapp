'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, MapPin, Clock } from 'lucide-react'

const jobs = [
  { id: 1, title: 'Dog Walker Needed', pay: '$20', payType: 'Per hour', location: 'New York, NY', description: 'Looking for a reliable dog walker for daily walks.', color: 'bg-blue-100' },
  { id: 2, title: 'Freelance Web Designer', pay: '$500', payType: 'Per project', location: 'Remote', description: 'Need a creative web designer for a small business website.', color: 'bg-green-100' },
  { id: 3, title: 'Moving Help', pay: '$100', payType: 'Per project', location: 'Los Angeles, CA', description: 'Need help moving furniture to my new apartment.', color: 'bg-yellow-100' },
]

export default function JobSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      console.log('Job accepted:', jobs[currentIndex])
      // Here you would typically handle job acceptance logic
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length)
  }

  return (
    <div className="relative w-full h-[70vh]">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full"
        >
          <Card className={`w-full h-full overflow-hidden shadow-lg ${jobs[currentIndex].color}`}>
            <CardHeader className="bg-white bg-opacity-80 backdrop-blur-sm">
              <CardTitle className="text-2xl font-bold text-blue-600">{jobs[currentIndex].title}</CardTitle>
              <CardDescription className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-1" />
                {jobs[currentIndex].pay} {jobs[currentIndex].payType}
              </CardDescription>
              <CardDescription className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {jobs[currentIndex].location}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-lg text-gray-700">{jobs[currentIndex].description}</p>
            </CardContent>
            <CardFooter className="flex justify-between bg-white bg-opacity-80 backdrop-blur-sm">
              <Button variant="outline" onClick={() => handleSwipe('left')} className="bg-white hover:bg-red-100 text-red-500 border-red-500">
                Pass
              </Button>
              <Button onClick={() => handleSwipe('right')} className="bg-green-500 hover:bg-green-600 text-white">
                Accept
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

