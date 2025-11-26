"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const client_1 = require("@prisma/client");
const input_validation_middleware_1 = require("../../../middlewares/input-validation-middleware");
const create_rule_validation_1 = require("../../../utils/validations/create-rule.validation");
const update_rule_validation_1 = require("../../../utils/validations/update-rule.validation");
const validate_user_middleware_1 = require("../../../middlewares/validate-user.middleware");
const controllers_1 = require("../controllers");
const id_validation_1 = require("../../../utils/validations/base/id.validation");
const yup_1 = require("yup");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/rule/:propertyId', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(create_rule_validation_1.CreateRulesSchema), controllers_1.RulesController.createRules(prisma));
router.get('/rule/:propertyId', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
})), controllers_1.RulesController.getRules(prisma));
router.delete('/rule/:propertyId/:name', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)((0, yup_1.object)().shape({
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
    name: (0, yup_1.string)().required("Nome da regra é obrigatório"),
})), controllers_1.RulesController.deleteRule(prisma));
router.put('/rule/:propertyId/:name', (0, auth_middleware_1.authMiddleware)(), (0, validate_user_middleware_1.validateUserMiddleware)(prisma), (0, input_validation_middleware_1.inputValidateMiddleware)(update_rule_validation_1.UpdateRuleSchema), controllers_1.RulesController.updateRule(prisma));
exports.default = router;
//# sourceMappingURL=rules.routes.js.map