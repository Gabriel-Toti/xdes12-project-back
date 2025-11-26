"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMatchSchema = void 0;
const yup_1 = require("yup");
const id_validation_1 = require("./base/id.validation");
exports.CreateMatchSchema = (0, yup_1.object)().shape({
    id_property: id_validation_1.IdSchema.required("ID da propriedade é obrigatório"),
    number_announcement: (0, yup_1.number)()
        .typeError("Número do anúncio deve ser um número")
        .positive("Número do anúncio deve ser maior que zero")
        .integer("Número do anúncio deve ser um número inteiro")
        .required("Número do anúncio é obrigatório"),
});
//# sourceMappingURL=create-match.validation.js.map