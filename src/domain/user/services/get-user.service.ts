import { PrismaClient } from "@prisma/client";
import { getUserById } from "../repositories/users.repository";
import { NotFound } from "../../../utils/errors/not-found";

export async function getUserService(userId: string, prisma: PrismaClient) {
    try {

        const user = await getUserById(userId, prisma);

        if(!user)
        {
            throw new NotFound("Usuario não encontrado.");
        }

        const { name, birthdate, email, cpf, gender, active, premium, phone } = user;

        return { name, birthdate, email, cpf, gender, active, premium, phone };
    } catch (error) {
        throw error;
    }
}