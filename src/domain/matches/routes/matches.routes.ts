import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { MatchesController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreateMatchSchema } from "../../../utils/validations/create-match.validation";
import { UpdateMatchSchema } from "../../../utils/validations/update-match.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";
import { IdSchema } from "../../../utils/validations/base/id.validation";
import { object, string } from "yup";

const router = Router();
const prisma = new PrismaClient();

router.post(
    '/match',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(CreateMatchSchema),
    MatchesController.createMatch(prisma)
);

router.get(
    '/match',
    authMiddleware(),
    validateUserMiddleware(prisma),
    MatchesController.getMatches(prisma)
);

router.get(
    '/match/:propertyId/:numberAnnouncement',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        propertyId: IdSchema.required("ID da propriedade é obrigatório"),
        numberAnnouncement: string().required("Número do anúncio é obrigatório"),
    })),
    MatchesController.getMatch(prisma)
);

router.put(
    '/match/:propertyId/:numberAnnouncement',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(UpdateMatchSchema),
    MatchesController.updateMatch(prisma)
);

router.delete(
    '/match/:propertyId/:numberAnnouncement',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        propertyId: IdSchema.required("ID da propriedade é obrigatório"),
        numberAnnouncement: string().required("Número do anúncio é obrigatório"),
    })),
    MatchesController.deleteMatch(prisma)
);

export default router;

