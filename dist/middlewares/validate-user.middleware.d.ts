import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export declare function validateUserMiddleware(prisma: PrismaClient): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validate-user.middleware.d.ts.map