import { ReactNode } from 'react'

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface SearchableEntity {
  id: string;
  title: string;
  type: 'project' | 'user' | 'skill' | 'course';
  description?: string;
  tags?: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export type UserRole = 'client' | 'freelancer' | 'admin';

export interface UserProfile {
  id: string;
  userId: string;
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  timezone?: string;
  companyName?: string;
  industry?: string;
  projectsPosted?: number;
  totalHires?: number;
  skills?: string[];
  hourlyRate?: number;
  availability?: 'full-time' | 'part-time' | 'not-available';
  experience?: number;
  completedProjects?: number;
  portfolio?: ProjectReference[];
  certifications?: Certification[];
}

interface ProjectReference {
  id: string;
  title: string;
  description: string;
  url?: string;
  images?: string[];
  technologies: string[];
  completionDate: Date;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  verificationUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'freelancer' | 'client' | 'admin';
  skills: string[];
  rating: number;
  completedProjects: number;
  verified: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  location: {
    type: 'REMOTE' | 'ON_SITE' | 'HYBRID';
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    address?: string;
    radius?: number; // in kilometers
    country?: string;
    city?: string;
  };
  skills: string[];
  timeline: {
    deadline: Date;
    milestones: Milestone[];
  };
  status: 'draft' | 'open' | 'in-progress' | 'completed' | 'cancelled';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  deadline: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'disputed';
}

export interface SearchFilters {
  location?: {
    latitude: number;
    longitude: number;
    radius: number; // in kilometers
  };
  jobType?: ('REMOTE' | 'ON_SITE' | 'HYBRID')[];
  skills?: string[];
  budget?: {
    min?: number;
    max?: number;
  };
  availability?: string;
} 