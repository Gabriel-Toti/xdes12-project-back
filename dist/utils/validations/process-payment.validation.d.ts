export declare const ProcessPaymentSchema: import("yup").ObjectSchema<{
    type: NonNullable<"premium" | "boost" | undefined>;
    propertyId: string | undefined;
    number: number | undefined;
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
}, import("yup").AnyObject, {
    type: undefined;
    propertyId: undefined;
    number: undefined;
    cardNumber: undefined;
    cardHolder: undefined;
    expiryDate: undefined;
    cvv: undefined;
}, "">;
//# sourceMappingURL=process-payment.validation.d.ts.map