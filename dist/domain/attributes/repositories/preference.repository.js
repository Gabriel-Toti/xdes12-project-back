"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreferences = createPreferences;
exports.userPreferencesExists = userPreferencesExists;
exports.getPreferenceByName = getPreferenceByName;
exports.updatePreference = updatePreference;
exports.getUserPreferences = getUserPreferences;
exports.getUserPreferencesWithAttributes = getUserPreferencesWithAttributes;
const not_defined_1 = require("../../../utils/errors/not-defined");
async function createPreferences(userId, weight, preferenceData, prisma) {
    return prisma.$transaction(async (tx) => {
        for (let i = 0; i < preferenceData.length; i++) {
            const attr = await tx.attributes.create({
                data: {
                    name: preferenceData[i].name,
                    value: preferenceData[i].value.toString()
                }
            });
            await tx.preferences.create({
                data: {
                    attribute: {
                        connect: {
                            id: attr.id
                        }
                    },
                    users: {
                        connect: {
                            id: userId
                        }
                    },
                    weight: weight[i]
                }
            });
        }
        const totalPreferences = await getUserPreferences(userId, prisma);
        if (totalPreferences.length + preferenceData.length < 3) {
            throw new not_defined_1.NotDefined("O usuário deve registrar ao menos 3 preferências.");
        }
    });
}
async function userPreferencesExists(userId, names, prisma) {
    return prisma.preferences.findMany({
        where: {
            AND: [
                {
                    users: {
                        id: userId
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
async function getPreferenceByName(userId, name, prisma) {
    return prisma.preferences.findFirst({
        where: {
            AND: [
                { id_user: userId },
                {
                    attribute: {
                        name
                    }
                }
            ]
        },
    });
}
async function updatePreference(preferenceData, prisma) {
    return prisma.$transaction(async (tx) => {
        await tx.preferences.update({
            where: {
                id_attributes: preferenceData.id
            },
            data: {
                ...(preferenceData.weight && { weight: preferenceData.weight })
            }
        });
        await tx.attributes.update({
            where: {
                id: preferenceData.id
            },
            data: {
                ...(preferenceData.value && { value: preferenceData.value })
            }
        });
    });
}
function getUserPreferences(userId, prisma) {
    return prisma.preferences.findMany({
        where: {
            id_user: userId
        }
    });
}
function getUserPreferencesWithAttributes(userId, prisma) {
    return prisma.preferences.findMany({
        where: {
            id_user: userId
        },
        include: {
            attribute: true
        }
    });
}
//# sourceMappingURL=preference.repository.js.map