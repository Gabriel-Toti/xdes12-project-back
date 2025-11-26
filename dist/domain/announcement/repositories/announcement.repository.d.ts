import { PrismaClient } from "@prisma/client";
import { CreateAnnouncementData, UpdateAnnouncementData } from "../interfaces/announcement.interface";
export declare function createAnnouncement(announcementData: CreateAnnouncementData, prisma: PrismaClient): Promise<{
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
export declare function getAnnouncementById(propertyId: string, number: number, prisma: PrismaClient): Promise<({
    matches: ({
        users: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id_user: string;
        id_property: string;
        number_announcement: number;
        accepted: boolean | null;
    })[];
    property: {
        participation: {
            id_user: string;
            admin: boolean | null;
        }[];
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
        images: {
            id: string;
            created_at: Date | null;
            id_property: string;
            image_url: string;
        }[];
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
    images: {
        id: string;
        created_at: Date | null;
        id_property: string;
        image_url: string;
        number_announcement: number;
    }[];
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
}) | null>;
export declare function getAnnouncementsByProperty(propertyId: string, prisma: PrismaClient): Promise<({
    matches: ({
        users: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id_user: string;
        id_property: string;
        number_announcement: number;
        accepted: boolean | null;
    })[];
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
        images: {
            id: string;
            created_at: Date | null;
            id_property: string;
            image_url: string;
        }[];
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
    images: {
        id: string;
        created_at: Date | null;
        id_property: string;
        image_url: string;
        number_announcement: number;
    }[];
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
})[]>;
export declare function getAllAnnouncements(prisma: PrismaClient): Promise<({
    property: {
        participation: {
            id_user: string;
            admin: boolean | null;
        }[];
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
        images: {
            id: string;
            created_at: Date | null;
            id_property: string;
            image_url: string;
        }[];
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
    images: {
        id: string;
        created_at: Date | null;
        id_property: string;
        image_url: string;
        number_announcement: number;
    }[];
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
})[]>;
export declare function updateAnnouncement(propertyId: string, number: number, announcementData: UpdateAnnouncementData, prisma: PrismaClient): Promise<{
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
export declare function deleteAnnouncement(propertyId: string, number: number, prisma: PrismaClient): Promise<{
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
export declare function getAnnouncementsByUserProperty(userId: string, prisma: PrismaClient): Promise<({
    matches: ({
        users: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id_user: string;
        id_property: string;
        number_announcement: number;
        accepted: boolean | null;
    })[];
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
})[]>;
//# sourceMappingURL=announcement.repository.d.ts.map