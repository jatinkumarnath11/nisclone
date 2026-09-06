import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/my', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const complaints = await prisma.complaint.findMany({
      where: { creatorId: req.user!.userId },
      include: {
        comments: { include: { user: { select: { firstName: true, lastName: true } } } },
        attachments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    sendSuccess(res, complaints);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, category } = req.body;
    const complaint = await prisma.complaint.create({
      data: {
        creatorId: req.user!.userId,
        title,
        description,
        category: category || 'GENERAL',
      },
    });
    sendSuccess(res, complaint, 'Complaint filed successfully', 201);
  } catch (err) {
    next(err);
  }
});

export default router;
