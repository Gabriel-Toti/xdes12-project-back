import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreateRulesSchema } from "../../../utils/validations/create-rule.validation";
import { UpdateRuleSchema } from "../../../utils/validations/update-rule.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";
import { RulesController } from "../controllers";
import { IdSchema } from "../../../utils/validations/base/id.validation";
import { object, string } from "yup";

const router = Router();
const prisma = new PrismaClient();

router.post(
    '/rule/:propertyId',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(CreateRulesSchema),
    RulesController.createRules(prisma)
);

router.get(
    '/rule/:propertyId',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        propertyId: IdSchema.required("ID da propriedade é obrigatório"),
    })),
    RulesController.getRules(prisma)
);

router.delete(
    '/rule/:propertyId/:name',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        propertyId: IdSchema.required("ID da propriedade é obrigatório"),
        name: string().required("Nome da regra é obrigatório"),
    })),
    RulesController.deleteRule(prisma)
);

router.put(
    '/rule/:propertyId/:name',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(UpdateRuleSchema),
    RulesController.updateRule(prisma)
);

export default router;