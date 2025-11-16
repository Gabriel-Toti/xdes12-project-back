import { object, string } from "yup";

export const LoginSchema = object().shape(
    {
        email: string()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório"),
        password: string()
        .required("A senha é obrigatória")
    }
);