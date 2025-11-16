import { PrismaClient } from "@prisma/client";
import { createProperty } from "../repositories/property.repository";
import { CreatePropertyData } from "../interfaces/property.interface";
import { getUserById } from "../../user/repositories/users.repository";
import { NotDefined } from "../../../utils/errors/not-defined";

export async function createPropertyService(userId: string, propertyData: CreatePropertyData, prisma: PrismaClient)
{
    try {

        const user = await getUserById(userId, prisma);

        if(!user)
        {
            throw new NotDefined("Não foi possível encontrar o usuário.");
        }

        return await createProperty(userId, propertyData, prisma);
    } catch (error) {
        throw error;
    }
}