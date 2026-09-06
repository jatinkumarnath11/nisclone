import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/section/:courseSectionId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exams = await prisma.exam.findMany({
      where: { courseSectionId: req.params.courseSectionId },
      include: { schedules: { include: { room: true } } },
    });
    sendSuccess(res, exams);
  } catch (err) {
    next(err);
  }
});

export default router;
