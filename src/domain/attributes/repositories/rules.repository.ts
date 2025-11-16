import { Prisma, PrismaClient } from "@prisma/client";
import { AttributeData } from "../interfaces/attributes.interface";
import { NotDefined } from "../../../utils/errors/not-defined";

export async function createRules(propertyId: string, ruleData: AttributeData[], prisma: PrismaClient) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        for(let i = 0; i < ruleData.length; i++)
        {
            const attr = await tx.attributes.create(
                {
                    data: {
                        ...ruleData[i]!
                    }
                }
            );

            await tx.rule.create(
                {
                    data: {
                        attribute: {
                            connect: {
                                id: attr.id
                            }
                        },
                        property: {
                            connect: {
                                id: propertyId
                            }
                        }
                    }
                }
            );
        }

        const totalRules = await getPropertyRules(propertyId, prisma);

        if(totalRules.length + ruleData.length < 1)
        {
            throw new NotDefined("A propriedade deve registrar ao menos 1 regra.");
        }
    })
}

export function getPropertyRules(propertyId: string, prisma: PrismaClient)
{
    return prisma.rule.findMany(
        {
            where: {
                id_property: propertyId
            }
        }
    );
}

export async function propertyRulesExists(propertyId: string, names: string[], prisma: PrismaClient) {
    return prisma.rule.findMany(
        {
            where:
            {
                AND: [
                    {
                        property: {
                            id: propertyId
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