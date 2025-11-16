import { object, string } from "yup";
import { isValidAttribute, isValidAttributeName } from "../attributes";
import { IdSchema } from "./base/id.validation";

export const UpdateRuleSchema = object().shape(
    {
        name: string()
        .required("O Nome é obrigatório"),
        value: string()
        .required("O Valor é obrigatório"),
        propertyId: IdSchema.required("ID da propriedade é obrigatório")
    }
).test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => {
    if(!attr) return false;

    console.log(attr);

    if(attr.value === undefined || attr.value === null)
    {
        return isValidAttributeName(attr.name);
    }

    const { name, value } = attr;

    return isValidAttribute({ name, value });
})