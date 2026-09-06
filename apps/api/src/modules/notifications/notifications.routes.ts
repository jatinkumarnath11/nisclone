import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/my', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    sendSuccess(res, notifications);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/read', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await prisma.notification.updateMany({
      where: { id: req.params.id, userId: req.user!.userId },
      data: { isRead: true },
    });
    sendSuccess(res, { updated: updated.count > 0 });
  } catch (err) {
    next(err);
  }
});

export default router;
