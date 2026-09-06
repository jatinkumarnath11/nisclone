import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { createApp } from './app';
import { logger } from './config/logger';
import { initSocketServer } from './realtime/socket';
import { initEmailWorker } from './jobs/email.job';
import { initNotificationWorker } from './jobs/notification.job';
import { initReportWorker } from './jobs/report.job';

const PORT = process.env.PORT || 5001;

async function bootstrap() {
  const app = createApp();
  const httpServer = http.createServer(app);

  // Initialize Real-time Socket.IO server
  initSocketServer(httpServer);

  // Initialize Background BullMQ Workers
  try {
    initEmailWorker();
    initNotificationWorker();
    initReportWorker();
    logger.info('Background job workers initialized');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn(`BullMQ workers initialized in offline mode (Redis optional in local setup): ${message}`);
  }

  httpServer.listen(PORT, () => {
    logger.info(`==================================================`);
    logger.info(`🚀 Apex UMS API Server running on port ${PORT}`);
    logger.info(`📡 API Base: http://localhost:${PORT}/api/v1`);
    logger.info(`📚 Swagger Docs: http://localhost:${PORT}/api/docs`);
    logger.info(`⚡ Socket.IO Ready: http://localhost:${PORT}`);
    logger.info(`==================================================`);
  });

  // Graceful shutdown handling
  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}. Shutting down HTTP server gracefully...`);
    httpServer.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
