import { string } from "yup";
import { Gender } from "../../enum/gender.enum";

export const GenderSchema = string()
            .oneOf(Object.values(Gender));