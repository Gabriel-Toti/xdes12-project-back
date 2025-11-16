import { PrismaClient } from "@prisma/client";
import { UpdateAnnouncementData } from "../interfaces/announcement.interface";
import { updateAnnouncement, getAnnouncementById } from "../repositories/announcement.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { NotDefined } from "../../../utils/errors/not-defined";
import { getParticipantsByProperty } from "../../property/repositories/property.repository";
import { getPropertyById } from "../../property/repositories/property.repository";

export async function updateAnnouncementService(
    userId: string,
    propertyId: string,
    number: number,
    announcementData: UpdateAnnouncementData,
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
            throw new NotDefined("Apenas administradores da propriedade podem atualizar anúncios");
        }

        if (announcementData.vacancies !== undefined) {
            const property = await getPropertyById(propertyId, prisma);
            if (!property) {
                throw new NotFound("Propriedade não encontrada");
            }

            const existingAnnouncements = await prisma.announcement.findMany({
                where: {
                    id_property: propertyId,
                },
            });

            const totalAnnouncedVacancies = existingAnnouncements
                .filter(ann => !(ann.id_property === propertyId && ann.number === number))
                .reduce((sum, ann) => sum + ann.vacancies, 0);
            
            const availableVacancies = property.total_vacancies - totalAnnouncedVacancies;

            if (announcementData.vacancies > availableVacancies) {
                throw new NotDefined(`Não há vagas suficientes. Vagas disponíveis: ${availableVacancies}`);
            }
        }

        return await updateAnnouncement(propertyId, number, announcementData, prisma);
    } catch (error) {
        throw error;
    }
}

