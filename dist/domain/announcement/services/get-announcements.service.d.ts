import { PrismaClient } from "@prisma/client";
type AnnouncementBase = {
    id_property: string;
    number: number;
    title: string;
    description: string | null;
    average_cost: number;
    boost: boolean | null;
    vacancies: number;
    created_at: Date | null;
    property: {
        id: string;
        name: string;
        type: string;
        address: string;
        rule: Array<{
            attribute: {
                name: string;
                value: string;
            };
        }>;
    };
    [key: string]: any;
};
export declare function getAnnouncementsService(propertyId: string | undefined, userId: string | undefined, prisma: PrismaClient): Promise<AnnouncementBase[]>;
export {};
//# sourceMappingURL=get-announcements.service.d.ts.map