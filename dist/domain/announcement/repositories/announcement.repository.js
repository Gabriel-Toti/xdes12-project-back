"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnnouncement = createAnnouncement;
exports.getAnnouncementById = getAnnouncementById;
exports.getAnnouncementsByProperty = getAnnouncementsByProperty;
exports.getAllAnnouncements = getAllAnnouncements;
exports.updateAnnouncement = updateAnnouncement;
exports.deleteAnnouncement = deleteAnnouncement;
exports.getAnnouncementsByUserProperty = getAnnouncementsByUserProperty;
async function createAnnouncement(announcementData, prisma) {
    return prisma.announcement.create({
        data: {
            ...announcementData,
            boost: announcementData.boost ?? false,
        },
        include: {
            property: true,
        },
    });
}
async function getAnnouncementById(propertyId, number, prisma) {
    return prisma.announcement.findUnique({
        where: {
            id_property_number: {
                id_property: propertyId,
                number: number,
            },
        },
        include: {
            property: {
                include: {
                    rule: {
                        include: {
                            attribute: true,
                        },
                    },
                    participation: {
                        select: {
                            id_user: true,
                            admin: true,
                        },
                    },
                    images: {
                        orderBy: {
                            created_at: 'asc'
                        }
                    },
                },
            },
            matches: {
                include: {
                    users: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
            images: {
                orderBy: {
                    created_at: 'asc'
                }
            },
        },
    });
}
async function getAnnouncementsByProperty(propertyId, prisma) {
    return prisma.announcement.findMany({
        where: {
            id_property: propertyId,
        },
        include: {
            property: {
                include: {
                    rule: {
                        include: {
                            attribute: true,
                        },
                    },
                    images: {
                        orderBy: {
                            created_at: 'asc'
                        }
                    },
                },
            },
            matches: {
                include: {
                    users: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
            images: {
                orderBy: {
                    created_at: 'asc'
                }
            },
        },
        orderBy: {
            created_at: 'desc',
        },
    });
}
async function getAllAnnouncements(prisma) {
    const announcements = await prisma.announcement.findMany({
        include: {
            property: {
                include: {
                    rule: {
                        include: {
                            attribute: true,
                        },
                    },
                    participation: {
                        select: {
                            id_user: true,
                            admin: true,
                        },
                    },
                    images: {
                        orderBy: {
                            created_at: 'asc'
                        }
                    },
                },
            },
            images: {
                orderBy: {
                    created_at: 'asc'
                }
            },
        },
        orderBy: {
            created_at: 'desc', // Ordenar por data primeiro
        },
    });
    // Ordenar manualmente: boost primeiro, depois por data
    return announcements.sort((a, b) => {
        const aBoost = a.boost === true ? 1 : 0;
        const bBoost = b.boost === true ? 1 : 0;
        if (aBoost !== bBoost) {
            return bBoost - aBoost; // Boost primeiro
        }
        // Se ambos têm ou não têm boost, manter ordem por data
        const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bDate - aDate; // Mais recentes primeiro
    });
}
async function updateAnnouncement(propertyId, number, announcementData, prisma) {
    return prisma.announcement.update({
        where: {
            id_property_number: {
                id_property: propertyId,
                number: number,
            },
        },
        data: {
            ...announcementData,
        },
    });
}
async function deleteAnnouncement(propertyId, number, prisma) {
    return prisma.announcement.delete({
        where: {
            id_property_number: {
                id_property: propertyId,
                number: number,
            },
        },
    });
}
async function getAnnouncementsByUserProperty(userId, prisma) {
    return prisma.announcement.findMany({
        where: {
            property: {
                participation: {
                    some: {
                        id_user: userId,
                    },
                },
            },
        },
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
            matches: {
                include: {
                    users: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            created_at: 'desc',
        },
    });
}
//# sourceMappingURL=announcement.repository.js.map