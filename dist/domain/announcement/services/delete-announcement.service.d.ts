import { PrismaClient } from "@prisma/client";
export declare function deleteAnnouncementService(userId: string, propertyId: string, number: number, prisma: PrismaClient): Promise<{
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
//# sourceMappingURL=delete-announcement.service.d.ts.map