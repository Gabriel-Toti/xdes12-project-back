import { PrismaClient } from "@prisma/client";
import { CreateAnnouncementData } from "../interfaces/announcement.interface";
import { createAnnouncement } from "../repositories/announcement.repository";
import { getPropertyById } from "../../property/repositories/property.repository";
import { NotDefined } from "../../../utils/errors/not-defined";
import { getParticipantsByProperty } from "../../property/repositories/property.repository";

export async function createAnnouncementService(
    userId: string,
    announcementData: CreateAnnouncementData,
    prisma: PrismaClient
) {
    try {
        const property = await getPropertyById(announcementData.id_property, prisma);

        if (!property) {
            throw new NotDefined("Propriedade inexistente");
        }

        const participants = await getParticipantsByProperty(announcementData.id_property, prisma);
        const userIsParticipant = participants.some(p => p.id_user === userId && p.admin === true);

        if (!userIsParticipant) {
            throw new NotDefined("Apenas administradores da propriedade podem criar anúncios");
        }

        const totalVacancies = property.total_vacancies;
        const existingAnnouncements = await prisma.announcement.findMany({
            where: {
                id_property: announcementData.id_property,
            },
        });

        const totalAnnouncedVacancies = existingAnnouncements.reduce((sum, ann) => sum + ann.vacancies, 0);
        const availableVacancies = totalVacancies - totalAnnouncedVacancies;

        if (announcementData.vacancies > availableVacancies) {
            throw new NotDefined(`Não há vagas suficientes. Vagas disponíveis: ${availableVacancies}`);
        }

        return await createAnnouncement(announcementData, prisma);
    } catch (error) {
        throw error;
    }
}

