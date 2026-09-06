import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.util';
import { logger } from '../config/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const isProduction = process.env.NODE_ENV === 'production';
  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected internal error occurred. Please contact support.';
  let details: unknown = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
    errorCode = err.constructor.name.toUpperCase();
  } else if (err.name === 'PrismaClientKnownRequestError') {
    // Handle Prisma specific constraints
    statusCode = 400;
    errorCode = 'DATABASE_CONSTRAINT_ERROR';
    message = 'A database integrity constraint was violated';
  }

  // Structured error logging
  logger.error(`[${req.method}] ${req.originalUrl} - ${statusCode} - ${err.message}`, {
    requestId: req.id,
    userId: req.user?.userId,
    stack: isProduction ? undefined : err.stack,
    details,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details ? { details } : {}),
      ...(!isProduction && err.stack ? { stack: err.stack } : {}),
    },
    timestamp: new Date().toISOString(),
  });
};
