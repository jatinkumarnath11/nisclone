import { Request, Response, NextFunction } from 'express';
import { AttendanceService } from './attendance.service';
import { sendSuccess } from '../../utils/response.util';

export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  createSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session = await this.attendanceService.createSession(req.body);
      sendSuccess(res, session, 'Attendance session opened', 201);
    } catch (err) {
      next(err);
    }
  };

  markAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.attendanceService.markAttendance(req.body);
      sendSuccess(res, result, 'Attendance recorded successfully');
    } catch (err) {
      next(err);
    }
  };

  getStudentAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const records = await this.attendanceService.getStudentRecords(req.params.studentId);
      sendSuccess(res, records);
    } catch (err) {
      next(err);
    }
  };
}
