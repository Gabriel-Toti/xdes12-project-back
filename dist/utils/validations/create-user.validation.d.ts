export declare const CreateUserSchema: import("yup").ObjectSchema<{
    name: string;
    email: string;
    password: string;
    phone: string;
    birthdate: Date;
    gender: NonNullable<import("../enum/gender.enum").Gender | undefined>;
    cpf: string;
}, import("yup").AnyObject, {
    name: undefined;
    email: undefined;
    password: undefined;
    phone: undefined;
    birthdate: undefined;
    gender: undefined;
    cpf: undefined;
}, "">;
//# sourceMappingURL=create-user.validation.d.ts.map