import { Router, Request, Response, NextFunction } from 'express';
import prisma, { PriorityEnum } from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';
import { UserRole } from '@ums/shared';

const router = Router();
router.use(authenticate);

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { publishDate: 'desc' },
      include: {
        author: { select: { firstName: true, lastName: true, email: true } },
        recipients: true,
      },
    });
    sendSuccess(res, notices);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireRoles(UserRole.ADMIN, UserRole.FACULTY), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, priority } = req.body;
    const notice = await prisma.notice.create({
      data: {
        authorId: req.user!.userId,
        title,
        content,
        priority: (priority as PriorityEnum) || PriorityEnum.NORMAL,
      },
    });
    sendSuccess(res, notice, 'Notice published', 201);
  } catch (err) {
    next(err);
  }
});

export default router;
