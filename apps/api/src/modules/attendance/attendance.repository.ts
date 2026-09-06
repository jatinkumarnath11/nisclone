import prisma, { AttendanceSession, AttendanceRecord, AttendanceStatusEnum } from '@ums/database';

export class AttendanceRepository {
  async createSession(data: {
    courseSectionId: string;
    facultyId: string;
    date: Date;
    startTime: string;
    endTime: string;
    topic?: string;
  }): Promise<AttendanceSession> {
    return prisma.attendanceSession.create({ data });
  }

  async recordAttendance(
    sessionId: string,
    records: { studentId: string; status: AttendanceStatusEnum; remarks?: string }[]
  ): Promise<void> {
    await prisma.$transaction(
      records.map((rec) =>
        prisma.attendanceRecord.upsert({
          where: {
            sessionId_studentId: {
              sessionId,
              studentId: rec.studentId,
            },
          },
          update: {
            status: rec.status,
            remarks: rec.remarks,
          },
          create: {
            sessionId,
            studentId: rec.studentId,
            status: rec.status,
            remarks: rec.remarks,
          },
        })
      )
    );
  }

  async getStudentAttendance(studentId: string): Promise<AttendanceRecord[]> {
    return prisma.attendanceRecord.findMany({
      where: { studentId },
      include: {
        session: {
          include: {
            courseSection: {
              include: { course: { include: { subject: true } } },
            },
          },
        },
      },
      orderBy: { session: { date: 'desc' } },
    });
  }
}
