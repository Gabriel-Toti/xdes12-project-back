"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchema = void 0;
const yup_1 = require("yup");
const phone_validation_1 = require("./base/phone.validation");
const gender_validation_1 = require("./base/gender.validation");
const password_validation_1 = require("./base/password.validation");
exports.CreateUserSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)()
        .required("Nome é obrigatório"),
    email: (0, yup_1.string)()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório"),
    password: password_validation_1.PasswordSchema
        .required('A senha é um campo obrigatório.'),
    phone: phone_validation_1.PhoneSchema.required("O telefone é obrigatório."),
    birthdate: (0, yup_1.date)()
        .required("Data de nascimento é obrigatória."),
    gender: gender_validation_1.GenderSchema
        .required("Gênero é obrigatório"),
    cpf: (0, yup_1.string)()
        .test("is-cpf_valid", "CPF inválido", (cpf) => cpf ? isCPFValid(cpf) : false)
        .required("CPF é Obrigatório.")
});
function isCPFValid(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
        return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11)
        firstDigit = 0;
    if (firstDigit !== parseInt(cpf[9]))
        return false;
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11)
        secondDigit = 0;
    return secondDigit === parseInt(cpf[10]);
}
//# sourceMappingURL=create-user.validation.js.map