import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/buses', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const buses = await prisma.bus.findMany({
      include: {
        driver: { include: { user: true } },
        routes: { include: { stops: { orderBy: { sequence: 'asc' } } } },
      },
    });
    sendSuccess(res, buses);
  } catch (err) {
    next(err);
  }
});

router.get('/my-bus', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.userId },
    });
    if (!student) {
      sendSuccess(res, null);
      return;
    }
    const assignment = await prisma.busAssignment.findUnique({
      where: { studentId: student.id },
      include: {
        bus: true,
        stop: { include: { route: true } },
      },
    });
    sendSuccess(res, assignment);
  } catch (err) {
    next(err);
  }
});

export default router;
