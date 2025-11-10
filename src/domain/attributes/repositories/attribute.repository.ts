import { PrismaClient } from "@prisma/client";

export async function deleteAttribute(id: string, prisma: PrismaClient) {
    return prisma.attributes.delete(
        {
            where: {
                id
            }
        }
    );
}