import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePropertyData } from "../interfaces/property.interface";

export async function createProperty(userId: string, propertyData: CreatePropertyData, prisma: PrismaClient) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const property = await tx.property.create({
            data: {
                ...propertyData,
            },
        });

        const participation = await tx.participation.create({
            data: {
                id_user: userId,
                id_property: property.id,
                admin: true
            },
        });

        return [property, participation];
    });
}