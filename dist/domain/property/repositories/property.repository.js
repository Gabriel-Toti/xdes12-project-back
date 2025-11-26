"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProperty = createProperty;
exports.getPropertyById = getPropertyById;
exports.getParticipantsPreferences = getParticipantsPreferences;
exports.updateProperty = updateProperty;
exports.getParticipantsByProperty = getParticipantsByProperty;
exports.getUserProperties = getUserProperties;
const not_defined_1 = require("../../../utils/errors/not-defined");
async function createProperty(userId, { members, ...propertyData }, prisma) {
    return prisma.$transaction(async (tx) => {
        const property = await tx.property.create({
            data: {
                ...propertyData,
            },
        });
        const participation = await tx.participation.createMany({
            data: [
                {
                    id_user: userId,
                    id_property: property.id,
                    admin: true
                },
                ...members.map((member) => ({
                    id_user: member.id,
                    id_property: property.id,
                    admin: false
                }))
            ],
        });
        const quantity = await tx.participation.findMany({
            where: {
                id_user: userId,
                admin: true
            },
        });
        if (quantity.length >= 5) {
            throw new not_defined_1.NotDefined("Um usuário não pode participar de mais de 5 imóveis.");
        }
        return [property, participation];
    });
}
async function getPropertyById(id, prisma) {
    return prisma.property.findUnique({
        where: {
            id
        },
        include: {
            rule: {
                include: {
                    attribute: true
                }
            },
            images: {
                orderBy: {
                    created_at: 'asc'
                }
            }
        }
    });
}
async function getParticipantsPreferences(id, prisma) {
    const participants = await prisma.participation.findMany({
        where: { id_property: id },
        select: { id_user: true },
    });
    const userIds = participants.map(p => p.id_user);
    if (userIds.length === 0)
        return [];
    return prisma.preferences.findMany({
        where: {
            id_user: { in: userIds },
        },
        include: {
            attribute: true,
        },
    });
}
async function updateProperty(propertyId, propertyData, prisma) {
    return prisma.property.update({
        where: {
            id: propertyId
        },
        data: {
            ...propertyData
        }
    });
}
async function getParticipantsByProperty(propertyId, prisma) {
    return prisma.participation.findMany({
        where: {
            id_property: propertyId,
        },
    });
}
async function getUserProperties(userId, prisma) {
    return prisma.participation.findMany({
        where: {
            id_user: userId,
            admin: true
        },
        include: {
            property: {
                include: {
                    rule: {
                        include: {
                            attribute: true
                        }
                    },
                    announcement: {
                        where: {
                            vacancies: {
                                gt: 0
                            }
                        },
                        include: {
                            images: {
                                orderBy: {
                                    created_at: 'asc'
                                }
                            }
                        }
                    },
                    images: {
                        orderBy: {
                            created_at: 'asc'
                        }
                    }
                }
            }
        }
    });
}
//# sourceMappingURL=property.repository.js.map