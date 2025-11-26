"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const yup_1 = require("yup");
exports.LoginSchema = (0, yup_1.object)().shape({
    email: (0, yup_1.string)()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório"),
    password: (0, yup_1.string)()
        .required("A senha é obrigatória")
});
//# sourceMappingURL=login.validation.js.map