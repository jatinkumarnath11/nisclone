export interface DepartmentSummary {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  isActive: boolean;
}

export interface ProgramSummary {
  id: string;
  departmentId: string;
  code: string;
  name: string;
  durationYears: number;
}

export interface AttendanceRecordSummary {
  id: string;
  sessionId: string;
  studentId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remarks?: string | null;
}
