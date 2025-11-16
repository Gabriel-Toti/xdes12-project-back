import { PrismaClient } from "@prisma/client";
import { deleteMatch, getMatchById } from "../repositories/matches.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { NotDefined } from "../../../utils/errors/not-defined";
import { getParticipantsByProperty } from "../../property/repositories/property.repository";

export function deleteMatchService(
    requestingUserId: string,
    propertyId: string,
    numberAnnouncement: number,
    prisma: PrismaClient
): Promise<Awaited<ReturnType<typeof deleteMatch>>>;
export function deleteMatchService(
    requestingUserId: string,
    propertyId: string,
    params: { numberAnnouncement: number; matchUserId: string },
    prisma: PrismaClient
): Promise<Awaited<ReturnType<typeof deleteMatch>>>;
export async function deleteMatchService(
    requestingUserId: string,
    propertyId: string,
    numberAnnouncementOrParams: number | { numberAnnouncement: number; matchUserId: string },
    prisma: PrismaClient
) {
    try {
        const numberAnnouncement =
            typeof numberAnnouncementOrParams === "number"
                ? numberAnnouncementOrParams
                : numberAnnouncementOrParams.numberAnnouncement;

        const matchUserId =
            typeof numberAnnouncementOrParams === "number"
                ? undefined
                : numberAnnouncementOrParams.matchUserId;

        if (!matchUserId) {
            throw new NotDefined("O identificador do usuário criador do match é obrigatório");
        }

        const match = await getMatchById(matchUserId, propertyId, numberAnnouncement, prisma);

        if (!match) {
            throw new NotFound("Match não encontrado");
        }

        // Verifica se o usuário é o criador do match
        const isMatchCreator = matchUserId === requestingUserId;

        // Verifica se o usuário é administrador do imóvel
        const participants = await getParticipantsByProperty(propertyId, prisma);
        const isPropertyAdmin = participants.some(p => p.id_user === requestingUserId && p.admin === true);

        // Permite deletar apenas se for o criador do match ou administrador do imóvel
        if (!isMatchCreator && !isPropertyAdmin) {
            throw new NotDefined("Apenas o criador do match ou administradores do imóvel podem deletar matches");
        }

        return await deleteMatch(matchUserId, propertyId, numberAnnouncement, prisma);
    } catch (error) {
        throw error;
    }
}

