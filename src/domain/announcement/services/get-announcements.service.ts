import { PrismaClient } from "@prisma/client";
import { getAllAnnouncements, getAnnouncementsByProperty } from "../repositories/announcement.repository";

export async function getAnnouncementsService(
    propertyId: string | undefined,
    prisma: PrismaClient
) {
    try {
        // Se há filtro por propriedade, retorna anúncios daquela propriedade
        if (propertyId) {
            return await getAnnouncementsByProperty(propertyId, prisma);
        }

        // Caso contrário, retorna todos os anúncios públicos (ativos, com vagas > 0)
        // Ordenados por boost e data, disponíveis para todos os usuários
        return await getAllAnnouncements(prisma);
    } catch (error) {
        throw error;
    }
}

