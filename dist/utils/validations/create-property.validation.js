"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePropertySchema = void 0;
const yup_1 = require("yup");
const property_type_enum_1 = require("../enum/property-type.enum");
const id_validation_1 = require("./base/id.validation");
exports.CreatePropertySchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)()
        .max(64, "Nome da propriedade deve ter no máximo 64 caracteres")
        .required("Nome da propriedade é obrigatório"),
    type: (0, yup_1.string)()
        .oneOf(Object.values(property_type_enum_1.PropertyType), `Tipo de propriedade inválido: Considere apenas ${Object.values(property_type_enum_1.PropertyType)}`)
        .required("Tipo de propriedade é obrigatório"),
    costs: (0, yup_1.string)()
        .required("Custos são obrigatórios"),
    address: (0, yup_1.string)()
        .required("Endereço é obrigatório"),
    total_vacancies: (0, yup_1.number)()
        .typeError("Total de vagas deve ser um número")
        .positive("Total de vagas deve ser maior que zero")
        .integer("Total de vagas deve ser um número inteiro")
        .required("Total de vagas é obrigatório"),
    total_dorms: (0, yup_1.number)()
        .typeError("Total de quartos deve ser um número")
        .positive("Total de quartos deve ser maior que zero")
        .integer("Total de quartos deve ser um número inteiro")
        .required("Total de quartos é obrigatório"),
    total_bathrooms: (0, yup_1.number)()
        .typeError("Total de banheiros deve ser um número")
        .positive("Total de banheiros deve ser maior que zero")
        .integer("Total de banheiros deve ser um número inteiro")
        .required("Total de banheiros é obrigatório"),
    garage: (0, yup_1.boolean)()
        .required("Garagem é obrigatória"),
    external_area: (0, yup_1.boolean)()
        .required("Área externa é obrigatória"),
    members: (0, yup_1.array)().of((0, yup_1.object)().shape({
        id: id_validation_1.IdSchema.required("ID do membro é obrigatório"),
    }))
        .required("Membros são obrigatórios"),
});
//# sourceMappingURL=create-property.validation.js.map