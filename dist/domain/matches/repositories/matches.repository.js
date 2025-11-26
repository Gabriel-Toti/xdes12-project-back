"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatch = createMatch;
exports.getMatchById = getMatchById;
exports.getMatchesByUser = getMatchesByUser;
exports.getMatchesByAnnouncement = getMatchesByAnnouncement;
exports.updateMatch = updateMatch;
exports.deleteMatch = deleteMatch;
async function createMatch(matchData, prisma) {
    return prisma.matches.create({
        data: {
            announcement: {
                connect: {
                    id_property_number: {
                        id_property: matchData.id_property,
                        number: matchData.number_announcement,
                    },
                },
            },
            users: {
                connect: {
                    id: matchData.id_user,
                },
            },
            accepted: false,
        },
        include: {
            announcement: {
                include: {
                    property: true,
                },
            },
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
        },
    });
}
async function getMatchById(userId, propertyId, numberAnnouncement, prisma) {
    return prisma.matches.findUnique({
        where: {
            id_user_id_property_number_announcement: {
                id_user: userId,
                id_property: propertyId,
                number_announcement: numberAnnouncement,
            },
        },
        include: {
            announcement: {
                include: {
                    property: {
                        include: {
                            rule: {
                                include: {
                                    attribute: true,
                                },
                            },
                        },
                    },
                },
            },
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
        },
    });
}
async function getMatchesByUser(userId, prisma) {
    return prisma.matches.findMany({
        where: {
            id_user: userId,
        },
        include: {
            announcement: {
                include: {
                    property: {
                        include: {
                            rule: {
                                include: {
                                    attribute: true,
                                },
                            },
                            participation: {
                                where: {
                                    admin: true,
                                },
                                include: {
                                    users: {
                                        select: {
                                            id: true,
                                            name: true,
                                            email: true,
                                            phone: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            announcement: {
                created_at: 'desc',
            },
        },
    });
}
async function getMatchesByAnnouncement(propertyId, numberAnnouncement, prisma) {
    return prisma.matches.findMany({
        where: {
            id_property: propertyId,
            number_announcement: numberAnnouncement,
        },
        include: {
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
            announcement: {
                include: {
                    property: true,
                },
            },
        },
        orderBy: {
            users: {
                created_at: 'desc',
            },
        },
    });
}
async function updateMatch(userId, propertyId, numberAnnouncement, matchData, prisma) {
    return prisma.matches.update({
        where: {
            id_user_id_property_number_announcement: {
                id_user: userId,
                id_property: propertyId,
                number_announcement: numberAnnouncement,
            },
        },
        data: {
            ...matchData,
        },
        include: {
            announcement: {
                include: {
                    property: true,
                },
            },
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
        },
    });
}
async function deleteMatch(userId, propertyId, numberAnnouncement, prisma) {
    return prisma.matches.delete({
        where: {
            id_user_id_property_number_announcement: {
                id_user: userId,
                id_property: propertyId,
                number_announcement: numberAnnouncement,
            },
        },
    });
}
//# sourceMappingURL=matches.repository.js.map