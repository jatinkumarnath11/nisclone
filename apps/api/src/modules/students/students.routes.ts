import { Router } from 'express';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsRepository } from './students.repository';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';
import { UserRole } from '@ums/shared';

const studentsRepo = new StudentsRepository();
const studentsService = new StudentsService(studentsRepo);
const studentsController = new StudentsController(studentsService);

const router = Router();

router.use(authenticate);
router.get('/', requireRoles(UserRole.ADMIN, UserRole.FACULTY, UserRole.ACCOUNTANT), studentsController.getStudents);
router.get('/:id', studentsController.getStudent);

export default router;
