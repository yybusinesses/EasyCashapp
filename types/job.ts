import { IconType } from 'react-icons'

export interface JobType {
  id: number
  title: string
  pay: string
  payType: string
  location: string
  description: string
  explanation: string
  image: string
  icon: IconType
  matchScore?: number
} 