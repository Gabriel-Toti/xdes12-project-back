"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncementService = deleteAnnouncementService;
const announcement_repository_1 = require("../repositories/announcement.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const not_defined_1 = require("../../../utils/errors/not-defined");
const property_repository_1 = require("../../property/repositories/property.repository");
async function deleteAnnouncementService(userId, propertyId, number, prisma) {
    try {
        const announcement = await (0, announcement_repository_1.getAnnouncementById)(propertyId, number, prisma);
        if (!announcement) {
            throw new not_found_1.NotFound("Anúncio não encontrado");
        }
        const participants = await (0, property_repository_1.getParticipantsByProperty)(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);
        if (!userIsAdmin) {
            throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem deletar anúncios");
        }
        return await (0, announcement_repository_1.deleteAnnouncement)(propertyId, number, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=delete-announcement.service.js.map