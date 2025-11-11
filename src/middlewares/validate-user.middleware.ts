import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/error-handler";
import { Forbidden } from "../utils/errors/forbidden";
import { getUserById } from "../domain/user/repositories/users.repository";
import { PrismaClient } from "@prisma/client";

export function validateUserMiddleware(prisma: PrismaClient) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.headers;

            if (userId == undefined){
                throw new Error(
                    "Não foi possível verificar o usuário, pois ele está indefinido."
                );
            }

            const user = await getUserById(userId as string, prisma);
        
            if (!user) {
                throw new Forbidden("Usuário não encontrado.");
            }

            const { active } = user;

            if (!active) {
                throw new Forbidden("Usuário não ativo.");
            }

            next();
        } catch (error: any) {
            const response = handleError(error);
            res.status(response.status).json(response.error);
        }
    };
}
