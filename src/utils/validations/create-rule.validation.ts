import { array, object, string } from "yup";
import { isValidAttribute } from "../attributes";

export const CreateRulesSchema = object().shape({
    propertyId: string().required("Property ID is required"),
    rules: array().of(
        object().shape({
            name: string()
            .required("O Nome é obrigatório"),
            value: string()
            .required("O valor é obrigatório"),
        })
        .test("is-valid-attribute", "Nome ou valor não condizem com os attributos possíveis", (attr) => attr ? isValidAttribute(attr) : false)
    ).required("At least one rule is required")
})