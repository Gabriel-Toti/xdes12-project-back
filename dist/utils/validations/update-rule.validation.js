"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRuleSchema = void 0;
const yup_1 = require("yup");
const attributes_1 = require("../attributes");
const id_validation_1 = require("./base/id.validation");
exports.UpdateRuleSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)()
        .required("O Nome é obrigatório"),
    value: (0, yup_1.string)()
        .required("O Valor é obrigatório"),
    propertyId: id_validation_1.IdSchema.required("ID da propriedade é obrigatório")
}).test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => {
    if (!attr)
        return false;
    if (attr.value === undefined || attr.value === null) {
        return (0, attributes_1.isValidAttributeName)(attr.name);
    }
    const { name, value } = attr;
    return (0, attributes_1.isValidAttribute)({ name, value });
});
//# sourceMappingURL=update-rule.validation.js.map