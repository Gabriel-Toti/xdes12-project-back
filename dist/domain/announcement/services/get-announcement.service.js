"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnnouncementService = getAnnouncementService;
const announcement_repository_1 = require("../repositories/announcement.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const compatibility_service_1 = require("./compatibility.service");
async function getAnnouncementService(propertyId, number, userId, prisma) {
    try {
        const announcement = await (0, announcement_repository_1.getAnnouncementById)(propertyId, number, prisma);
        if (!announcement) {
            throw new not_found_1.NotFound("Anúncio não encontrado");
        }
        // Se há userId, calcular compatibilidade
        if (userId) {
            const compatibility = await (0, compatibility_service_1.calculatePropertyCompatibility)(userId, propertyId, prisma);
            return {
                ...announcement,
                compatibility
            };
        }
        return announcement;
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=get-announcement.service.js.map