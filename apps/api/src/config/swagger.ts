import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'University Management System (UMS) API',
    version: '1.0.0',
    description:
      'Production-grade REST API for Apex University Management System with JWT, RBAC, Real-time Socket.IO, and Background Jobs.',
  },
  servers: [
    {
      url: '/api/v1',
      description: 'Primary API v1 Server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Authenticate user with email and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'admin@ums.edu' },
                  password: { type: 'string', example: 'DevPassword123!' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Authenticated successfully' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user profile and roles',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Current authenticated user profile' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Health check endpoint',
        responses: {
          200: { description: 'System healthy' },
        },
      },
    },
  },
};

export const setupSwagger = (app: Express): void => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
};
