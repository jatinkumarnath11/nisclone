import { AttendanceRepository } from './attendance.repository';
import { CreateAttendanceSessionInput, RecordAttendanceInput } from '@ums/validation';
import { AttendanceStatusEnum } from '@ums/database';

export class AttendanceService {
  constructor(private attendanceRepo: AttendanceRepository) {}

  async createSession(input: CreateAttendanceSessionInput) {
    return this.attendanceRepo.createSession({
      ...input,
      date: new Date(input.date),
    });
  }

  async markAttendance(input: RecordAttendanceInput) {
    await this.attendanceRepo.recordAttendance(
      input.sessionId,
      input.records.map((r) => ({
        studentId: r.studentId,
        status: r.status as AttendanceStatusEnum,
        remarks: r.remarks,
      }))
    );
    return { success: true, count: input.records.length };
  }

  async getStudentRecords(studentId: string) {
    return this.attendanceRepo.getStudentAttendance(studentId);
  }
}
