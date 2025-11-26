export interface ProcessPaymentData {
    type: "boost" | "premium";
    propertyId?: string;
    number?: number;
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
}
//# sourceMappingURL=payment.interface.d.ts.map