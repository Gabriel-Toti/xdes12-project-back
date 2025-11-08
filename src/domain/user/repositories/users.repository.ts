import { PrismaClient } from "@prisma/client";
import { CreateUserData, UpdateUserData } from "../interfaces/user-data.interface";



export async function createUser(userData: CreateUserData, prisma: PrismaClient) {
    return prisma.users.create(
        {
            data: {
                ...userData
            },
            select: {
                id: true
            }
        }
    );
}

export async function getUserByEmail(email: string, prisma: PrismaClient) {
    return prisma.users.findUnique(
        {
            where: {
                email
            }
        }
    );
}

export async function updateLastLogin(email: string, now: string, prisma: PrismaClient) {
    return prisma.users.update(
        {
            where: {
                email,
            },
            data: {
                last_login: now
            }
        }
    );
}

export async function updateUser(userId: string, userData: UpdateUserData, prisma: PrismaClient) {
    return prisma.users.update(
        {
            where: {
                id: userId
            },
            data:
            {
                ...userData
            }
        }
    );
}

export async function deleteUser(userId: string, prisma: PrismaClient) {
    return prisma.users.delete(
        {
            where: {
                id: userId
            }
        }
    );
}