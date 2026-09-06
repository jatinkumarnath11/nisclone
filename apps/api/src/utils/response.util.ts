import { Response } from 'express';

export interface StandardApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200
): Response => {
  const payload: StandardApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(payload);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  details?: unknown,
  code = 'ERROR'
): Response => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  });
};
