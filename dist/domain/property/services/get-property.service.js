"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyService = getPropertyService;
const property_repository_1 = require("../repositories/property.repository");
const not_defined_1 = require("../../../utils/errors/not-defined");
async function getPropertyService(id, prisma) {
    try {
        const property = await (0, property_repository_1.getPropertyById)(id, prisma);
        if (!property) {
            throw new not_defined_1.NotDefined("Propriedade inexistente");
        }
        const preferences = await (0, property_repository_1.getParticipantsPreferences)(id, prisma);
        const preferencesMap = preferences.map(p => {
            return { name: p.attribute.name, value: p.attribute.value };
        });
        let majorPreferences = {};
        for (let pref of preferencesMap) {
            const prefKey = `${pref.name}:${pref.value}`;
            if (majorPreferences[prefKey]) {
                majorPreferences[prefKey] += 1;
            }
            else {
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
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=get-property.service.js.map