import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/my', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await prisma.document.findMany({
      where: { uploadedById: req.user!.userId },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    sendSuccess(res, docs);
  } catch (err) {
    next(err);
  }
});

router.get('/categories', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.documentCategory.findMany();
    sendSuccess(res, categories);
  } catch (err) {
    next(err);
  }
});

export default router;
