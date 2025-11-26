"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRulesService = createRulesService;
const rules_repository_1 = require("../repositories/rules.repository");
const property_repository_1 = require("../../property/repositories/property.repository");
const not_defined_1 = require("../../../utils/errors/not-defined");
// filepath: /home/toti/projetos-materias/casar/casar-back/src/domain/attributes/services/create-rule.service.ts
async function createRulesService(propertyId, rulePayload, prisma) {
    try {
        const property = await (0, property_repository_1.getPropertyById)(propertyId, prisma);
        if (!property) {
            throw new not_defined_1.NotDefined("Propriedade inexistente");
        }
        const seen = new Set();
        const names = rulePayload.map((r) => r.name);
        const exists = await (0, rules_repository_1.propertyRulesExists)(propertyId, names, prisma);
        if (exists.length > 0) {
            throw new not_defined_1.NotDefined("Ao menos uma das regras já está definida.");
        }
        const ruleData = [];
        for (let i = 0; i < rulePayload.length; i++) {
            let r = rulePayload[i];
            if (seen.has(r.name))
                throw new not_defined_1.NotDefined("Regras duplicadas");
            seen.add(r.name);
            ruleData.push({ name: r.name, value: r.value });
        }
        await (0, rules_repository_1.createRules)(propertyId, ruleData, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=create-rule.service.js.map