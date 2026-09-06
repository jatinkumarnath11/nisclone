import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';
import { UserRole } from '@ums/shared';

const router = Router();
router.use(authenticate);

router.get('/', requireRoles(UserRole.ADMIN), async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const logs = await prisma.auditLog.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { email: true, firstName: true, lastName: true } },
      },
    });
    sendSuccess(res, logs);
  } catch (err) {
    next(err);
  }
});

export default router;
