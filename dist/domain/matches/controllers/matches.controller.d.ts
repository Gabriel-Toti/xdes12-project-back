import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
export declare function createMatch(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getMatch(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getMatches(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function updateMatch(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function deleteMatch(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=matches.controller.d.ts.map