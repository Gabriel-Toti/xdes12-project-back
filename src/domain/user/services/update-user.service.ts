import { PrismaClient } from "@prisma/client";
import { UpdateUserData } from "../interfaces/user-data.interface";
import { updateUser } from "../repositories/users.repository";

export async function UpdateUserService(userId: string, userData: UpdateUserData, prisma: PrismaClient) {
    try {
        await updateUser(userId, userData, prisma);
    } catch (error) {
        throw error;
    }
}