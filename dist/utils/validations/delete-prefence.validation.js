"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePreferenceSchema = void 0;
const yup_1 = require("yup");
const attributes_1 = require("../attributes");
exports.DeletePreferenceSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)()
        .required("O Nome é obrigatório"),
}).test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => {
    if (!attr)
        return false;
    return (0, attributes_1.isValidAttributeName)(attr.name);
});
//# sourceMappingURL=delete-prefence.validation.js.map