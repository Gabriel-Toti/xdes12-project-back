import { PropertyType } from "../enum/property-type.enum";
export declare const CreatePropertySchema: import("yup").ObjectSchema<{
    name: string;
    type: NonNullable<PropertyType | undefined>;
    costs: string;
    address: string;
    total_vacancies: number;
    total_dorms: number;
    total_bathrooms: number;
    garage: NonNullable<boolean | undefined>;
    external_area: NonNullable<boolean | undefined>;
    members: {
        id: string;
    }[];
}, import("yup").AnyObject, {
    name: undefined;
    type: undefined;
    costs: undefined;
    address: undefined;
    total_vacancies: undefined;
    total_dorms: undefined;
    total_bathrooms: undefined;
    garage: undefined;
    external_area: undefined;
    members: "";
}, "">;
//# sourceMappingURL=create-property.validation.d.ts.map