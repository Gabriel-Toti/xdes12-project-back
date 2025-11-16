import { object, boolean } from "yup";

export const UpdateMatchSchema = object().shape({
    accepted: boolean(),
});

