"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnnouncementService = updateAnnouncementService;
const announcement_repository_1 = require("../repositories/announcement.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const not_defined_1 = require("../../../utils/errors/not-defined");
const property_repository_1 = require("../../property/repositories/property.repository");
const property_repository_2 = require("../../property/repositories/property.repository");
async function updateAnnouncementService(userId, propertyId, number, announcementData, prisma) {
    try {
        const announcement = await (0, announcement_repository_1.getAnnouncementById)(propertyId, number, prisma);
        if (!announcement) {
            throw new not_found_1.NotFound("Anúncio não encontrado");
        }
        const participants = await (0, property_repository_1.getParticipantsByProperty)(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);
        if (!userIsAdmin) {
            throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem atualizar anúncios");
        }
        if (announcementData.vacancies !== undefined) {
            const property = await (0, property_repository_2.getPropertyById)(propertyId, prisma);
            if (!property) {
                throw new not_found_1.NotFound("Propriedade não encontrada");
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
                throw new not_defined_1.NotDefined(`Não há vagas suficientes. Vagas disponíveis: ${availableVacancies}`);
            }
        }
        return await (0, announcement_repository_1.updateAnnouncement)(propertyId, number, announcementData, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=update-announcement.service.js.map