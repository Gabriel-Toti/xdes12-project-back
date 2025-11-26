"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const client_1 = require("@prisma/client");
const input_validation_middleware_1 = require("../../../middlewares/input-validation-middleware");
const process_payment_validation_1 = require("../../../utils/validations/process-payment.validation");
const validate_user_middleware_1 = require("../../../middlewares/validate-user.middleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/payment/process', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(process_payment_validation_1.ProcessPaymentSchema), controllers_1.PaymentController.processPayment(prisma));
exports.default = router;
//# sourceMappingURL=payment.routes.js.map