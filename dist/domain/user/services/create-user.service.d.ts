import { PrismaClient } from "@prisma/client";
import { CreateUserData } from "../interfaces/user-data.interface";
import { Response } from "express";
export declare function createUserService(userData: CreateUserData, res: Response, prisma: PrismaClient): Promise<void>;
//# sourceMappingURL=create-user.service.d.ts.map