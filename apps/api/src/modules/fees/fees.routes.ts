import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';
import { UserRole } from '@ums/shared';

const router = Router();
router.use(authenticate);

router.get('/structures', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const structures = await prisma.feeStructure.findMany({
      include: { academicYear: true, program: true },
    });
    sendSuccess(res, structures);
  } catch (err) {
    next(err);
  }
});

router.get('/student/:studentId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { studentId: req.params.studentId },
      include: { payments: true },
      orderBy: { dueDate: 'asc' },
    });
    sendSuccess(res, invoices);
  } catch (err) {
    next(err);
  }
});

router.post('/structures', requireRoles(UserRole.ADMIN, UserRole.ACCOUNTANT), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, academicYearId, programId, amount, currency, dueDate } = req.body;
    const structure = await prisma.feeStructure.create({
      data: {
        name,
        academicYearId,
        programId,
        amount: parseFloat(amount),
        currency: currency || 'USD',
        dueDate: new Date(dueDate),
      },
    });
    sendSuccess(res, structure, 'Fee structure created', 201);
  } catch (err) {
    next(err);
  }
});

export default router;
