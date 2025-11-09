import { object, string } from "yup";
import { Gender } from "../enum/gender.enum";

export const CreateUserSchema = object().shape(
    {
        name: string()
        .required("Nome é obrigatório"),
        email: string()
        .email("Email deve ser um email válido")
        .required("Email é obrigatório"),
        password: string()
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
            .required('A senha é um campo obrigatório.'),
            phone: string()
            .test('is-valid-number', "Número de telefone inválido", (phone) => phone? isValidPhoneNumber(phone) : false)
            .required("O telefone é obrigatório."),
            gender: string()
            .oneOf(Object.values(Gender))
            .required("Gênero é obrigatório"),
            cpf: string()
            .test("is-cpf_valid", "CPF inválido", (cpf) => cpf? isCPFValid(cpf) : false)
            .required("CPF é Obrigatório.")
    }
);

function isValidPhoneNumber(phone: string): boolean
{
    phone = phone.replace(/[^\d]/g, '')

    if(!/^\d{11}$/g.test(phone))
        return false

    return true;
}

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