"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPayment = processPayment;
const error_handler_1 = require("../../../utils/error-handler");
const process_payment_service_1 = require("../services/process-payment.service");
function processPayment(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const paymentData = req.body;
            const result = await (0, process_payment_service_1.processPaymentService)(userId, paymentData, prisma);
            res.status(200).json(result);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
//# sourceMappingURL=payment.controller.js.map