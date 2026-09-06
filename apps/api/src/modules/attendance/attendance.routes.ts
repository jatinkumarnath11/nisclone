import { Router } from 'express';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AttendanceRepository } from './attendance.repository';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';
import { validateBody } from '../../middlewares/validate.middleware';
import { createAttendanceSessionSchema, recordAttendanceSchema } from '@ums/validation';
import { UserRole } from '@ums/shared';

const attendanceRepo = new AttendanceRepository();
const attendanceService = new AttendanceService(attendanceRepo);
const attendanceController = new AttendanceController(attendanceService);

const router = Router();
router.use(authenticate);

router.post(
  '/sessions',
  requireRoles(UserRole.ADMIN, UserRole.FACULTY),
  validateBody(createAttendanceSessionSchema),
  attendanceController.createSession
);

router.post(
  '/records',
  requireRoles(UserRole.ADMIN, UserRole.FACULTY),
  validateBody(recordAttendanceSchema),
  attendanceController.markAttendance
);

router.get('/student/:studentId', attendanceController.getStudentAttendance);

export default router;
