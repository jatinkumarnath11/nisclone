import { Queue, Worker, Job } from 'bullmq';
import { redis } from '../config/redis';
import { logger } from '../config/logger';

export interface EmailJobData {
  to: string;
  subject: string;
  body: string;
  template?: string;
  context?: Record<string, unknown>;
}

export const EMAIL_QUEUE_NAME = 'email-queue';

export const emailQueue = new Queue<EmailJobData>(EMAIL_QUEUE_NAME, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
  },
});

export const initEmailWorker = (): Worker<EmailJobData> => {
  const worker = new Worker<EmailJobData>(
    EMAIL_QUEUE_NAME,
    async (job: Job<EmailJobData>) => {
      logger.info(`[EmailJob] Processing email to: ${job.data.to} (Subject: "${job.data.subject}")`);
      // SMTP provider abstraction placeholder (Nodemailer)
      return { sent: true, recipient: job.data.to, processedAt: new Date().toISOString() };
    },
    { connection: redis }
  );

  worker.on('failed', (job, err) => {
    logger.error(`[EmailJob] Job ${job?.id} failed with error: ${err.message}`);
  });

  return worker;
};
