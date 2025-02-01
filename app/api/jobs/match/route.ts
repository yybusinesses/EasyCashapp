import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { sendJobMatchNotification } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const { userId, jobId } = await request.json()

    // Get user skills
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { skills: true }
    })

    // Get job skills
    const job = await prisma.project.findUnique({
      where: { id: jobId },
      select: { skills: true }
    })

    if (!user || !job) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Check if skills match
    const matchingSkills = user.skills.filter(skill => 
      job.skills.includes(skill)
    )

    if (matchingSkills.length > 0) {
      sendJobMatchNotification(userId, jobId)
      return NextResponse.json({ matched: true, matchingSkills })
    }

    return NextResponse.json({ matched: false })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process match' },
      { status: 500 }
    )
  }
} 