import { z } from 'zod';
import { Gender } from '@ums/shared';

export const createStudentProfileSchema = z.object({
  userId: z.string().uuid(),
  admissionNumber: z.string().min(3),
  rollNumber: z.string().min(1),
  programId: z.string().uuid(),
  currentSemester: z.number().int().min(1).max(12).default(1),
  dateOfBirth: z.string().datetime().or(z.date()),
  gender: z.nativeEnum(Gender),
  bloodGroup: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
});

export const updateStudentProfileSchema = createStudentProfileSchema.partial().omit({ userId: true });

export type CreateStudentProfileInput = z.infer<typeof createStudentProfileSchema>;
