import { PrismaClient } from "@prisma/client";
import { UpdatePropertyData } from "../interfaces/property.interface";
export declare function updatePropertyService(userId: string, propertyId: string, propertyData: UpdatePropertyData, prisma: PrismaClient): Promise<{
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
}>;
//# sourceMappingURL=update-property.service.d.ts.map