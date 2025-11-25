import { object, string } from "yup";

export const ResetPasswordSchema = object().shape({
    email: string()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório"),
    code: string()
        .length(6, "Código deve conter 6 dígitos")
        .required("Código é obrigatório"),
    password: string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
});

