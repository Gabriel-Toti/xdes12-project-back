import { PrismaClient } from "@prisma/client";
import { AttributeData } from "../interfaces/attributes.interface";
import { createRules, propertyRulesExists } from "../repositories/rules.repository";
import { getPropertyById } from "../../property/repositories/property.repository";
import { NotDefined } from "../../../utils/errors/not-defined";

// filepath: /home/toti/projetos-materias/casar/casar-back/src/domain/attributes/services/create-rule.service.ts


export async function createRulesService(propertyId: string, rulePayload: AttributeData[], prisma: PrismaClient) {
    try {

        const property = await getPropertyById(propertyId, prisma);

        if(!property)
        {
            throw new NotDefined("Propriedade inexistente");
        }

        const seen = new Set();

        const names = rulePayload.map((r) => r.name);

        const exists = await propertyRulesExists(propertyId, names, prisma);

        if(exists.length > 0)
        {
            throw new NotDefined("Ao menos uma das regras já está definida.");
        }

        const ruleData: AttributeData[] = [];

        for(let i = 0; i < rulePayload.length; i++)
        {
            let r = rulePayload[i];

            if(seen.has(r!.name)) throw new NotDefined("Regras duplicadas");

            seen.add(r!.name);

            ruleData.push({name: r!.name, value: r!.value});
        }

        await createRules(propertyId, ruleData, prisma);
    } catch (error) {
        throw error;
    }
}