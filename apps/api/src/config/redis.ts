import Redis from 'ioredis';
import { logger } from './logger';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  lazyConnect: true,
  enableReadyCheck: false,
});

redis.on('connect', () => {
  logger.info('Connected to Redis server');
});

redis.on('error', (err) => {
  logger.warn(`Redis connection error (may be offline during local dev without Docker): ${err.message}`);
});

export const createRedisSubscriber = (): Redis => {
  return new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    lazyConnect: true,
  });
};
