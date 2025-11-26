import { Prisma, PrismaClient } from "@prisma/client";
import { AttributeData } from "../interfaces/attributes.interface";
import { UpdatePreferenceData } from "../interfaces/preferences.interface";
export declare function createPreferences(userId: string, weight: number[], preferenceData: AttributeData[], prisma: PrismaClient): Promise<void>;
export declare function userPreferencesExists(userId: string, names: string[], prisma: PrismaClient): Promise<{
    id_attributes: string;
    id_user: string;
    weight: number;
}[]>;
export declare function getPreferenceByName(userId: string, name: string, prisma: PrismaClient): Promise<{
    id_attributes: string;
    id_user: string;
    weight: number;
} | null>;
export declare function updatePreference(preferenceData: UpdatePreferenceData, prisma: PrismaClient): Promise<void>;
export declare function getUserPreferences(userId: string, prisma: PrismaClient): Prisma.PrismaPromise<{
    id_attributes: string;
    id_user: string;
    weight: number;
}[]>;
export declare function getUserPreferencesWithAttributes(userId: string, prisma: PrismaClient): Prisma.PrismaPromise<({
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
//# sourceMappingURL=preference.repository.d.ts.map