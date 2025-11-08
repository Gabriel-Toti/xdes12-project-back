import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createUserService } from "../services/create-user.service";
import { loginService } from "../services/login.service";

export function createUser(prisma: PrismaClient)
{
    return async function (req: Request, res: Response) {
        try {
            const userData = req.body;

            await createUserService(userData, res, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function login(prisma: PrismaClient)
{
    return async function (req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            await loginService(email, password, res, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}