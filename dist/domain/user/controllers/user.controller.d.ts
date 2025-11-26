import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
export declare function createUser(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function login(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function updateUser(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function deleteUser(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getMe(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function logout(_prisma: PrismaClient): (_req: Request, res: Response) => Promise<void>;
export declare function requestPasswordReset(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function resetPassword(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map