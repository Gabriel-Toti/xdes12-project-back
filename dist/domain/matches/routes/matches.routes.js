"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const client_1 = require("@prisma/client");
const input_validation_middleware_1 = require("../../../middlewares/input-validation-middleware");
const create_match_validation_1 = require("../../../utils/validations/create-match.validation");
const update_match_validation_1 = require("../../../utils/validations/update-match.validation");
const validate_user_middleware_1 = require("../../../middlewares/validate-user.middleware");
const id_validation_1 = require("../../../utils/validations/base/id.validation");
const yup_1 = require("yup");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/match', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(create_match_validation_1.CreateMatchSchema), controllers_1.MatchesController.createMatch(prisma));
router.get('/match', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), controllers_1.MatchesController.getMatches(prisma));
router.get('/match/:propertyId/:numberAnnouncement', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
    numberAnnouncement: (0, yup_1.string)().required("Número do anúncio é obrigatório"),
})), controllers_1.MatchesController.getMatch(prisma));
router.put('/match/:propertyId/:numberAnnouncement', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(update_match_validation_1.UpdateMatchSchema), controllers_1.MatchesController.updateMatch(prisma));
router.delete('/match/:propertyId/:numberAnnouncement', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
    numberAnnouncement: (0, yup_1.string)().required("Número do anúncio é obrigatório"),
})), controllers_1.MatchesController.deleteMatch(prisma));
exports.default = router;
//# sourceMappingURL=matches.routes.js.map