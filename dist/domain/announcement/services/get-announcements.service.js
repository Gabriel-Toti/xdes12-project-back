"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnnouncementsService = getAnnouncementsService;
const announcement_repository_1 = require("../repositories/announcement.repository");
const compatibility_service_1 = require("./compatibility.service");
async function getAnnouncementsService(propertyId, userId, prisma) {
    try {
        let announcements;
        // Se há filtro por propriedade, retorna anúncios daquela propriedade
        if (propertyId) {
            announcements = await (0, announcement_repository_1.getAnnouncementsByProperty)(propertyId, prisma);
        }
        else {
            // Caso contrário, retorna todos os anúncios públicos (ativos, com vagas > 0)
            announcements = await (0, announcement_repository_1.getAllAnnouncements)(prisma);
        }
        // Se há userId, calcular compatibilidade para cada anúncio
        if (userId) {
            const announcementsWithCompatibility = await Promise.all(announcements.map(async (announcement) => {
                const compatibility = await (0, compatibility_service_1.calculatePropertyCompatibility)(userId, announcement.id_property, prisma);
                return {
                    ...announcement,
                    compatibility
                };
            }));
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
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=get-announcements.service.js.map