import { PrismaClient } from "@prisma/client";
import { UpdateAnnouncementData } from "../interfaces/announcement.interface";
export declare function updateAnnouncementService(userId: string, propertyId: string, number: number, announcementData: UpdateAnnouncementData, prisma: PrismaClient): Promise<{
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
//# sourceMappingURL=update-announcement.service.d.ts.map