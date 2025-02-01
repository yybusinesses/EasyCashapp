import { NextRequest } from 'next/server'
import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

interface RateLimitConfig {
  limit: number
  windowMs: number
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = { limit: 60, windowMs: 60000 }
) {
  const ip = request.ip || '127.0.0.1'
  const key = `rate-limit:${ip}`

  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, config.windowMs / 1000)
  }

  return {
    current,
    isLimited: current > config.limit,
    limit: config.limit,
    remaining: Math.max(0, config.limit - current)
  }
} 