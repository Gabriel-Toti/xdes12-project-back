"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePreferenceSchema = void 0;
const yup_1 = require("yup");
const required_attribute_validation_1 = require("./base/required-attribute.validation");
exports.CreatePreferenceSchema = (0, yup_1.object)().shape({
    preferences: (0, yup_1.array)().of(required_attribute_validation_1.RequiredAttributeSchema)
});
//# sourceMappingURL=create-preference.validation.js.map