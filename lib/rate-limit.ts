import { redis } from './redis';

export const rateLimit = async (
  identifier: string,
  limit: number,
  windowMs: number,
) => {
  const key = `rate-limit:${identifier}`;
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, Math.floor(windowMs / 1000));
  }
  if (current > limit) {
    throw new Error('Rate limit exceeded');
  }
};
