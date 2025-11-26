"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMatchService = deleteMatchService;
const matches_repository_1 = require("../repositories/matches.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const not_defined_1 = require("../../../utils/errors/not-defined");
const property_repository_1 = require("../../property/repositories/property.repository");
async function deleteMatchService(requestingUserId, propertyId, numberAnnouncementOrParams, prisma) {
    try {
        const numberAnnouncement = typeof numberAnnouncementOrParams === "number"
            ? numberAnnouncementOrParams
            : numberAnnouncementOrParams.numberAnnouncement;
        const matchUserId = typeof numberAnnouncementOrParams === "number"
            ? undefined
            : numberAnnouncementOrParams.matchUserId;
        if (!matchUserId) {
            throw new not_defined_1.NotDefined("O identificador do usuário criador do match é obrigatório");
        }
        const match = await (0, matches_repository_1.getMatchById)(matchUserId, propertyId, numberAnnouncement, prisma);
        if (!match) {
            throw new not_found_1.NotFound("Match não encontrado");
        }
        // Verifica se o usuário é o criador do match
        const isMatchCreator = matchUserId === requestingUserId;
        // Verifica se o usuário é administrador do imóvel
        const participants = await (0, property_repository_1.getParticipantsByProperty)(propertyId, prisma);
        const isPropertyAdmin = participants.some(p => p.id_user === requestingUserId && p.admin === true);
        // Permite deletar apenas se for o criador do match ou administrador do imóvel
        if (!isMatchCreator && !isPropertyAdmin) {
            throw new not_defined_1.NotDefined("Apenas o criador do match ou administradores do imóvel podem deletar matches");
        }
        return await (0, matches_repository_1.deleteMatch)(matchUserId, propertyId, numberAnnouncement, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=delete-match.service.js.map