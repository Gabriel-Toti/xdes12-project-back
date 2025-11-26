"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePreferenceSchema = void 0;
const yup_1 = require("yup");
const attributes_1 = require("../attributes");
exports.UpdatePreferenceSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)()
        .required("O Nome é obrigatório"),
    value: (0, yup_1.string)()
        .notRequired(),
    weight: (0, yup_1.number)()
        .integer()
        .min(1)
        .max(10)
        .notRequired()
}).test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => {
    if (!attr)
        return false;
    if (attr.value === undefined || attr.value === null) {
        return (0, attributes_1.isValidAttributeName)(attr.name);
    }
    const { name, value } = attr;
    return (0, attributes_1.isValidAttribute)({ name, value });
});
//# sourceMappingURL=update-preference.validation.js.map