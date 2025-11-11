import { PropertyType } from "../../../utils/enum/property-type.enum";

export interface CreatePropertyData {
    name: string;
    type: PropertyType;
    costs: string;
    address: string;
    total_vacancies: number;
    total_dorms: number;
    total_bathrooms: number;
    garage: boolean;
    external_area: boolean;
}