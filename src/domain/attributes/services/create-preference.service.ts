import { PrismaClient } from "@prisma/client";
import { AttributeData, CreateAttributePayload } from "../interfaces/attributes.interface";
import { createPreferences, userPreferencesExists } from "../repositories/preference.repository";
import { getUserById } from "../../user/repositories/users.repository";
import { NotDefined } from "../../../utils/errors/not-defined";


export async function createPreferencesService(userId: string, preferencePayload: CreateAttributePayload[], prisma: PrismaClient) {
    try {

        const user = await getUserById(userId, prisma);

        if(!user)
        {
            throw new NotDefined("Usuário inexistente");
        }

        const names = preferencePayload.map((p) => p.name);

        const exists = await userPreferencesExists(userId, names, prisma)

        if(exists.length > 0)
        {
            throw new NotDefined("Ao menos uma das preferências já está definida.");
        }

        const preferenceData: AttributeData[] = [];
        const weight: number[] = []

        preferencePayload.map((p) => {
            preferenceData.push({name: p.name, value: p.value});
            weight.push(p.weight);
        });

        await createPreferences(userId, weight, preferenceData, prisma);
    } catch (error) {
        throw error;
    }
}