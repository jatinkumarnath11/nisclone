import { z } from 'zod';
import { Gender } from '@ums/shared';

export const createFacultyProfileSchema = z.object({
  userId: z.string().uuid(),
  employeeId: z.string().min(3),
  departmentId: z.string().uuid(),
  designation: z.string().min(2),
  specialization: z.string().optional(),
  joiningDate: z.string().datetime().or(z.date()),
  gender: z.nativeEnum(Gender),
  qualification: z.string().min(2),
});

export const updateFacultyProfileSchema = createFacultyProfileSchema.partial().omit({ userId: true });

export type CreateFacultyProfileInput = z.infer<typeof createFacultyProfileSchema>;
