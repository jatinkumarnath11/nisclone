import winston from 'winston';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Custom log format for readable local development
const devLogFormat = printf(({ level, message, timestamp, stack, requestId, userId, ...meta }) => {
  const reqStr = requestId ? ` [Req: ${requestId}]` : '';
  const userStr = userId ? ` [User: ${userId}]` : '';
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] ${level}${reqStr}${userStr}: ${message || stack}${metaStr}`;
});

const isProduction = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    errors({ stack: true }),
    isProduction ? json() : combine(colorize(), devLogFormat)
  ),
  defaultMeta: { service: 'ums-api' },
  transports: [
    new winston.transports.Console(),
  ],
});
