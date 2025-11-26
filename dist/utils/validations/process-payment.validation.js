"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessPaymentSchema = void 0;
const yup_1 = require("yup");
exports.ProcessPaymentSchema = (0, yup_1.object)().shape({
    type: (0, yup_1.mixed)().oneOf(["boost", "premium"], "Tipo de pagamento deve ser 'boost' ou 'premium'").required("Tipo de pagamento é obrigatório"),
    propertyId: (0, yup_1.string)().when("type", {
        is: "boost",
        then: (schema) => schema.required("ID da propriedade é obrigatório para boost"),
        otherwise: (schema) => schema.notRequired()
    }),
    number: (0, yup_1.number)().when("type", {
        is: "boost",
        then: (schema) => schema.required("Número do anúncio é obrigatório para boost"),
        otherwise: (schema) => schema.notRequired()
    }),
    cardNumber: (0, yup_1.string)().required("Número do cartão é obrigatório"),
    cardHolder: (0, yup_1.string)().required("Nome do portador é obrigatório"),
    expiryDate: (0, yup_1.string)().required("Data de validade é obrigatória"),
    cvv: (0, yup_1.string)().required("CVV é obrigatório")
});
//# sourceMappingURL=process-payment.validation.js.map