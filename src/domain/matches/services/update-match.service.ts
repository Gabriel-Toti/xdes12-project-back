import { PrismaClient } from "@prisma/client";
import { UpdateMatchData } from "../interfaces/matches.interface";
import { updateMatch, getMatchById } from "../repositories/matches.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { NotDefined } from "../../../utils/errors/not-defined";
import { getParticipantsByProperty } from "../../property/repositories/property.repository";
import { getAnnouncementById } from "../../announcement/repositories/announcement.repository";
import { createNotification } from "../../notification/services/create-notification.service";

export async function updateMatchService(
    requestingUserId: string,
    propertyId: string,
    numberAnnouncement: number,
    matchData: UpdateMatchData & { matchUserId: string },
    prisma: PrismaClient
) {
    try {
        const { matchUserId, accepted } = matchData;

        if (!matchUserId) {
            throw new NotDefined("O identificador do usuário criador do match é obrigatório");
        }

        const match = await getMatchById(matchUserId, propertyId, numberAnnouncement, prisma);

        if (!match) {
            throw new NotFound("Match não encontrado");
        }

        if (accepted !== undefined) {
            const participants = await getParticipantsByProperty(propertyId, prisma);
            const userIsAdmin = participants.some(p => p.id_user === requestingUserId && p.admin === true);

            if (!userIsAdmin) {
                throw new NotDefined("Apenas administradores da propriedade podem aceitar matches");
            }

            if (accepted === true) {
                const announcement = await getAnnouncementById(propertyId, numberAnnouncement, prisma);
                if (!announcement) {
                    throw new NotFound("Anúncio não encontrado");
                }

                const acceptedMatches = await prisma.matches.count({
                    where: {
                        id_property: propertyId,
                        number_announcement: numberAnnouncement,
                        accepted: true,
                    },
                });

                if (acceptedMatches >= announcement.vacancies) {
                    throw new NotDefined("Não há mais vagas disponíveis para este anúncio");
                }
            }
        } else {
            if (matchUserId !== requestingUserId) {
                throw new NotDefined("Você só pode atualizar seus próprios matches");
            }
        }

        const dataToUpdate: UpdateMatchData = {};

        if (accepted !== undefined) {
            dataToUpdate.accepted = accepted;
            
            // Se o match foi aceito, criar notificação para o usuário que deu match
            if (accepted === true) {
                try {
                    const announcement = await getAnnouncementById(propertyId, numberAnnouncement, prisma);
                    await createNotification({
                        id_user: matchUserId,
                        type: 'match_accepted',
                        title: '🎉 Seu match foi aceito!',
                        message: `Parabéns! Seu match no anúncio "${announcement?.title || 'Anúncio'}" foi aceito. Entre em contato com o responsável pelo imóvel.`,
                        link: `/anuncio/${propertyId}/${numberAnnouncement}`
                    });
                } catch (notifError) {
                    // Falha ao criar notificação não deve impedir o match
                    console.error("Erro ao criar notificação:", notifError);
                }
            }
        }

        return await updateMatch(matchUserId, propertyId, numberAnnouncement, dataToUpdate, prisma);
    } catch (error) {
        throw error;
    }
}

