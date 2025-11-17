import { Prisma, PrismaClient } from "@prisma/client";
import { AttributeData } from "../interfaces/attributes.interface";
import { UpdatePreferenceData } from "../interfaces/preferences.interface";
import { NotDefined } from "../../../utils/errors/not-defined";

export async function createPreferences(userId: string, weight: number[], preferenceData: AttributeData[], prisma: PrismaClient) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        for(let i = 0; i < preferenceData.length; i++)
        {
            const attr = await tx.attributes.create(
                {
                    data: {
                        ...preferenceData[i]!
                    }
                }
            );

            await tx.preferences.create(
                {
                    data: {
                        attribute: {
                            connect: {
                                id: attr.id
                            }
                        },
                        users: {
                            connect: {
                                id: userId
                            }
                        },
                        weight: weight[i] as number
                    }
                }
            );
        }

        const totalPreferences = await getUserPreferences(userId, prisma);

        if(totalPreferences.length + preferenceData.length < 3)
        {
            throw new NotDefined("O usuário deve registrar ao menos 3 preferências.");
        }
    })
}

export async function userPreferencesExists(userId: string, names: string[], prisma: PrismaClient) {
    return prisma.preferences.findMany(
        {
            where:
            {
                AND: [
                    {
                        users: {
                            id: userId
                        }
                    },
                    {
                        attribute: {
                            name: {
                                in: names
                            }
                        }
                    }
                ]
            }
        }
    );
}

export async function getPreferenceByName(userId: string, name: string, prisma: PrismaClient) {
    return prisma.preferences.findFirst(
        {
            where: {
                AND: [
                    { id_user: userId },
                    { 
                        attribute: {
                            name
                        }
                    }
                ]
            },
        }
    );
}

export async function updatePreference(preferenceData: UpdatePreferenceData, prisma: PrismaClient)
{
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.preferences.update(
            {
                where: {
                    id_attributes: preferenceData.id
                },
                data: {
                    ...( preferenceData.weight && { weight: preferenceData.weight } )
                }
            }
        );

        await tx.attributes.update(
            {
                where: {
                    id: preferenceData.id
                },
                data: {
                    ...(preferenceData.value && { value: preferenceData.value })
                }
            }
        );
    });
}

export function getUserPreferences(userId: string, prisma: PrismaClient)
{
    return prisma.preferences.findMany(
        {
            where: {
                id_user: userId
            }
        }
    );
}

export function getUserPreferencesWithAttributes(userId: string, prisma: PrismaClient) {
    return prisma.preferences.findMany(
        {
            where: {
                id_user: userId
            },
            include: {
                attribute: true
            }
        }
    );
}