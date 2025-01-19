import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import prisma from '@/lib/db'

export async function verifyAuth(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true }
    })

    if (!user) throw new Error('User not found')

    return user
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export async function getUser() {
  const token = cookies().get('token')?.value

  if (!token) return null

  try {
    const user = await verifyAuth(token)
    return user
  } catch (error) {
    return null
  }
} 