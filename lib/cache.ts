import { Redis } from 'ioredis'
import { serialize, deserialize } from 'superjson'

const redis = new Redis(process.env.REDIS_URL!)

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  prefix?: string;
}

export async function cacheGet<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
  const prefixedKey = options.prefix ? `${options.prefix}:${key}` : key
  const cached = await redis.get(prefixedKey)
  return cached ? deserialize(cached) : null
}

export async function cacheSet<T>(
  key: string,
  value: T,
  options: CacheOptions = {}
): Promise<void> {
  const prefixedKey = options.prefix ? `${options.prefix}:${key}` : key
  const serialized = serialize(value)
  
  if (options.ttl) {
    await redis.setex(prefixedKey, options.ttl, serialized)
  } else {
    await redis.set(prefixedKey, serialized)
  }
}

export async function cacheInvalidate(key: string, options: CacheOptions = {}): Promise<void> {
  const prefixedKey = options.prefix ? `${options.prefix}:${key}` : key
  await redis.del(prefixedKey)
} 