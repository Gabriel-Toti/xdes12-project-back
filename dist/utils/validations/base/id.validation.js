"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdSchema = void 0;
const yup_1 = require("yup");
exports.IdSchema = (0, yup_1.string)().uuid("O Id deve ser um uuid válido.");
//# sourceMappingURL=id.validation.js.map