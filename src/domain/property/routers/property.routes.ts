import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PropertyController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreatePropertySchema } from "../../../utils/validations/create-property.validation";
import { UpdatePropertySchema } from "../../../utils/validations/update-property.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";
import { IdSchema } from "../../../utils/validations/base/id.validation";
import { object } from "yup";
import { uploadMultiple } from "../../../middlewares/upload.middleware";

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
    inputValidateMiddleware(object().shape({
        id: IdSchema.required("O id é obrigatório."),
    })),
    PropertyController.getProperty(prisma)
);

router.put(
    '/property/:id',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(UpdatePropertySchema),
    PropertyController.updateProperty(prisma)
);

router.delete(
    '/property/:id',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        id: IdSchema.required("O id é obrigatório."),
    })),
    PropertyController.deleteProperty(prisma)
);

router.get(
    '/property',
    authMiddleware(),
    validateUserMiddleware(prisma),
    PropertyController.getUserPropertiesList(prisma)
);

router.post(
    '/property/:id/image',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        id: IdSchema.required("O id é obrigatório."),
    })),
    uploadMultiple.array('images', 10),
    PropertyController.uploadPropertyImage(prisma)
);

router.delete(
    '/property/:id/image/:imageId',
    authMiddleware(),
    validateUserMiddleware(prisma),
    inputValidateMiddleware(object().shape({
        id: IdSchema.required("O id é obrigatório."),
        imageId: IdSchema.required("O id da imagem é obrigatório."),
    })),
    PropertyController.deletePropertyImage(prisma)
);

export default router;