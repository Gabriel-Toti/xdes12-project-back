import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AnnouncementController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreateAnnouncementSchema } from "../../../utils/validations/create-announcement.validation";
import { UpdateAnnouncementSchema } from "../../../utils/validations/update-announcement.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";
import { IdSchema } from "../../../utils/validations/base/id.validation";
import { object, string } from "yup";

const router = Router();
const prisma = new PrismaClient();

router.post(
    '/announcement',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(CreateAnnouncementSchema),
    AnnouncementController.createAnnouncement(prisma)
);

router.get(
    '/announcement',
    authMiddleware(),
    validateUserMiddleware(prisma),
    AnnouncementController.getAnnouncements(prisma)
);

router.get(
    '/announcement/:propertyId/:number',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        propertyId: IdSchema.required("ID da propriedade é obrigatório"),
        number: string().required("Número do anúncio é obrigatório"),
    })),
    AnnouncementController.getAnnouncement(prisma)
);

router.put(
    '/announcement/:propertyId/:number',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(UpdateAnnouncementSchema),
    AnnouncementController.updateAnnouncement(prisma)
);

router.delete(
    '/announcement/:propertyId/:number',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        propertyId: IdSchema.required("ID da propriedade é obrigatório"),
        number: string().required("Número do anúncio é obrigatório"),
    })),
    AnnouncementController.deleteAnnouncement(prisma)
);

export default router;

