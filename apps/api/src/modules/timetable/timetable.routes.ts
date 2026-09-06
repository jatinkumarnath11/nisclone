import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/semester/:semesterId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const timetable = await prisma.timetable.findFirst({
      where: { semesterId: req.params.semesterId, isActive: true },
      include: {
        slots: {
          include: {
            room: true,
            courseSection: {
              include: {
                faculty: { include: { user: true } },
                course: { include: { subject: true } },
              },
            },
          },
        },
      },
    });
    sendSuccess(res, timetable);
  } catch (err) {
    next(err);
  }
});

export default router;
