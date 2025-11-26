"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatchService = createMatchService;
const matches_repository_1 = require("../repositories/matches.repository");
const announcement_repository_1 = require("../../announcement/repositories/announcement.repository");
const not_defined_1 = require("../../../utils/errors/not-defined");
const already_exists_1 = require("../../../utils/errors/already-exists");
const users_repository_1 = require("../../user/repositories/users.repository");
async function createMatchService(userId, matchData, prisma) {
    try {
        const user = await (0, users_repository_1.getUserById)(userId, prisma);
        if (!user) {
            throw new not_defined_1.NotDefined("Usuário não encontrado");
        }
        const announcement = await (0, announcement_repository_1.getAnnouncementById)(matchData.id_property, matchData.number_announcement, prisma);
        if (!announcement) {
            throw new not_defined_1.NotDefined("Anúncio não encontrado");
        }
        const existingMatch = await (0, matches_repository_1.getMatchById)(userId, matchData.id_property, matchData.number_announcement, prisma);
        if (existingMatch) {
            throw new already_exists_1.AlreadyExists("Você já se candidatou a este anúncio");
        }
        const isParticipant = await prisma.participation.findUnique({
            where: {
                id_user_id_property: {
                    id_user: userId,
                    id_property: matchData.id_property,
                },
            },
        });
        if (isParticipant) {
            throw new not_defined_1.NotDefined("Você não pode se candidatar a um anúncio da sua própria propriedade");
        }
        const acceptedMatches = await prisma.matches.count({
            where: {
                id_property: matchData.id_property,
                number_announcement: matchData.number_announcement,
                accepted: true,
            },
        });
        if (acceptedMatches >= announcement.vacancies) {
            throw new not_defined_1.NotDefined("Não há mais vagas disponíveis para este anúncio");
        }
        return await (0, matches_repository_1.createMatch)({
            ...matchData,
            id_user: userId,
        }, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=create-match.service.js.map