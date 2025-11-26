"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordResetSchema = void 0;
const yup_1 = require("yup");
exports.RequestPasswordResetSchema = (0, yup_1.object)().shape({
    email: (0, yup_1.string)()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório")
});
//# sourceMappingURL=request-password-reset.validation.js.map