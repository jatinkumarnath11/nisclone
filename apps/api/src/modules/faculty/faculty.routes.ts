import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { FacultyRepository } from './faculty.repository';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';
import { UserRole } from '@ums/shared';

const facultyRepo = new FacultyRepository();
const facultyService = new FacultyService(facultyRepo);
const facultyController = new FacultyController(facultyService);

const router = Router();

router.use(authenticate);
router.get('/', requireRoles(UserRole.ADMIN, UserRole.FACULTY, UserRole.STUDENT), facultyController.getFacultyList);
router.get('/:id', facultyController.getFaculty);

export default router;
