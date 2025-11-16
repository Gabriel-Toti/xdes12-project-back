import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePropertyData } from "../interfaces/property.interface";
import { NotDefined } from "../../../utils/errors/not-defined";

export async function createProperty(userId: string, {members, ...propertyData}: CreatePropertyData, prisma: PrismaClient) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const property = await tx.property.create({
            data: {
                ...propertyData,
            },
        });

        const participation = await tx.participation.createMany({
            data: [
                {
                    id_user: userId,
                    id_property: property.id,
                    admin: true
                },
                ...members.map((member) => ({
                    id_user: member.id,
                    id_property: property.id,
                    admin: false
                }))
            ],
        });

        const quantity = await tx.participation.findMany(
            {
                where: {
                    id_user: userId,
                    admin: true
                },
            }
        );

        if (quantity.length >= 5) {
            throw new NotDefined("Um usuário não pode participar de mais de 5 imóveis.");
        }
            
        return [property, participation];
    });
}

export async function getPropertyById(id: string, prisma: PrismaClient) {
    return prisma.property.findUnique(
        {
            where: {
                id
            },
            include: {
                rule: {
                    include: {
                        attribute: true
                    }
                }
            }
        }
    );
}


export async function getParticipantsPreferences(id: string, prisma: PrismaClient) {

    const participants = await prisma.participation.findMany({
        where: { id_property: id },
        select: { id_user: true },
    });

    const userIds = participants.map(p => p.id_user);
    
    if (userIds.length === 0) return [];

    return prisma.preferences.findMany({
        where: {
            id_user: { in: userIds },
        },
        include: {
            attribute: true,
        },
    });
    
}