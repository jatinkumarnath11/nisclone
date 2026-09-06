import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { requestLogger } from './middlewares/request-logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { createV1Router } from './routes';
import { setupSwagger } from './config/swagger';
import { NotFoundError } from './utils/errors.util';

export const createApp = (): Express => {
  const app = express();

  // 1. Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    })
  );

  // 2. CORS configuration
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.CORS_ORIGIN || 'http://localhost:3000',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    })
  );

  // 3. Global Rate Limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many requests from this IP, please try again later.',
      },
    },
  });
  app.use('/api', limiter);

  // 4. Request Body Parsing & Limits
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 5. Request Logging & Correlation ID
  app.use(requestLogger);

  // 6. Swagger API Documentation
  setupSwagger(app);

  // 7. Core API Routes
  app.use('/api/v1', createV1Router());

  // 8. 404 Handler for undefined routes
  app.use('*', (req) => {
    throw new NotFoundError(`Endpoint ${req.method} ${req.originalUrl} does not exist`);
  });

  // 9. Centralized Error Handler
  app.use(errorHandler);

  return app;
};

export default createApp;
