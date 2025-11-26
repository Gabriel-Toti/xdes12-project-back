"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderSchema = void 0;
const yup_1 = require("yup");
const gender_enum_1 = require("../../enum/gender.enum");
exports.GenderSchema = (0, yup_1.string)()
    .oneOf(Object.values(gender_enum_1.Gender));
//# sourceMappingURL=gender.validation.js.map