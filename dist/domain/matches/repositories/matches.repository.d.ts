import { PrismaClient } from "@prisma/client";
import { CreateMatchData, UpdateMatchData } from "../interfaces/matches.interface";
export declare function createMatch(matchData: CreateMatchData, prisma: PrismaClient): Promise<{
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
export declare function getMatchById(userId: string, propertyId: string, numberAnnouncement: number, prisma: PrismaClient): Promise<({
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
}) | null>;
export declare function getMatchesByUser(userId: string, prisma: PrismaClient): Promise<({
    announcement: {
        property: {
            participation: ({
                users: {
                    id: string;
                    email: string;
                    phone: string;
                    name: string;
                };
            } & {
                id_user: string;
                id_property: string;
                admin: boolean | null;
            })[];
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
})[]>;
export declare function getMatchesByAnnouncement(propertyId: string, numberAnnouncement: number, prisma: PrismaClient): Promise<({
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
})[]>;
export declare function updateMatch(userId: string, propertyId: string, numberAnnouncement: number, matchData: UpdateMatchData, prisma: PrismaClient): Promise<{
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
export declare function deleteMatch(userId: string, propertyId: string, numberAnnouncement: number, prisma: PrismaClient): Promise<{
    id_user: string;
    id_property: string;
    number_announcement: number;
    accepted: boolean | null;
}>;
//# sourceMappingURL=matches.repository.d.ts.map