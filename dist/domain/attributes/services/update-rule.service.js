"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRuleService = updateRuleService;
const property_repository_1 = require("../../property/repositories/property.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const not_defined_1 = require("../../../utils/errors/not-defined");
async function updateRuleService(userId, propertyId, ruleName, value, prisma) {
    try {
        const property = await (0, property_repository_1.getPropertyById)(propertyId, prisma);
        if (!property) {
            throw new not_found_1.NotFound("Propriedade não encontrada");
        }
        const participants = await (0, property_repository_1.getParticipantsByProperty)(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);
        if (!userIsAdmin) {
            throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem atualizar regras");
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
            throw new not_found_1.NotFound("Regra não encontrada");
        }
        await prisma.attributes.update({
            where: {
                id: rule.id_attributes,
            },
            data: {
                value,
            },
        });
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=update-rule.service.js.map