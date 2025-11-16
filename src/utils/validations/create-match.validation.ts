import { object, number } from "yup";
import { IdSchema } from "./base/id.validation";

export const CreateMatchSchema = object().shape({
    id_property: IdSchema.required("ID da propriedade é obrigatório"),
    number_announcement: number()
        .typeError("Número do anúncio deve ser um número")
        .positive("Número do anúncio deve ser maior que zero")
        .integer("Número do anúncio deve ser um número inteiro")
        .required("Número do anúncio é obrigatório"),
});

