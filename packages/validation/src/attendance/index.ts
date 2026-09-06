import { z } from 'zod';
import { AttendanceStatus } from '@ums/shared';

export const createAttendanceSessionSchema = z.object({
  courseSectionId: z.string().uuid(),
  facultyId: z.string().uuid(),
  date: z.string().datetime().or(z.date()),
  startTime: z.string(),
  endTime: z.string(),
  topic: z.string().optional(),
});

export const recordAttendanceSchema = z.object({
  sessionId: z.string().uuid(),
  records: z.array(
    z.object({
      studentId: z.string().uuid(),
      status: z.nativeEnum(AttendanceStatus),
      remarks: z.string().optional(),
    })
  ).min(1, 'At least one student record is required'),
});

export type CreateAttendanceSessionInput = z.infer<typeof createAttendanceSessionSchema>;
export type RecordAttendanceInput = z.infer<typeof recordAttendanceSchema>;
