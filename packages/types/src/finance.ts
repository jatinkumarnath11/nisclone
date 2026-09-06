export interface FeeStructureSummary {
  id: string;
  name: string;
  academicYearId: string;
  programId?: string | null;
  amount: number;
  currency: string;
  dueDate: Date;
}

export interface InvoiceSummary {
  id: string;
  invoiceNumber: string;
  studentId: string;
  amount: number;
  paidAmount: number;
  status: 'PENDING' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED';
  dueDate: Date;
}
