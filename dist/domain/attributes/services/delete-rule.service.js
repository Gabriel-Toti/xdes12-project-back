"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRuleService = deleteRuleService;
const rules_repository_1 = require("../repositories/rules.repository");
const property_repository_1 = require("../../property/repositories/property.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const not_defined_1 = require("../../../utils/errors/not-defined");
const property_repository_2 = require("../../property/repositories/property.repository");
const attribute_repository_1 = require("../repositories/attribute.repository");
async function deleteRuleService(userId, propertyId, attributeName, prisma) {
    try {
        const property = await (0, property_repository_1.getPropertyById)(propertyId, prisma);
        if (!property) {
            throw new not_found_1.NotFound("Propriedade não encontrada");
        }
        const participants = await (0, property_repository_2.getParticipantsByProperty)(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);
        if (!userIsAdmin) {
            throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem deletar regras");
        }
        const rules = await (0, rules_repository_1.getPropertyRules)(propertyId, prisma);
        if (rules.length <= 1) {
            throw new not_defined_1.NotDefined("A propriedade deve ter ao menos 1 regra");
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
            throw new not_found_1.NotFound("Regra não encontrada");
        }
        await (0, attribute_repository_1.deleteAttribute)(rule.id_attributes, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=delete-rule.service.js.map