import { PrismaClient } from "@prisma/client";
import { getPropertyRules } from "../repositories/rules.repository";
import { getPropertyById } from "../../property/repositories/property.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { NotDefined } from "../../../utils/errors/not-defined";
import { getParticipantsByProperty } from "../../property/repositories/property.repository";
import { deleteAttribute } from "../repositories/attribute.repository";

export async function deleteRuleService(
    userId: string,
    propertyId: string,
    attributeName: string,
    prisma: PrismaClient
) {
    try {
        const property = await getPropertyById(propertyId, prisma);

        if (!property) {
            throw new NotFound("Propriedade não encontrada");
        }

        const participants = await getParticipantsByProperty(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);

        if (!userIsAdmin) {
            throw new NotDefined("Apenas administradores da propriedade podem deletar regras");
        }

        const rules = await getPropertyRules(propertyId, prisma);

        if (rules.length <= 1) {
            throw new NotDefined("A propriedade deve ter ao menos 1 regra");
        }

        const rule = await prisma.rule.findFirst({
            where: {
                id_property: propertyId,
                attribute: {
                    name: attributeName,
                },
            },
        });

        if (!rule) {
            throw new NotFound("Regra não encontrada");
        }

        await deleteAttribute(rule.id_attributes, prisma);
    } catch (error) {
        throw error;
    }
}

