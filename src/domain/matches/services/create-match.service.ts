import { PrismaClient } from "@prisma/client";
import { CreateMatchData } from "../interfaces/matches.interface";
import { createMatch, getMatchById } from "../repositories/matches.repository";
import { getAnnouncementById } from "../../announcement/repositories/announcement.repository";
import { NotDefined } from "../../../utils/errors/not-defined";
import { AlreadyExists } from "../../../utils/errors/already-exists";
import { getUserById } from "../../user/repositories/users.repository";

export async function createMatchService(
    userId: string,
    matchData: CreateMatchData,
    prisma: PrismaClient
) {
    try {

        const user = await getUserById(userId, prisma);
        if (!user) {
            throw new NotDefined("Usuário não encontrado");
        }

        const announcement = await getAnnouncementById(
            matchData.id_property,
            matchData.number_announcement,
            prisma
        );

        if (!announcement) {
            throw new NotDefined("Anúncio não encontrado");
        }

        const existingMatch = await getMatchById(
            userId,
            matchData.id_property,
            matchData.number_announcement,
            prisma
        );

        if (existingMatch) {
            throw new AlreadyExists("Você já se candidatou a este anúncio");
        }

        const isParticipant = await prisma.participation.findUnique({
            where: {
                id_user_id_property: {
                    id_user: userId,
                    id_property: matchData.id_property,
                } as any,
            },
        });

        if (isParticipant) {
            throw new NotDefined("Você não pode se candidatar a um anúncio da sua própria propriedade");
        }

        const acceptedMatches = await prisma.matches.count({
            where: {
                id_property: matchData.id_property,
                number_announcement: matchData.number_announcement,
                accepted: true,
            },
        });

        if (acceptedMatches >= announcement.vacancies) {
            throw new NotDefined("Não há mais vagas disponíveis para este anúncio");
        }

        return await createMatch(
            {
                ...matchData,
                id_user: userId,
            },
            prisma
        );
    } catch (error) {
        throw error;
    }
}

