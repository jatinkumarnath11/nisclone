import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ValidationError } from '../utils/errors.util';

export const validateBody = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMap = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        next(new ValidationError('Request body validation failed', errorMap));
      } else {
        next(error);
      }
    }
  };
};

export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMap = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        next(new ValidationError('Query parameter validation failed', errorMap));
      } else {
        next(error);
      }
    }
  };
};
