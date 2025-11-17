import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createUserService } from "../services/create-user.service";
import { loginService } from "../services/login.service";
import { UpdateUserService } from "../services/update-user.service";
import { deleteUserService } from "../services/delete-user.service";
import { getUserById } from "../repositories/users.repository";
import { NotFound } from "../../../utils/errors/not-found";

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

export function updateUser(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const userData = req.body;
            const { userId } = req.headers;

            await UpdateUserService(userId as string, userData, prisma);

            res.status(204).send();

        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function deleteUser(prisma: PrismaClient)
{
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;

            await deleteUserService(userId as string, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function getMe(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;

            if (!userId) {
                throw new NotFound("Usuário não encontrado.");
            }

            const user = await getUserById(userId as string, prisma);

            if (!user) {
                throw new NotFound("Usuário não encontrado.");
            }

            const { password, reset_password_code, ...safeUser } = user;

            res.status(200).json(safeUser);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}