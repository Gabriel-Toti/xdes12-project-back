export interface ProcessPaymentData {
    type: "boost" | "premium";
    propertyId?: string; // Obrigatório se type === "boost"
    number?: number; // Obrigatório se type === "boost"
    // Dados simulados do cartão (não são validados, apenas simulados)
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
}

