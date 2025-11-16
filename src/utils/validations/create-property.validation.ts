import { object, string, number, boolean, array } from "yup";
import { PropertyType } from "../enum/property-type.enum";
import { IdSchema } from "./base/id.validation";

export const CreatePropertySchema = object().shape({
    name: string()
        .max(64, "Nome da propriedade deve ter no máximo 64 caracteres")
        .required("Nome da propriedade é obrigatório"),
    type: string()
        .oneOf(Object.values(PropertyType), `Tipo de propriedade inválido: Considere apenas ${Object.values(PropertyType)}`)
        .required("Tipo de propriedade é obrigatório"),
    costs: string()
        .required("Custos são obrigatórios"),
    address: string()
        .required("Endereço é obrigatório"),
    total_vacancies: number()
        .typeError("Total de vagas deve ser um número")
        .positive("Total de vagas deve ser maior que zero")
        .integer("Total de vagas deve ser um número inteiro")
        .required("Total de vagas é obrigatório"),
    total_dorms: number()
        .typeError("Total de quartos deve ser um número")
        .positive("Total de quartos deve ser maior que zero")
        .integer("Total de quartos deve ser um número inteiro")
        .required("Total de quartos é obrigatório"),
    total_bathrooms: number()
        .typeError("Total de banheiros deve ser um número")
        .positive("Total de banheiros deve ser maior que zero")
        .integer("Total de banheiros deve ser um número inteiro")
        .required("Total de banheiros é obrigatório"),
    garage: boolean()
        .required("Garagem é obrigatória"),
    external_area: boolean()
        .required("Área externa é obrigatória"),
    members: array().of(
        object().shape({
        id: IdSchema.required("ID do membro é obrigatório"),
    }))
    .required("Membros são obrigatórios"),
});

