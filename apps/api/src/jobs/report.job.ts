import { Queue, Worker, Job } from 'bullmq';
import { redis } from '../config/redis';
import { logger } from '../config/logger';

export interface ReportJobData {
  reportType: 'ACADEMIC' | 'FINANCIAL' | 'ATTENDANCE' | 'AUDIT';
  requestedBy: string;
  parameters: Record<string, unknown>;
}

export const REPORT_QUEUE_NAME = 'report-queue';

export const reportQueue = new Queue<ReportJobData>(REPORT_QUEUE_NAME, {
  connection: redis,
  defaultJobOptions: {
    attempts: 2,
    removeOnComplete: true,
  },
});

export const initReportWorker = (): Worker<ReportJobData> => {
  const worker = new Worker<ReportJobData>(
    REPORT_QUEUE_NAME,
    async (job: Job<ReportJobData>) => {
      logger.info(
        `[ReportJob] Generating ${job.data.reportType} report requested by ${job.data.requestedBy}`
      );
      return { reportUrl: `/downloads/reports/${job.id}.pdf`, completed: true };
    },
    { connection: redis }
  );

  worker.on('failed', (job, err) => {
    logger.error(`[ReportJob] Job ${job?.id} failed: ${err.message}`);
  });

  return worker;
};
