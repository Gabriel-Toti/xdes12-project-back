"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneSchema = void 0;
const yup_1 = require("yup");
exports.PhoneSchema = (0, yup_1.string)()
    .test('is-valid-number', "Número de telefone inválido", (phone) => phone ? isValidPhoneNumber(phone) : true);
function isValidPhoneNumber(phone) {
    phone = phone.replace(/[^\d]/g, '');
    if (!/^\d{11}$/g.test(phone))
        return false;
    return true;
}
//# sourceMappingURL=phone.validation.js.map