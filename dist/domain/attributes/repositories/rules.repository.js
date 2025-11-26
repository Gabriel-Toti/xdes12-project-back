"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRules = createRules;
exports.getPropertyRules = getPropertyRules;
exports.propertyRulesExists = propertyRulesExists;
const not_defined_1 = require("../../../utils/errors/not-defined");
async function createRules(propertyId, ruleData, prisma) {
    return prisma.$transaction(async (tx) => {
        for (let i = 0; i < ruleData.length; i++) {
            const attr = await tx.attributes.create({
                data: {
                    ...ruleData[i]
                }
            });
            await tx.rule.create({
                data: {
                    attribute: {
                        connect: {
                            id: attr.id
                        }
                    },
                    property: {
                        connect: {
                            id: propertyId
                        }
                    }
                }
            });
        }
        const totalRules = await getPropertyRules(propertyId, prisma);
        if (totalRules.length + ruleData.length < 1) {
            throw new not_defined_1.NotDefined("A propriedade deve registrar ao menos 1 regra.");
        }
    });
}
function getPropertyRules(propertyId, prisma) {
    return prisma.rule.findMany({
        where: {
            id_property: propertyId
        }
    });
}
async function propertyRulesExists(propertyId, names, prisma) {
    return prisma.rule.findMany({
        where: {
            AND: [
                {
                    property: {
                        id: propertyId
                    }
                },
                {
                    attribute: {
                        name: {
                            in: names
                        }
                    }
                }
            ]
        }
    });
}
//# sourceMappingURL=rules.repository.js.map