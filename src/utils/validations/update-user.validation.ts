import { boolean, object, string } from "yup";
import { Gender } from "../enum/gender.enum";
import { PhoneSchema } from "./base/phone.validation";
import { IdSchema } from "./base/id.validation";

export const EditUserSchema = object().shape(
    {
        userId: IdSchema.required("Impossível prosseguir: Nenhum id de usuário enviado."),
        name: string().notRequired(),
        gender: string().oneOf(Object.values(Gender)).notRequired(),
        phone: PhoneSchema.notRequired(),
        active: boolean().notRequired(),
    }
);