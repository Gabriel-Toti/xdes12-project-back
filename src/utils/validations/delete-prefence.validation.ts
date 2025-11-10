import { object, string } from "yup";
import { isValidAttributeName } from "../attributes";

export const DeletePreferenceSchema = object().shape(
    {
        name: string()
        .required("O Nome é obrigatório"),
    }
).test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => {
    if(!attr) return false;
    return isValidAttributeName(attr.name);
})