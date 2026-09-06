import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: { department: true },
    });
    sendSuccess(res, subjects);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: req.params.id },
      include: { department: true },
    });
    sendSuccess(res, subject);
  } catch (err) {
    next(err);
  }
});

export default router;
