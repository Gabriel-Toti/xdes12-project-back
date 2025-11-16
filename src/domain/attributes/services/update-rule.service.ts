import { PrismaClient } from "@prisma/client";
import { getPropertyById, getParticipantsByProperty } from "../../property/repositories/property.repository";
import { NotFound } from "../../../utils/errors/not-found";
import { NotDefined } from "../../../utils/errors/not-defined";

export async function updateRuleService(
    userId: string,
    propertyId: string,
    ruleName: string,
    value: string,
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
            throw new NotDefined("Apenas administradores da propriedade podem atualizar regras");
        }

        const rule = await prisma.rule.findFirst({
            where: {
                id_property: propertyId,
                attribute: {
                    name: ruleName,
                },
            },
            select: {
                id_attributes: true,
            },
        });

        if (!rule) {
            throw new NotFound("Regra não encontrada");
        }

        await prisma.attributes.update({
            where: {
                id: rule.id_attributes,
            },
            data: {
                value,
            },
        });
    } catch (error) {
        throw error;
    }
}


