import { PrismaClient } from "@prisma/client";
export declare function getAnnouncementService(propertyId: string, number: number, userId: string | undefined, prisma: PrismaClient): Promise<({
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
}) | {
    compatibility: number;
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
//# sourceMappingURL=get-announcement.service.d.ts.map