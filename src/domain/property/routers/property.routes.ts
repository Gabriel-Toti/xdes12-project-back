import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PropertyController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreatePropertySchema } from "../../../utils/validations/create-property.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";
// import { IdSchema } from "../../../utils/validations/base/id.validation";


const router = Router();
const prisma = new PrismaClient();

router.post(
    '/property',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(CreatePropertySchema),
    PropertyController.createProperty(prisma)
);

router.get(
    '/property/:id',
    authMiddleware(),
    validateUserMiddleware(prisma),
    // inputValidateMiddleware(IdSchema.required("O id é obrigatório.")),
    PropertyController.getProperty(prisma)
);

export default router;