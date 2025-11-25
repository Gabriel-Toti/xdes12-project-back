import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { processPaymentService } from "../services/process-payment.service";
import { ProcessPaymentData } from "../interfaces/payment.interface";

export function processPayment(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const paymentData: ProcessPaymentData = req.body;

            const result = await processPaymentService(
                userId as string,
                paymentData,
                prisma
            );

            res.status(200).json(result);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

