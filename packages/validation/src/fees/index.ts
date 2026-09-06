import { z } from 'zod';
import { PaymentStatus } from '@ums/shared';

export const createFeeStructureSchema = z.object({
  name: z.string().min(2),
  academicYearId: z.string().uuid(),
  programId: z.string().uuid().optional(),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  dueDate: z.string().datetime().or(z.date()),
  description: z.string().optional(),
});

export const createPaymentSchema = z.object({
  invoiceId: z.string().uuid(),
  studentId: z.string().uuid(),
  amount: z.number().positive(),
  paymentMethod: z.enum(['CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'ONLINE_GATEWAY', 'CHEQUE']),
  transactionRef: z.string().optional(),
});

export type CreateFeeStructureInput = z.infer<typeof createFeeStructureSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
