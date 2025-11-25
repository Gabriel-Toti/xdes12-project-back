import { object, string, number, mixed } from "yup";

export const ProcessPaymentSchema = object().shape({
    type: mixed<"boost" | "premium">().oneOf(["boost", "premium"], "Tipo de pagamento deve ser 'boost' ou 'premium'").required("Tipo de pagamento é obrigatório"),
    propertyId: string().when("type", {
        is: "boost",
        then: (schema) => schema.required("ID da propriedade é obrigatório para boost"),
        otherwise: (schema) => schema.notRequired()
    }),
    number: number().when("type", {
        is: "boost",
        then: (schema) => schema.required("Número do anúncio é obrigatório para boost"),
        otherwise: (schema) => schema.notRequired()
    }),
    cardNumber: string().required("Número do cartão é obrigatório"),
    cardHolder: string().required("Nome do portador é obrigatório"),
    expiryDate: string().required("Data de validade é obrigatória"),
    cvv: string().required("CVV é obrigatório")
});

