import { string } from "yup";

export const PhoneSchema = string()
        .test('is-valid-number', "Número de telefone inválido", (phone) => phone? isValidPhoneNumber(phone) : true)

function isValidPhoneNumber(phone: string): boolean
{
    phone = phone.replace(/[^\d]/g, '')

    if(!/^\d{11}$/g.test(phone))
        return false

    return true;
}