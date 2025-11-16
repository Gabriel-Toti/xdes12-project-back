import { PrismaClient } from "@prisma/client";
import { getMatchById } from "../repositories/matches.repository";
import { NotFound } from "../../../utils/errors/not-found";

export async function getMatchService(
    userId: string,
    propertyId: string,
    numberAnnouncement: number,
    prisma: PrismaClient
) {
    try {
        const match = await getMatchById(userId, propertyId, numberAnnouncement, prisma);

        if (!match) {
            throw new NotFound("Match não encontrado");
        }

        return match;
    } catch (error) {
        throw error;
    }
}

