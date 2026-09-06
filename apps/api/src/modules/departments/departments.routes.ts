import { Router } from 'express';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DepartmentsRepository } from './departments.repository';
import { authenticate } from '../../middlewares/auth.middleware';

const deptRepo = new DepartmentsRepository();
const deptService = new DepartmentsService(deptRepo);
const deptController = new DepartmentsController(deptService);

const router = Router();

router.use(authenticate);
router.get('/', deptController.getDepartments);
router.get('/:id', deptController.getDepartment);

export default router;
