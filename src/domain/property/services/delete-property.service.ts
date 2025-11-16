import { PrismaClient } from "@prisma/client";
import { getPropertyById } from "../repositories/property.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { NotDefined } from "../../../utils/errors/not-defined";
import { getParticipantsByProperty } from "../repositories/property.repository";

export async function deletePropertyService(
    userId: string,
    propertyId: string,
    prisma: PrismaClient
) {
    try {
        const property = await getPropertyById(propertyId, prisma);

        if (!property) {
            throw new NotFound("Propriedade não encontrada");
        }

        const participants = await getParticipantsByProperty(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);

        if (!userIsAdmin) {
            throw new NotDefined("Apenas administradores da propriedade podem deletar a propriedade");
        }

        const existingAnnouncements = await prisma.announcement.findMany({
            where: {
                id_property: propertyId,
            },
        });

        if (existingAnnouncements.length > 0) {
            throw new NotDefined("Não é possível deletar uma propriedade que possui anúncios ativos");
        }

        return await prisma.property.delete({
            where: {
                id: propertyId,
            },
        });
    } catch (error) {
        throw error;
    }
}

