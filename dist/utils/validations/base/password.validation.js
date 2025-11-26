"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSchema = void 0;
const yup_1 = require("yup");
exports.PasswordSchema = (0, yup_1.string)()
    .min(8, "A senha deve conter ao menos 8 caracteres")
    .matches(/^(?=.*[A-Z])/, 'A senha deve conter pelo menos uma letra maiúscula.')
    .matches(/^(?=.*[a-z])/, 'A senha deve conter pelo menos uma letra minúscula.')
    .matches(/^(?=.*\d)/, 'A senha deve conter pelo menos um número.')
    .matches(/^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/, 'A senha deve conter pelo menos um caractere especial.');
//# sourceMappingURL=password.validation.js.map