import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/section/:courseSectionId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { courseSectionId: req.params.courseSectionId },
      include: { faculty: { include: { user: true } } },
      orderBy: { dueDate: 'asc' },
    });
    sendSuccess(res, assignments);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseSectionId, facultyId, title, description, maxScore, dueDate } = req.body;
    const assignment = await prisma.assignment.create({
      data: {
        courseSectionId,
        facultyId,
        title,
        description,
        maxScore: maxScore ? parseFloat(maxScore) : 100,
        dueDate: new Date(dueDate),
      },
    });
    sendSuccess(res, assignment, 'Assignment published', 201);
  } catch (err) {
    next(err);
  }
});

export default router;
