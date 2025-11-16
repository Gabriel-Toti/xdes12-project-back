import { PrismaClient } from "@prisma/client";
import { getAllAnnouncements, getAnnouncementsByProperty, getAnnouncementsByUserProperty } from "../repositories/announcement.repository";

export async function getAnnouncementsService(
    userId: string | undefined,
    propertyId: string | undefined,
    prisma: PrismaClient
) {
    try {
        if (propertyId) {
            return await getAnnouncementsByProperty(propertyId, prisma);
        }

        if (userId) {
            return await getAnnouncementsByUserProperty(userId, prisma);
        }

        return await getAllAnnouncements(prisma);
    } catch (error) {
        throw error;
    }
}

