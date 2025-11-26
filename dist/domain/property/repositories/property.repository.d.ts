import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePropertyData, UpdatePropertyData } from "../interfaces/property.interface";
export declare function createProperty(userId: string, { members, ...propertyData }: CreatePropertyData, prisma: PrismaClient): Promise<({
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
} | Prisma.BatchPayload)[]>;
export declare function getPropertyById(id: string, prisma: PrismaClient): Promise<({
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
}) | null>;
export declare function getParticipantsPreferences(id: string, prisma: PrismaClient): Promise<({
    attribute: {
        id: string;
        name: string;
        value: string;
    };
} & {
    id_attributes: string;
    id_user: string;
    weight: number;
})[]>;
export declare function updateProperty(propertyId: string, propertyData: UpdatePropertyData, prisma: PrismaClient): Promise<{
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
export declare function getParticipantsByProperty(propertyId: string, prisma: PrismaClient): Promise<{
    id_user: string;
    id_property: string;
    admin: boolean | null;
}[]>;
export declare function getUserProperties(userId: string, prisma: PrismaClient): Promise<({
    property: {
        announcement: ({
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
} & {
    id_user: string;
    id_property: string;
    admin: boolean | null;
})[]>;
//# sourceMappingURL=property.repository.d.ts.map