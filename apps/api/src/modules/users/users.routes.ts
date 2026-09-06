import { Router } from 'express';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';
import { validateBody } from '../../middlewares/validate.middleware';
import { registerUserSchema } from '@ums/validation';
import { UserRole } from '@ums/shared';

const usersRepo = new UsersRepository();
const usersService = new UsersService(usersRepo);
const usersController = new UsersController(usersService);

const router = Router();

router.use(authenticate);
router.get('/', requireRoles(UserRole.ADMIN), usersController.getUsers);
router.get('/:id', requireRoles(UserRole.ADMIN), usersController.getUser);
router.post('/', requireRoles(UserRole.ADMIN), validateBody(registerUserSchema), usersController.createUser);

export default router;

