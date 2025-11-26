import { PrismaClient } from "@prisma/client";
import { CreateAnnouncementData } from "../interfaces/announcement.interface";
export declare function createAnnouncementService(userId: string, announcementData: CreateAnnouncementData, prisma: PrismaClient): Promise<{
    property: {
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
    };
} & {
    number: number;
    created_at: Date | null;
    id_property: string;
    image_url: string | null;
    title: string;
    description: string | null;
    average_cost: number;
    boost: boolean | null;
    vacancies: number;
}>;
//# sourceMappingURL=create-announcement.service.d.ts.map