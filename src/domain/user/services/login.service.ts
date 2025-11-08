import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { getUserByEmail, updateLastLogin } from "../repositories/users.repository";
import { toISOLocaleString } from "../../../utils/date-format";
import { getToken } from "../../../utils/token";
import { Response } from "express";
import { setAuthCookie } from "../../../utils/cookie";
import { Unauthorized } from "../../../utils/errors/unauthorized";

export async function loginService(email: string, password: string, res: Response, prisma: PrismaClient) {
    try {
        const user = await getUserByEmail(email, prisma);

        if(!user)
        {
            throw new Unauthorized("Email ou senha incorretos.");
        }

        const hashedPassword = user.password;

        if(!await bcrypt.compare(password, hashedPassword))
        {
            throw new Unauthorized("Email ou senha incorretos.");
        }

        const now = toISOLocaleString(new Date());

        const updateResult = await updateLastLogin(email, now, prisma);

        if(!updateResult)
        {
            throw new Error("Falha ao atualizar dados de login");
        }

        const token = getToken({ userId: user.id });

        setAuthCookie(res, token);

        return;

    } catch (error) {
        throw error;
    }
}