import { object, string } from "yup";
import { PhoneSchema } from "./base/phone.validation";
import { GenderSchema } from "./base/gender.validation";
import { PasswordSchema } from "./base/password.validation";

export const CreateUserSchema = object().shape(
    {
        name: string()
        .required("Nome é obrigatório"),
        email: string()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório"),
        password: PasswordSchema
        .required('A senha é um campo obrigatório.'),
        phone: PhoneSchema.required("O telefone é obrigatório."),
        gender: GenderSchema
        .required("Gênero é obrigatório"),
        cpf: string()
        .test("is-cpf_valid", "CPF inválido", (cpf) => cpf? isCPFValid(cpf) : false)
        .required("CPF é Obrigatório.")
    }
);

function isCPFValid(cpf: string): boolean
{
    cpf = cpf.replace(/[^\d]/g, "") as string;

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]!) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;

    if (firstDigit !== parseInt(cpf[9]!)) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]!) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;

    return secondDigit === parseInt(cpf[10]!); 
}