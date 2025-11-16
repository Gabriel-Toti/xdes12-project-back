import { PrismaClient } from "@prisma/client";
import { getPreferenceByName, getUserPreferences } from "../repositories/preference.repository";
import { NotDefined } from "../../../utils/errors/not-defined";
import { deleteAttribute } from "../repositories/attribute.repository";
import { NotFound } from "../../../utils/errors/not-found";

export async function deletePreferenceService(userId: string, name: string, prisma: PrismaClient) {
    try {
        const userPreferences = await getUserPreferences(userId, prisma);

        if(userPreferences.length <= 3)
        {
            throw new NotDefined("Devem haver ao menos 3 preferências para o usuário");
        }

        const preference = await getPreferenceByName(userId, name, prisma);

        if(!preference)
        {
            throw new NotFound("Não foi possível encontrar a preferência.");
        }

        await deleteAttribute(preference.id_attributes, prisma);

    } catch (error) {
        throw error;
    }
}