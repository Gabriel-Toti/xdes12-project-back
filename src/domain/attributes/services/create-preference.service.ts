import { PrismaClient } from "@prisma/client";
import { AttributeData } from "../interfaces/attributes.interface";
import { createPreferences, userPreferencesExists } from "../repositories/preference.repository";
import { getUserById } from "../../user/repositories/users.repository";
import { NotDefined } from "../../../utils/errors/not-defined";
import { CreatePreferencePayload } from "../interfaces/preferences.interface";


export async function createPreferencesService(userId: string, preferencePayload: CreatePreferencePayload[], prisma: PrismaClient) {
    try {

        const user = await getUserById(userId, prisma);

        if(!user)
        {
            throw new NotDefined("Usuário inexistente");
        }

        const seen = new Set();

        const names = preferencePayload.map((p) => p.name);

        const exists = await userPreferencesExists(userId, names, prisma);

        if(exists.length > 0)
        {
            throw new NotDefined("Ao menos uma das preferências já está definida.");
        }

        const preferenceData: AttributeData[] = [];
        const weight: number[] = []

        for(let i = 0; i < preferencePayload.length; i++)
        {
            let p = preferencePayload[i];

            if(seen.has(p!.name)) throw new NotDefined("Preferências duplicadas");

            seen.add(p!.name);

            preferenceData.push({name: p!.name, value: p!.value});
            weight.push(p!.weight);

        }

        await createPreferences(userId, weight, preferenceData, prisma);
    } catch (error) {
        throw error;
    }
}