import { PrismaClient } from "@prisma/client";
import { UpdatePropertyData } from "../interfaces/property.interface";
import { updateProperty, getPropertyById } from "../repositories/property.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { NotDefined } from "../../../utils/errors/not-defined";
import { getParticipantsByProperty } from "../repositories/property.repository";

export async function updatePropertyService(
    userId: string,
    propertyId: string,
    propertyData: UpdatePropertyData,
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
            throw new NotDefined("Apenas administradores da propriedade podem atualizar a propriedade");
        }

        if (propertyData.total_vacancies !== undefined) {
            const existingAnnouncements = await prisma.announcement.findMany({
                where: {
                    id_property: propertyId,
                },
            });

            const totalAnnouncedVacancies = existingAnnouncements.reduce((sum, ann) => sum + ann.vacancies, 0);

            if (propertyData.total_vacancies < totalAnnouncedVacancies) {
                throw new NotDefined(`Não é possível reduzir o total de vagas abaixo de ${totalAnnouncedVacancies} (vagas já anunciadas)`);
            }
        }

        return await updateProperty(propertyId, propertyData, prisma);
    } catch (error) {
        throw error;
    }
}

