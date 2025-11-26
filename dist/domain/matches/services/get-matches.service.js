"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchesService = getMatchesService;
const matches_repository_1 = require("../repositories/matches.repository");
async function getMatchesService(userId, propertyId, numberAnnouncement, prisma) {
    try {
        if (propertyId && numberAnnouncement !== undefined) {
            return await (0, matches_repository_1.getMatchesByAnnouncement)(propertyId, numberAnnouncement, prisma);
        }
        if (userId) {
            return await (0, matches_repository_1.getMatchesByUser)(userId, prisma);
        }
        throw new Error("É necessário fornecer userId ou propertyId e numberAnnouncement");
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=get-matches.service.js.map