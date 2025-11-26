"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserSchema = void 0;
const yup_1 = require("yup");
const gender_enum_1 = require("../enum/gender.enum");
const phone_validation_1 = require("./base/phone.validation");
const id_validation_1 = require("./base/id.validation");
exports.EditUserSchema = (0, yup_1.object)().shape({
    userId: id_validation_1.IdSchema.required("Impossível prosseguir: Nenhum id de usuário enviado."),
    name: (0, yup_1.string)().notRequired(),
    gender: (0, yup_1.string)().oneOf(Object.values(gender_enum_1.Gender)).notRequired(),
    phone: phone_validation_1.PhoneSchema.notRequired(),
    active: (0, yup_1.boolean)().notRequired(),
});
//# sourceMappingURL=update-user.validation.js.map