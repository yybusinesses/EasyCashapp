import { NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all user data
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profile: true,
        projects: true,
        // Include all relevant relations
      }
    })

    // Generate downloadable format
    const exportData = {
      personalData: {
        name: userData.name,
        email: userData.email,
        // Add other personal data
      },
      profile: userData.profile,
      projects: userData.projects,
      // Add other data categories
      exportDate: new Date().toISOString(),
    }

    return NextResponse.json(exportData, {
      headers: {
        'Content-Disposition': 'attachment; filename="user-data.json"'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Schedule deletion (usually with 30-day grace period)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        deletionScheduled: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    })

    return NextResponse.json({ message: 'Deletion scheduled' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to schedule deletion' },
      { status: 500 }
    )
  }
} 