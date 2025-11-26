import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
export declare function createRules(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getRules(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function deleteRule(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function updateRule(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=rules.controller.d.ts.map