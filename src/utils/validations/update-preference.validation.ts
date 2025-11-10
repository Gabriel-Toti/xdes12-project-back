import { number, object, string } from "yup";
import { isValidAttribute, isValidAttributeName } from "../attributes";

export const UpdatePreferenceSchema = object().shape(
    {
        name: string()
        .required("O Nome é obrigatório"),
        value: string()
        .notRequired(),
        weight: number()
        .integer()
        .min(1)
        .max(10)
        .notRequired()
    }
).test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => {
    if(!attr) return false;

    if(attr.value === undefined || attr.value === null)
    {
        return isValidAttributeName(attr.name);
    }

    const { name, value } = attr;

    return isValidAttribute({ name, value });
})