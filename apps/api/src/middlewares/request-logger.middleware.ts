import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../config/logger';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      id?: string;
      user?: {
        userId: string;
        email: string;
        roles: string[];
      };
    }
  }
}

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = (req.headers['x-request-id'] as string) || uuidv4();
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);

  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const userId = req.user?.userId;

    logger.info('HTTP Request Handled', {
      requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      userId: userId || 'anonymous',
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
  });

  next();
};
