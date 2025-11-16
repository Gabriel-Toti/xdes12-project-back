import { PrismaClient } from "@prisma/client";
import { CreateAnnouncementData, UpdateAnnouncementData } from "../interfaces/announcement.interface";

export async function createAnnouncement(announcementData: CreateAnnouncementData, prisma: PrismaClient) {
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

export async function getAnnouncementById(propertyId: string, number: number, prisma: PrismaClient) {
    return prisma.announcement.findUnique({
        where: {
            id_property_number: {
                id_property: propertyId,
                number: number,
            } as any,
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
    });
}

export async function getAnnouncementsByProperty(propertyId: string, prisma: PrismaClient) {
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

export async function getAllAnnouncements(prisma: PrismaClient) {
    return prisma.announcement.findMany({
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
        orderBy: {
            created_at: 'desc',
        },
    });
}

export async function updateAnnouncement(
    propertyId: string,
    number: number,
    announcementData: UpdateAnnouncementData,
    prisma: PrismaClient
) {
    return prisma.announcement.update({
        where: {
            id_property_number: {
                id_property: propertyId,
                number: number,
            } as any,
        },
        data: {
            ...announcementData,
        },
    });
}

export async function deleteAnnouncement(propertyId: string, number: number, prisma: PrismaClient) {
    return prisma.announcement.delete({
        where: {
            id_property_number: {
                id_property: propertyId,
                number: number,
            } as any,
        },
    });
}

export async function getAnnouncementsByUserProperty(userId: string, prisma: PrismaClient) {
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

