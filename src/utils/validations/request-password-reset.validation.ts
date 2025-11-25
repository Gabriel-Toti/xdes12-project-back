import { object, string } from "yup";

export const RequestPasswordResetSchema = object().shape({
    email: string()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório")
});

