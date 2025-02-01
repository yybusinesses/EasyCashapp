import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { calculateDistance } from '@/lib/distance'
import type { Project } from '@prisma/client'

interface ProjectQuery {
  where: {
    status: string;
    locationType?: string;
    AND?: Array<{
      [key: string]: any;
    }>;
  };
}

interface SearchParams {
  latitude?: string;
  longitude?: string;
  radius?: string;
  jobType?: string;
  skills?: string;
  minBudget?: string;
  maxBudget?: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const params: SearchParams = {
    latitude: searchParams.get('latitude') || undefined,
    longitude: searchParams.get('longitude') || undefined,
    radius: searchParams.get('radius') || undefined,
    jobType: searchParams.get('jobType') || undefined,
    skills: searchParams.get('skills') || undefined,
    minBudget: searchParams.get('minBudget') || undefined,
    maxBudget: searchParams.get('maxBudget') || undefined,
  }

  const query: ProjectQuery = {
    where: {
      status: 'open',
      ...(params.jobType && { locationType: params.jobType }),
      ...(params.skills && {
        skills: {
          hasSome: params.skills.split(',')
        }
      }),
      ...(params.minBudget || params.maxBudget ? {
        AND: [
          ...(params.minBudget ? [{ budgetMin: { gte: parseFloat(params.minBudget) } }] : []),
          ...(params.maxBudget ? [{ budgetMax: { lte: parseFloat(params.maxBudget) } }] : [])
        ]
      } : {})
    }
  }

  // For ON_SITE or HYBRID jobs, filter by distance if coordinates are provided
  if (params.latitude && params.longitude && params.radius && params.jobType !== 'REMOTE') {
    const projects = await prisma.project.findMany({
      where: {
        AND: [
          query.where,
          {
            NOT: {
              latitude: null,
              longitude: null,
            }
          }
        ]
      }
    })

    // Filter projects by distance
    const filteredProjects = projects.filter((project: Project) => {
      if (!project.latitude || !project.longitude) return false
      
      const distance = calculateDistance(
        Number(params.latitude),
        Number(params.longitude),
        project.latitude,
        project.longitude
      )
      
      return distance <= Number(params.radius)
    })

    return NextResponse.json(filteredProjects)
  }

  const projects = await prisma.project.findMany(query)
  return NextResponse.json(projects)
} 