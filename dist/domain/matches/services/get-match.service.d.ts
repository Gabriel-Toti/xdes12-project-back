import { PrismaClient } from "@prisma/client";
export declare function getMatchService(userId: string, propertyId: string, numberAnnouncement: number, prisma: PrismaClient): Promise<{
    users: {
        id: string;
        email: string;
        phone: string;
        name: string;
    };
    announcement: {
        property: {
            rule: ({
                attribute: {
                    id: string;
                    name: string;
                    value: string;
                };
            } & {
                id_attributes: string;
                id_property: string;
            })[];
        } & {
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
    };
} & {
    id_user: string;
    id_property: string;
    number_announcement: number;
    accepted: boolean | null;
}>;
//# sourceMappingURL=get-match.service.d.ts.map