import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/menus', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const menus = await prisma.menu.findMany({
      where: { isActive: true },
      include: {
        canteen: true,
        items: { where: { isAvailable: true } },
      },
    });
    sendSuccess(res, menus);
  } catch (err) {
    next(err);
  }
});

router.get('/orders/my', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.canteenOrder.findMany({
      where: { userId: req.user!.userId },
      include: {
        canteen: true,
        items: { include: { menuItem: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    sendSuccess(res, orders);
  } catch (err) {
    next(err);
  }
});

export default router;
