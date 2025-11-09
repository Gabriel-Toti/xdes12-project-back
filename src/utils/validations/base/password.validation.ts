import { string } from "yup";

export const PasswordSchema = string()
.min(8, "A senha deve conter ao menos 8 caracteres")
.matches (
    /^(?=.*[A-Z])/, 
    'A senha deve conter pelo menos uma letra maiúscula.'
    )
    .matches(
    /^(?=.*[a-z])/, 
    'A senha deve conter pelo menos uma letra minúscula.'
    )
    .matches(
    /^(?=.*\d)/, 
    'A senha deve conter pelo menos um número.'
    )
    .matches(
    /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/, 
    'A senha deve conter pelo menos um caractere especial.'
    )