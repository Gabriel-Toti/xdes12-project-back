import { PrismaClient } from "@prisma/client";
import { CreateMatchData, UpdateMatchData } from "../interfaces/matches.interface";

export async function createMatch(matchData: CreateMatchData, prisma: PrismaClient) {
    return prisma.matches.create({
        data: {
            announcement: {
                connect: {
                    id_property_number: {	
                        id_property: matchData.id_property,
                        number: matchData.number_announcement,
                    } as any,
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

export async function getMatchById(
    userId: string,
    propertyId: string,
    numberAnnouncement: number,
    prisma: PrismaClient
) {
    return prisma.matches.findUnique({
        where: {
            id_user_id_property_number_announcement: {
                id_user: userId,
                id_property: propertyId,
                number_announcement: numberAnnouncement,
            } as any,
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

export async function getMatchesByUser(userId: string, prisma: PrismaClient) {
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

export async function getMatchesByAnnouncement(
    propertyId: string,
    numberAnnouncement: number,
    prisma: PrismaClient
) {
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

export async function updateMatch(
    userId: string,
    propertyId: string,
    numberAnnouncement: number,
    matchData: UpdateMatchData,
    prisma: PrismaClient
) {
    return prisma.matches.update({
        where: {
            id_user_id_property_number_announcement: {
                id_user: userId,
                id_property: propertyId,
                number_announcement: numberAnnouncement,
            } as any,
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

export async function deleteMatch(
    userId: string,
    propertyId: string,
    numberAnnouncement: number,
    prisma: PrismaClient
) {
    return prisma.matches.delete({
        where: {
            id_user_id_property_number_announcement: {
                id_user: userId,
                id_property: propertyId,
                number_announcement: numberAnnouncement,
            } as any,
        },
    });
}

