import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/my-children', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: { userId: req.user!.userId },
      include: {
        children: {
          include: {
            student: {
              include: {
                user: true,
                program: true,
              },
            },
          },
        },
      },
    });
    sendSuccess(res, parent?.children || []);
  } catch (err) {
    next(err);
  }
});

export default router;
