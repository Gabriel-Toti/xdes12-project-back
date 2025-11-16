import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreateRulesSchema } from "../../../utils/validations/create-rule.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";
import { RulesController } from "../controllers"; // Import RuleController

// filepath: /home/toti/projetos-materias/casar/casar-back/src/domain/attributes/routes/rules.routes.ts


const router = Router();
const prisma = new PrismaClient();

router.post('/rule/:propertyId', authMiddleware(), validateUserMiddleware(prisma), inputValidateMiddleware(CreateRulesSchema), RulesController.createRules(prisma));

export default router;