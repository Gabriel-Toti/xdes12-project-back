import { PrismaClient } from "@prisma/client";
import { ProcessPaymentData } from "../interfaces/payment.interface";
export declare function processPaymentService(userId: string, paymentData: ProcessPaymentData, prisma: PrismaClient): Promise<{
    success: boolean;
    message: string;
}>;
//# sourceMappingURL=process-payment.service.d.ts.map