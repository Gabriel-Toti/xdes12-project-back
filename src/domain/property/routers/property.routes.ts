import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PropertyController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreatePropertySchema } from "../../../utils/validations/create-property.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";


const router = Router();
const prisma = new PrismaClient();

router.post(
    '/property',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(CreatePropertySchema),
    PropertyController.createProperty(prisma)
);

export default router;