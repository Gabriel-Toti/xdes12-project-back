"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = void 0;
const yup_1 = require("yup");
exports.ResetPasswordSchema = (0, yup_1.object)().shape({
    email: (0, yup_1.string)()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório"),
    code: (0, yup_1.string)()
        .length(6, "Código deve conter 6 dígitos")
        .required("Código é obrigatório"),
    password: (0, yup_1.string)()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
});
//# sourceMappingURL=reset-password.validation.js.map