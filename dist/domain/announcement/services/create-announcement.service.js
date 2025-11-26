"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnnouncementService = createAnnouncementService;
const announcement_repository_1 = require("../repositories/announcement.repository");
const property_repository_1 = require("../../property/repositories/property.repository");
const not_defined_1 = require("../../../utils/errors/not-defined");
const property_repository_2 = require("../../property/repositories/property.repository");
async function createAnnouncementService(userId, announcementData, prisma) {
    try {
        const property = await (0, property_repository_1.getPropertyById)(announcementData.id_property, prisma);
        if (!property) {
            throw new not_defined_1.NotDefined("Propriedade inexistente");
        }
        const participants = await (0, property_repository_2.getParticipantsByProperty)(announcementData.id_property, prisma);
        const userIsParticipant = participants.some(p => p.id_user === userId && p.admin === true);
        if (!userIsParticipant) {
            throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem criar anúncios");
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
            throw new not_defined_1.NotDefined(`Não há vagas suficientes. Vagas disponíveis: ${availableVacancies}`);
        }
        return await (0, announcement_repository_1.createAnnouncement)(announcementData, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=create-announcement.service.js.map