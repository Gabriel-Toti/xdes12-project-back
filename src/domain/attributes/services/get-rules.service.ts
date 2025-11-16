import { PrismaClient } from "@prisma/client";
import { getPropertyById } from "../../property/repositories/property.repository";
import { NotFound } from "../../../utils/errors/not-found";

export async function getRulesService(propertyId: string, prisma: PrismaClient) {
    try {
        const property = await getPropertyById(propertyId, prisma);

        if (!property) {
            throw new NotFound("Propriedade não encontrada");
        }

        return prisma.rule.findMany({
            where: {
                id_property: propertyId,
            },
            include: {
                attribute: true,
            },
        });
    } catch (error) {
        throw error;
    }
}

