import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/student/:studentId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: req.params.studentId },
      include: {
        courseSection: {
          include: {
            faculty: { include: { user: true } },
            course: { include: { subject: true } },
          },
        },
      },
    });
    sendSuccess(res, enrollments);
  } catch (err) {
    next(err);
  }
});

export default router;
