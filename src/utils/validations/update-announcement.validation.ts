import { object, string, number, boolean } from "yup";

export const UpdateAnnouncementSchema = object().shape({
    title: string()
        .max(32, "Título deve ter no máximo 32 caracteres"),
    description: string()
        .max(128, "Descrição deve ter no máximo 128 caracteres"),
    average_cost: number()
        .typeError("Custo médio deve ser um número")
        .positive("Custo médio deve ser maior que zero")
        .integer("Custo médio deve ser um número inteiro"),
    boost: boolean(),
    vacancies: number()
        .typeError("Vagas deve ser um número")
        .positive("Vagas deve ser maior que zero")
        .integer("Vagas deve ser um número inteiro"),
});

