"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredAttributeSchema = void 0;
const yup_1 = require("yup");
const attributes_1 = require("../../attributes");
exports.RequiredAttributeSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)()
        .required("O Nome é obrigatório"),
    value: (0, yup_1.string)()
        .required("O valor é obrigatório"),
    weight: (0, yup_1.number)()
        .integer()
        .min(1)
        .max(10)
        .required("É necessário informar um peso para a preferência.")
}).test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => attr ? (0, attributes_1.isValidAttribute)(attr) : false);
//# sourceMappingURL=required-attribute.validation.js.map