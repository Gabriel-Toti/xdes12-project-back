import { PrismaClient } from "@prisma/client";
import { getAnnouncementById } from "../repositories/announcement.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { calculatePropertyCompatibility } from "./compatibility.service";

export async function getAnnouncementService(
    propertyId: string,
    number: number,
    userId: string | undefined,
    prisma: PrismaClient
) {
    try {
        const announcement = await getAnnouncementById(propertyId, number, prisma);

        if (!announcement) {
            throw new NotFound("Anúncio não encontrado");
        }

        // Se há userId, calcular compatibilidade
        if (userId) {
            const compatibility = await calculatePropertyCompatibility(
                userId,
                propertyId,
                prisma
            );
            return {
                ...announcement,
                compatibility
            };
        }

        return announcement;
    } catch (error) {
        throw error;
    }
}

