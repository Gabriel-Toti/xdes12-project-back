import { PrismaClient } from "@prisma/client";
export declare function getPropertyService(id: string, prisma: PrismaClient): Promise<{
    cleanProperty: {
        rule: {
            name: string;
            value: string;
        }[];
        images: {
            id: string;
            created_at: Date | null;
            id_property: string;
            image_url: string;
        }[];
        id: string;
        created_at: Date | null;
        name: string;
        costs: string;
        type: import(".prisma/client").$Enums.property_type_t;
        address: string;
        total_vacancies: number;
        total_dorms: number;
        total_bathrooms: number;
        garage: boolean;
        external_area: boolean;
        image_url: string | null;
    } | null;
    majorPreferences: {
        [key: string]: number;
    };
}>;
//# sourceMappingURL=get-property.service.d.ts.map