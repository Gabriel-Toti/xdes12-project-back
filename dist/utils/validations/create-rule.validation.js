"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRulesSchema = void 0;
const yup_1 = require("yup");
const attributes_1 = require("../attributes");
exports.CreateRulesSchema = (0, yup_1.object)().shape({
    propertyId: (0, yup_1.string)().required("Property ID is required"),
    rules: (0, yup_1.array)().of((0, yup_1.object)().shape({
        name: (0, yup_1.string)()
            .required("O Nome é obrigatório"),
        value: (0, yup_1.string)()
            .required("O valor é obrigatório"),
    })
        .test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => attr ? (0, attributes_1.isValidAttribute)(attr) : false)).required("At least one rule is required")
});
//# sourceMappingURL=create-rule.validation.js.map