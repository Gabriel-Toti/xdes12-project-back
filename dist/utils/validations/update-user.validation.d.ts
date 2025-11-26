import { Gender } from "../enum/gender.enum";
export declare const EditUserSchema: import("yup").ObjectSchema<{
    userId: string;
    name: import("yup").Maybe<string | undefined>;
    gender: import("yup").Maybe<Gender | undefined>;
    phone: import("yup").Maybe<string | undefined>;
    active: import("yup").Maybe<boolean | undefined>;
}, import("yup").AnyObject, {
    userId: undefined;
    name: undefined;
    gender: undefined;
    phone: undefined;
    active: undefined;
}, "">;
//# sourceMappingURL=update-user.validation.d.ts.map