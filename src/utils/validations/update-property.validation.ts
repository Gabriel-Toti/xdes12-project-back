import { object, string, number } from "yup";

export const UpdatePropertySchema = object().shape({
    costs: string(),
    total_vacancies: number()
        .typeError("Total de vagas deve ser um número")
        .positive("Total de vagas deve ser maior que zero")
        .integer("Total de vagas deve ser um número inteiro"),
});

