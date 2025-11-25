import { PrismaClient } from "@prisma/client";
import { getAllAnnouncements, getAnnouncementsByProperty } from "../repositories/announcement.repository";
import { calculatePropertyCompatibility } from "./compatibility.service";

// Tipo base que representa um anúncio com suas propriedades básicas
type AnnouncementBase = {
    id_property: string;
    number: number;
    title: string;
    description: string | null;
    average_cost: number;
    boost: boolean | null;
    vacancies: number;
    created_at: Date | null;
    property: {
        id: string;
        name: string;
        type: string;
        address: string;
        rule: Array<{
            attribute: {
                name: string;
                value: string;
            };
        }>;
    };
    [key: string]: any; // Permite propriedades adicionais
};

type AnnouncementWithCompatibility = AnnouncementBase & {
    compatibility?: number;
};

export async function getAnnouncementsService(
    propertyId: string | undefined,
    userId: string | undefined,
    prisma: PrismaClient
) {
    try {
        let announcements: AnnouncementBase[];

        // Se há filtro por propriedade, retorna anúncios daquela propriedade
        if (propertyId) {
            announcements = await getAnnouncementsByProperty(propertyId, prisma) as AnnouncementBase[];
        } else {
            // Caso contrário, retorna todos os anúncios públicos (ativos, com vagas > 0)
            announcements = await getAllAnnouncements(prisma) as AnnouncementBase[];
        }

        // Se há userId, calcular compatibilidade para cada anúncio
        if (userId) {
            const announcementsWithCompatibility: AnnouncementWithCompatibility[] = await Promise.all(
                announcements.map(async (announcement) => {
                    const compatibility = await calculatePropertyCompatibility(
                        userId,
                        announcement.id_property,
                        prisma
                    );
                    return {
                        ...announcement,
                        compatibility
                    };
                })
            );

            // Ordenar por: compatibilidade (desc), boost (desc), data (desc)
            return announcementsWithCompatibility.sort((a, b) => {
                // Primeiro por compatibilidade (se disponível)
                const aCompat = a.compatibility ?? 0;
                const bCompat = b.compatibility ?? 0;
                if (Math.abs(aCompat - bCompat) > 0.001) {
                    return bCompat - aCompat; // Maior compatibilidade primeiro
                }

                // Depois por boost
                const aBoost = a.boost === true ? 1 : 0;
                const bBoost = b.boost === true ? 1 : 0;
                if (aBoost !== bBoost) {
                    return bBoost - aBoost; // Boost primeiro
                }

                // Por fim, por data
                const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
                const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
                return bDate - aDate; // Mais recentes primeiro
            });
        }

        // Se não há userId, manter ordenação original (boost e data)
        return announcements;
    } catch (error) {
        throw error;
    }
}

