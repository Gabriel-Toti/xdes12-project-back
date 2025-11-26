"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRulesService = getRulesService;
const property_repository_1 = require("../../property/repositories/property.repository");
const not_found_1 = require("../../../utils/errors/not-found");
async function getRulesService(propertyId, prisma) {
    try {
        const property = await (0, property_repository_1.getPropertyById)(propertyId, prisma);
        if (!property) {
            throw new not_found_1.NotFound("Propriedade não encontrada");
        }
        return prisma.rule.findMany({
            where: {
                id_property: propertyId,
            },
            include: {
                attribute: true,
            },
        });
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=get-rules.service.js.map