import { number, object, string } from "yup";
import { isValidAttribute } from "../../attributes";

export const RequiredAttributeSchema = object().shape(
    {
        name: string()
        .required("O Nome é obrigatório"),
        value: string()
        .required("O valor é obrigatório"),
        weight: number()
        .integer()
        .min(1)
        .max(10)
        .required("É necessário informar um peso para a preferência.")
    }
).test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => attr ? isValidAttribute(attr) : false)