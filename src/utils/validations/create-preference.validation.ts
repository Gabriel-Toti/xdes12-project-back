import { array, object } from "yup";
import { RequiredAttributeSchema } from "./base/required-attribute.validation";

export const CreatePreferenceSchema = object().shape({
    preferences: array().of(RequiredAttributeSchema)
});

