import { Router, Request, Response, NextFunction } from 'express';
import prisma, { PaymentMethodEnum } from '@ums/database';
import { sendSuccess } from '../../utils/response.util';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);

router.get('/invoice/:invoiceId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { invoiceId: req.params.invoiceId },
      include: { transactions: true },
    });
    sendSuccess(res, payments);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { invoiceId, amount, paymentMethod, transactionRef } = req.body;
    const payment = await prisma.payment.create({
      data: {
        invoiceId,
        amount: parseFloat(amount),
        paymentMethod: paymentMethod as PaymentMethodEnum,
        transactionRef,
      },
    });

    // Update invoice paid amount
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: { increment: parseFloat(amount) },
      },
    });

    sendSuccess(res, payment, 'Payment recorded successfully', 201);
  } catch (err) {
    next(err);
  }
});

export default router;
