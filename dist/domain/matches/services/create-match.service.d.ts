import { PrismaClient } from "@prisma/client";
import { CreateMatchData } from "../interfaces/matches.interface";
export declare function createMatchService(userId: string, matchData: CreateMatchData, prisma: PrismaClient): Promise<{
    users: {
        id: string;
        email: string;
        phone: string;
        name: string;
    };
    announcement: {
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
    };
} & {
    id_user: string;
    id_property: string;
    number_announcement: number;
    accepted: boolean | null;
}>;
//# sourceMappingURL=create-match.service.d.ts.map