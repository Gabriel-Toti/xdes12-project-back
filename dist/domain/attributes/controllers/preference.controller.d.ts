import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export declare function createPreferences(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getPreferencesModel(): (_: Request, res: Response) => Promise<void>;
export declare function updatePreferences(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function deletePreferences(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getPreferences(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=preference.controller.d.ts.map