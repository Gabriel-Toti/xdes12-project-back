import { Prisma, PrismaClient } from "@prisma/client";
import { AttributeData } from "../interfaces/attributes.interface";

export async function createPreferences(userId: string, weight: number[], preferenceData: AttributeData[], prisma: PrismaClient) {
    prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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