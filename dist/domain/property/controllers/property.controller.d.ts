import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
export declare function createProperty(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getProperty(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function updateProperty(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function deleteProperty(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function getUserPropertiesList(prisma: PrismaClient): (req: Request, res: Response) => Promise<void>;
export declare function uploadPropertyImage(prisma: PrismaClient): (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare function deletePropertyImage(prisma: PrismaClient): (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=property.controller.d.ts.map