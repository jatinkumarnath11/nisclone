import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import usersRoutes from '../modules/users/users.routes';
import studentsRoutes from '../modules/students/students.routes';
import facultyRoutes from '../modules/faculty/faculty.routes';
import departmentsRoutes from '../modules/departments/departments.routes';
import programsRoutes from '../modules/programs/programs.routes';
import subjectsRoutes from '../modules/subjects/subjects.routes';
import enrollmentsRoutes from '../modules/enrollments/enrollments.routes';
import attendanceRoutes from '../modules/attendance/attendance.routes';
import assignmentsRoutes from '../modules/assignments/assignments.routes';
import examinationsRoutes from '../modules/examinations/examinations.routes';
import resultsRoutes from '../modules/results/results.routes';
import timetableRoutes from '../modules/timetable/timetable.routes';
import feesRoutes from '../modules/fees/fees.routes';
import paymentsRoutes from '../modules/payments/payments.routes';
import hostelRoutes from '../modules/hostel/hostel.routes';
import transportRoutes from '../modules/transport/transport.routes';
import canteenRoutes from '../modules/canteen/canteen.routes';
import noticesRoutes from '../modules/notices/notices.routes';
import notificationsRoutes from '../modules/notifications/notifications.routes';
import parentsRoutes from '../modules/parents/parents.routes';
import complaintsRoutes from '../modules/complaints/complaints.routes';
import documentsRoutes from '../modules/documents/documents.routes';
import auditLogsRoutes from '../modules/audit-logs/audit-logs.routes';

export const createV1Router = (): Router => {
  const router = Router();

  // Health check endpoint
  router.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'UMS API',
      version: '1.0.0',
    });
  });

  // Central module registration
  router.use('/auth', authRoutes);
  router.use('/users', usersRoutes);
  router.use('/students', studentsRoutes);
  router.use('/faculty', facultyRoutes);
  router.use('/parents', parentsRoutes);
  router.use('/departments', departmentsRoutes);
  router.use('/programs', programsRoutes);
  router.use('/subjects', subjectsRoutes);
  router.use('/enrollments', enrollmentsRoutes);
  router.use('/attendance', attendanceRoutes);
  router.use('/assignments', assignmentsRoutes);
  router.use('/exams', examinationsRoutes);
  router.use('/results', resultsRoutes);
  router.use('/timetable', timetableRoutes);
  router.use('/fees', feesRoutes);
  router.use('/payments', paymentsRoutes);
  router.use('/hostel', hostelRoutes);
  router.use('/transport', transportRoutes);
  router.use('/canteen', canteenRoutes);
  router.use('/notices', noticesRoutes);
  router.use('/notifications', notificationsRoutes);
  router.use('/complaints', complaintsRoutes);
  router.use('/documents', documentsRoutes);
  router.use('/audit-logs', auditLogsRoutes);

  return router;
};

export default createV1Router;
