import { Queue, Worker, Job } from 'bullmq';
import { redis } from '../config/redis';
import { logger } from '../config/logger';

export interface NotificationJobData {
  userId: string;
  title: string;
  message: string;
  type: 'ATTENDANCE' | 'RESULT' | 'ASSIGNMENT' | 'FEE' | 'SYSTEM';
  linkUrl?: string;
  sendPush?: boolean;
}

export const NOTIFICATION_QUEUE_NAME = 'notification-queue';

export const notificationQueue = new Queue<NotificationJobData>(NOTIFICATION_QUEUE_NAME, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
  },
});

export const initNotificationWorker = (): Worker<NotificationJobData> => {
  const worker = new Worker<NotificationJobData>(
    NOTIFICATION_QUEUE_NAME,
    async (job: Job<NotificationJobData>) => {
      logger.info(
        `[NotificationJob] Dispatching notification to user: ${job.data.userId} [${job.data.title}]`
      );
      return { delivered: true, userId: job.data.userId };
    },
    { connection: redis }
  );

  worker.on('failed', (job, err) => {
    logger.error(`[NotificationJob] Job ${job?.id} failed: ${err.message}`);
  });

  return worker;
};
