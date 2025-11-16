import { PrismaClient } from "@prisma/client";
import { deleteAnnouncement, getAnnouncementById } from "../repositories/announcement.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { NotDefined } from "../../../utils/errors/not-defined";
import { getParticipantsByProperty } from "../../property/repositories/property.repository";

export async function deleteAnnouncementService(
    userId: string,
    propertyId: string,
    number: number,
    prisma: PrismaClient
) {
    try {
        const announcement = await getAnnouncementById(propertyId, number, prisma);

        if (!announcement) {
            throw new NotFound("Anúncio não encontrado");
        }

        const participants = await getParticipantsByProperty(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);

        if (!userIsAdmin) {
            throw new NotDefined("Apenas administradores da propriedade podem deletar anúncios");
        }

        return await deleteAnnouncement(propertyId, number, prisma);
    } catch (error) {
        throw error;
    }
}

