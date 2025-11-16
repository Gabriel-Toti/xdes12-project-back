import { object, string, number, boolean } from "yup";
import { IdSchema } from "./base/id.validation";

export const CreateAnnouncementSchema = object().shape({
    title: string()
        .max(32, "Título deve ter no máximo 32 caracteres")
        .required("Título é obrigatório"),
    description: string()
        .max(128, "Descrição deve ter no máximo 128 caracteres"),
    average_cost: number()
        .typeError("Custo médio deve ser um número")
        .positive("Custo médio deve ser maior que zero")
        .integer("Custo médio deve ser um número inteiro")
        .required("Custo médio é obrigatório"),
    boost: boolean(),
    vacancies: number()
        .typeError("Vagas deve ser um número")
        .positive("Vagas deve ser maior que zero")
        .integer("Vagas deve ser um número inteiro")
        .required("Vagas é obrigatório"),
    id_property: IdSchema.required("ID da propriedade é obrigatório"),
});

