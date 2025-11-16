import { PrismaClient } from "@prisma/client";
import { getAnnouncementById } from "../repositories/announcement.repository";
import { NotFound } from "../../../utils/errors/not-found";

export async function getAnnouncementService(
    propertyId: string,
    number: number,
    prisma: PrismaClient
) {
    try {
        const announcement = await getAnnouncementById(propertyId, number, prisma);

        if (!announcement) {
            throw new NotFound("Anúncio não encontrado");
        }

        return announcement;
    } catch (error) {
        throw error;
    }
}

