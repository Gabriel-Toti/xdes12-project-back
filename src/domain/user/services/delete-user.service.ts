import { PrismaClient } from "@prisma/client";
import { deleteUser } from "../repositories/users.repository";

export async function deleteUserService(userId: string, prisma: PrismaClient) {
    try {
        await deleteUser(userId, prisma);
    } catch (error: any) {
        throw error;
    }
}