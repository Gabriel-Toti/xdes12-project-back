import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PaymentController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { ProcessPaymentSchema } from "../../../utils/validations/process-payment.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";

const router = Router();
const prisma = new PrismaClient();

router.post(
    '/payment/process',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(ProcessPaymentSchema),
    PaymentController.processPayment(prisma)
);

export default router;

