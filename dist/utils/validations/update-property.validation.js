"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePropertySchema = void 0;
const yup_1 = require("yup");
exports.UpdatePropertySchema = (0, yup_1.object)().shape({
    costs: (0, yup_1.string)(),
    total_vacancies: (0, yup_1.number)()
        .typeError("Total de vagas deve ser um número")
        .positive("Total de vagas deve ser maior que zero")
        .integer("Total de vagas deve ser um número inteiro"),
});
//# sourceMappingURL=update-property.validation.js.map