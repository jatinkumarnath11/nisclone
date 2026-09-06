import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const hostels = await prisma.hostel.findMany({
      include: {
        blocks: {
          include: {
            rooms: {
              include: { beds: true },
            },
          },
        },
      },
    });
    sendSuccess(res, hostels);
  } catch (err) {
    next(err);
  }
});

router.get('/my-allocation', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.userId },
    });
    if (!student) {
      sendSuccess(res, null);
      return;
    }
    const allocation = await prisma.hostelAllocation.findFirst({
      where: { studentId: student.id, vacatedAt: null },
      include: {
        bed: {
          include: {
            room: {
              include: {
                block: {
                  include: { hostel: true },
                },
              },
            },
          },
        },
      },
    });
    sendSuccess(res, allocation);
  } catch (err) {
    next(err);
  }
});

export default router;
