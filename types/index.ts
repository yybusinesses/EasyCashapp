export interface Feature {
  title: string;
  description: string;
  icon: string;
  features: string[];
  color?: string;
  tags?: string[];
}

export interface MotionProps {
  initial: {
    opacity: number;
    y: number;
  };
  animate: {
    opacity: number;
    y: number;
  };
  className?: string;
  whileHover?: {
    scale: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'freelancer' | 'client' | 'admin';
  avatar?: string;
  skills?: string[];
  rating?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'in-progress' | 'completed';
  clientId: string;
  freelancerId?: string;
  createdAt: Date;
  deadline?: Date;
  skills: string[];
}

export interface Bid {
  id: string;
  projectId: string;
  freelancerId: string;
  amount: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  type: 'escrow' | 'release' | 'refund';
  createdAt: Date;
}

export interface Review {
  id: string;
  projectId: string;
  fromId: string;
  toId: string;
  rating: number;
  comment: string;
  createdAt: Date;
} 