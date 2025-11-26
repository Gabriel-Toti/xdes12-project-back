"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const client_1 = require("@prisma/client");
const input_validation_middleware_1 = require("../../../middlewares/input-validation-middleware");
const create_property_validation_1 = require("../../../utils/validations/create-property.validation");
const update_property_validation_1 = require("../../../utils/validations/update-property.validation");
const validate_user_middleware_1 = require("../../../middlewares/validate-user.middleware");
const id_validation_1 = require("../../../utils/validations/base/id.validation");
const yup_1 = require("yup");
const upload_middleware_1 = require("../../../middlewares/upload.middleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/property', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(create_property_validation_1.CreatePropertySchema), controllers_1.PropertyController.createProperty(prisma));
router.get('/property/:id', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    id: id_validation_1.IdSchema.required("O id é obrigatório."),
})), controllers_1.PropertyController.getProperty(prisma));
router.put('/property/:id', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(update_property_validation_1.UpdatePropertySchema), controllers_1.PropertyController.updateProperty(prisma));
router.delete('/property/:id', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    id: id_validation_1.IdSchema.required("O id é obrigatório."),
})), controllers_1.PropertyController.deleteProperty(prisma));
router.get('/property', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), controllers_1.PropertyController.getUserPropertiesList(prisma));
router.post('/property/:id/image', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    id: id_validation_1.IdSchema.required("O id é obrigatório."),
})), upload_middleware_1.uploadMultiple.array('images', 10), controllers_1.PropertyController.uploadPropertyImage(prisma));
router.delete('/property/:id/image/:imageId', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    id: id_validation_1.IdSchema.required("O id é obrigatório."),
    imageId: id_validation_1.IdSchema.required("O id da imagem é obrigatório."),
})), controllers_1.PropertyController.deletePropertyImage(prisma));
exports.default = router;
//# sourceMappingURL=property.routes.js.map