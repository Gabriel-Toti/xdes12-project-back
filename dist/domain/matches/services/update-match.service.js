"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchService = updateMatchService;
const matches_repository_1 = require("../repositories/matches.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const not_defined_1 = require("../../../utils/errors/not-defined");
const property_repository_1 = require("../../property/repositories/property.repository");
const announcement_repository_1 = require("../../announcement/repositories/announcement.repository");
const create_notification_service_1 = require("../../notification/services/create-notification.service");
async function updateMatchService(requestingUserId, propertyId, numberAnnouncement, matchData, prisma) {
    try {
        const { matchUserId, accepted } = matchData;
        if (!matchUserId) {
            throw new not_defined_1.NotDefined("O identificador do usuário criador do match é obrigatório");
        }
        const match = await (0, matches_repository_1.getMatchById)(matchUserId, propertyId, numberAnnouncement, prisma);
        if (!match) {
            throw new not_found_1.NotFound("Match não encontrado");
        }
        if (accepted !== undefined) {
            const participants = await (0, property_repository_1.getParticipantsByProperty)(propertyId, prisma);
            const userIsAdmin = participants.some(p => p.id_user === requestingUserId && p.admin === true);
            if (!userIsAdmin) {
                throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem aceitar matches");
            }
            if (accepted === true) {
                const announcement = await (0, announcement_repository_1.getAnnouncementById)(propertyId, numberAnnouncement, prisma);
                if (!announcement) {
                    throw new not_found_1.NotFound("Anúncio não encontrado");
                }
                const acceptedMatches = await prisma.matches.count({
                    where: {
                        id_property: propertyId,
                        number_announcement: numberAnnouncement,
                        accepted: true,
                    },
                });
                if (acceptedMatches >= announcement.vacancies) {
                    throw new not_defined_1.NotDefined("Não há mais vagas disponíveis para este anúncio");
                }
            }
        }
        else {
            if (matchUserId !== requestingUserId) {
                throw new not_defined_1.NotDefined("Você só pode atualizar seus próprios matches");
            }
        }
        const dataToUpdate = {};
        if (accepted !== undefined) {
            dataToUpdate.accepted = accepted;
            // Se o match foi aceito, criar notificação para o usuário que deu match
            if (accepted === true) {
                try {
                    const announcement = await (0, announcement_repository_1.getAnnouncementById)(propertyId, numberAnnouncement, prisma);
                    await (0, create_notification_service_1.createNotification)({
                        id_user: matchUserId,
                        type: 'match_accepted',
                        title: '🎉 Seu match foi aceito!',
                        message: `Parabéns! Seu match no anúncio "${announcement?.title || 'Anúncio'}" foi aceito. Entre em contato com o responsável pelo imóvel.`,
                        link: `/anuncio/${propertyId}/${numberAnnouncement}`
                    });
                }
                catch (notifError) {
                    // Falha ao criar notificação não deve impedir o match
                    console.error("Erro ao criar notificação:", notifError);
                }
            }
        }
        return await (0, matches_repository_1.updateMatch)(matchUserId, propertyId, numberAnnouncement, dataToUpdate, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=update-match.service.js.map