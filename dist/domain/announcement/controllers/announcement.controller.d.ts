import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
export declare function createAnnouncement(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getAnnouncement(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getAnnouncements(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getPublicAnnouncements(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function updateAnnouncement(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function deleteAnnouncement(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function uploadAnnouncementImage(prisma: PrismaClient): (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteAnnouncementImage(prisma: PrismaClient): (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=announcement.controller.d.ts.map