import { PrismaClient } from "@prisma/client";
import { deleteMatch } from "../repositories/matches.repository";
export declare function deleteMatchService(requestingUserId: string, propertyId: string, numberAnnouncement: number, prisma: PrismaClient): Promise<Awaited<ReturnType<typeof deleteMatch>>>;
export declare function deleteMatchService(requestingUserId: string, propertyId: string, params: {
    numberAnnouncement: number;
    matchUserId: string;
}, prisma: PrismaClient): Promise<Awaited<ReturnType<typeof deleteMatch>>>;
//# sourceMappingURL=delete-match.service.d.ts.map