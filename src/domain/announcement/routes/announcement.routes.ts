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
import { uploadMultiple } from "../../../middlewares/upload.middleware";

const router = Router();
const prisma = new PrismaClient();

router.post(
    '/announcement',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(CreateAnnouncementSchema),
    AnnouncementController.createAnnouncement(prisma)
);

// Rota pública para listar anúncios (não requer autenticação)
router.get(
    '/announcement/public',
    AnnouncementController.getPublicAnnouncements(prisma)
);

// Rota autenticada para listar anúncios (pode filtrar por propriedade do usuário)
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

router.post(
    '/announcement/:propertyId/:number/image',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        propertyId: IdSchema.required("ID da propriedade é obrigatório"),
        number: string().required("Número do anúncio é obrigatório"),
    })),
    uploadMultiple.array('images', 10),
    AnnouncementController.uploadAnnouncementImage(prisma)
);

router.delete(
    '/announcement/:propertyId/:number/image/:imageId',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        propertyId: IdSchema.required("ID da propriedade é obrigatório"),
        number: string().required("Número do anúncio é obrigatório"),
        imageId: IdSchema.required("O id da imagem é obrigatório."),
    })),
    AnnouncementController.deleteAnnouncementImage(prisma)
);

export default router;

