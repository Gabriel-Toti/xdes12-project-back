import { string } from "yup";

export const IdSchema = string().uuid("O Id deve ser um uuid válido.")