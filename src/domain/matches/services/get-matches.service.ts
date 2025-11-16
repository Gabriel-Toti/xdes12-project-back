import { PrismaClient } from "@prisma/client";
import { getMatchesByUser, getMatchesByAnnouncement } from "../repositories/matches.repository";

export async function getMatchesService(
    userId: string | undefined,
    propertyId: string | undefined,
    numberAnnouncement: number | undefined,
    prisma: PrismaClient
) {
    try {
        if (propertyId && numberAnnouncement !== undefined) {
            return await getMatchesByAnnouncement(propertyId, numberAnnouncement, prisma);
        }

        if (userId) {
            return await getMatchesByUser(userId, prisma);
        }

        throw new Error("É necessário fornecer userId ou propertyId e numberAnnouncement");
    } catch (error) {
        throw error;
    }
}

