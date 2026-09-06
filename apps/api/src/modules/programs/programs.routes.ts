import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const programs = await prisma.program.findMany({
      include: { department: true },
    });
    sendSuccess(res, programs);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const program = await prisma.program.findUnique({
      where: { id: req.params.id },
      include: { department: true, courses: { include: { subject: true } } },
    });
    sendSuccess(res, program);
  } catch (err) {
    next(err);
  }
});

export default router;
