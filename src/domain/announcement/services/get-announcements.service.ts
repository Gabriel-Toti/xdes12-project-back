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

            // Ordenar por: compatibilidade com leve boost para anúncios com boost, depois por data
            // O boost permite que anúncios com boost apareçam à frente de anúncios sem boost
            // quando a diferença de compatibilidade for de até 4 pontos
            return announcementsWithCompatibility.sort((a, b) => {
                const aCompat = a.compatibility ?? 0;
                const bCompat = b.compatibility ?? 0;
                
                const aHasBoost = a.boost === true;
                const bHasBoost = b.boost === true;
                
                // Calcular diferença absoluta de compatibilidade
                const compatDiffAbs = Math.abs(aCompat - bCompat);
                
                // Se a diferença é maior que 4 pontos, ordenar apenas por compatibilidade
                if (compatDiffAbs > 4) {
                    return bCompat - aCompat; // Maior compatibilidade primeiro
                }
                
                // Se a diferença é <= 4 pontos, aplicar boost
                // Anúncios com boost aparecem antes de anúncios sem boost
                if (aHasBoost && !bHasBoost) {
                    // A tem boost, B não tem - A aparece primeiro (mesmo que B tenha até 4 pontos a mais)
                    return -1;
                }
                if (!aHasBoost && bHasBoost) {
                    // B tem boost, A não tem - B aparece primeiro (mesmo que A tenha até 4 pontos a mais)
                    return 1;
                }
                
                // Se ambos têm ou não têm boost, ordenar por compatibilidade
                if (aCompat !== bCompat) {
                    return bCompat - aCompat; // Maior compatibilidade primeiro
                }

                // Por fim, por data (mais recentes primeiro)
                const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
                const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
                return bDate - aDate;
            });
        }

        // Se não há userId, ordenar por boost e data
        // Anúncios com boost aparecem primeiro, depois por data
        return announcements.sort((a, b) => {
            // Primeiro por boost
            const aBoost = a.boost === true ? 1 : 0;
            const bBoost = b.boost === true ? 1 : 0;
            if (aBoost !== bBoost) {
                return bBoost - aBoost; // Boost primeiro
            }

            // Depois por data (mais recentes primeiro)
            const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
            const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
            return bDate - aDate;
        });
    } catch (error) {
        throw error;
    }
}

