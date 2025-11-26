"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchService = getMatchService;
const matches_repository_1 = require("../repositories/matches.repository");
const not_found_1 = require("../../../utils/errors/not-found");
async function getMatchService(userId, propertyId, numberAnnouncement, prisma) {
    try {
        const match = await (0, matches_repository_1.getMatchById)(userId, propertyId, numberAnnouncement, prisma);
        if (!match) {
            throw new not_found_1.NotFound("Match não encontrado");
        }
        return match;
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=get-match.service.js.map