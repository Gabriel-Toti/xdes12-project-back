import { PrismaClient } from "@prisma/client";
import { getPreferenceByName } from "../repositories/preference.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { updatePreference } from "../repositories/preference.repository";
import { UpdatePreferenceData, UpdatePreferencePayload } from "../interfaces/preferences.interface";

export async function updatePreferenceService(userId: string, name: string, preferencePayload: UpdatePreferencePayload, prisma: PrismaClient) {
    try {

        const preference = await getPreferenceByName(userId, name, prisma);

        if(!preference)
        {
            throw new NotFound("Não foi possível encontrar a preferência especificada");
        }

        const preferenceData: UpdatePreferenceData = {
            ...preferencePayload,
            id: preference.id_attributes
        }

        await updatePreference(preferenceData, prisma);

    } catch (error) {
        throw error;
    }
}