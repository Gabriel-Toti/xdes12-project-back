"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const client_1 = require("@prisma/client");
const input_validation_middleware_1 = require("../../../middlewares/input-validation-middleware");
const create_announcement_validation_1 = require("../../../utils/validations/create-announcement.validation");
const update_announcement_validation_1 = require("../../../utils/validations/update-announcement.validation");
const validate_user_middleware_1 = require("../../../middlewares/validate-user.middleware");
const id_validation_1 = require("../../../utils/validations/base/id.validation");
const yup_1 = require("yup");
const upload_middleware_1 = require("../../../middlewares/upload.middleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/announcement', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(create_announcement_validation_1.CreateAnnouncementSchema), controllers_1.AnnouncementController.createAnnouncement(prisma));
// Rota pública para listar anúncios (não requer autenticação)
router.get('/announcement/public', controllers_1.AnnouncementController.getPublicAnnouncements(prisma));
// Rota autenticada para listar anúncios (pode filtrar por propriedade do usuário)
router.get('/announcement', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), controllers_1.AnnouncementController.getAnnouncements(prisma));
router.get('/announcement/:propertyId/:number', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
    number: (0, yup_1.string)().required("Número do anúncio é obrigatório"),
})), controllers_1.AnnouncementController.getAnnouncement(prisma));
router.put('/announcement/:propertyId/:number', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(update_announcement_validation_1.UpdateAnnouncementSchema), controllers_1.AnnouncementController.updateAnnouncement(prisma));
router.delete('/announcement/:propertyId/:number', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
    number: (0, yup_1.string)().required("Número do anúncio é obrigatório"),
})), controllers_1.AnnouncementController.deleteAnnouncement(prisma));
router.post('/announcement/:propertyId/:number/image', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
    number: (0, yup_1.string)().required("Número do anúncio é obrigatório"),
})), upload_middleware_1.uploadMultiple.array('images', 10), controllers_1.AnnouncementController.uploadAnnouncementImage(prisma));
router.delete('/announcement/:propertyId/:number/image/:imageId', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
    number: (0, yup_1.string)().required("Número do anúncio é obrigatório"),
    imageId: id_validation_1.IdSchema.required("O id da imagem é obrigatório."),
})), controllers_1.AnnouncementController.deleteAnnouncementImage(prisma));
exports.default = router;
//# sourceMappingURL=announcement.routes.js.map