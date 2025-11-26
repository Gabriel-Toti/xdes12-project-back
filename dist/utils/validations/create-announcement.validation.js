"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAnnouncementSchema = void 0;
const yup_1 = require("yup");
const id_validation_1 = require("./base/id.validation");
exports.CreateAnnouncementSchema = (0, yup_1.object)().shape({
    title: (0, yup_1.string)()
        .max(32, "Título deve ter no máximo 32 caracteres")
        .required("Título é obrigatório"),
    description: (0, yup_1.string)()
        .max(128, "Descrição deve ter no máximo 128 caracteres"),
    average_cost: (0, yup_1.number)()
        .typeError("Custo médio deve ser um número")
        .positive("Custo médio deve ser maior que zero")
        .integer("Custo médio deve ser um número inteiro")
        .required("Custo médio é obrigatório"),
    boost: (0, yup_1.boolean)(),
    vacancies: (0, yup_1.number)()
        .typeError("Vagas deve ser um número")
        .positive("Vagas deve ser maior que zero")
        .integer("Vagas deve ser um número inteiro")
        .required("Vagas é obrigatório"),
    id_property: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
});
//# sourceMappingURL=create-announcement.validation.js.map