import { PrismaClient } from "@prisma/client";
import { getParticipantsPreferences, getPropertyById } from "../repositories/property.repository";

export async function getPropertyService(id: string, prisma: PrismaClient) {
    try {
        const property = await getPropertyById(id, prisma);

        const preferences = await getParticipantsPreferences(id, prisma);

        const preferencesMap = preferences.map(p => {
            return {name: p.attribute.name, value: p.attribute.value};
        });

        let majorPreferences: {[key: string]: number} = {};

        for (let pref of preferencesMap) {
            const prefKey = `${pref.name}:${pref.value}`;

            if (majorPreferences[prefKey]) {
                majorPreferences[prefKey] += 1;
            } else {
                majorPreferences[prefKey] = 1;
            }
        }

        const cleanProperty = property ? {
            ...property,
            rule: property.rule.map(r => ({
                name: r.attribute.name,
                value: r.attribute.value
            }))
        } : null;

        return { cleanProperty, majorPreferences };

    } catch (error) {
        throw error;
    }
}