import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { validateBody } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { loginSchema, refreshTokenSchema } from '@ums/validation';

const authRepo = new AuthRepository();
const authService = new AuthService(authRepo);
const authController = new AuthController(authService);

const router = Router();

router.post('/login', validateBody(loginSchema), authController.login);
router.post('/refresh-token', validateBody(refreshTokenSchema), authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);

export default router;
