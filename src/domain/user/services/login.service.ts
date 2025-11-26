import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { getUserByEmail, updateLastLogin } from "../repositories/users.repository";
import { toISOLocaleString } from "../../../utils/date-format";
import { getToken } from "../../../utils/token";
import { Response } from "express";
import { setAuthCookie } from "../../../utils/cookie";
import { Unauthorized } from "../../../utils/errors/unauthorized";
import { getNotifications } from "../../notification/services/get-notifications.service";
import { createNotification } from "../../notification/services/create-notification.service";

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

        // Garante que todos os usuários tenham ao menos uma notificação de boas-vindas.
        // Para usuários antigos (criados antes desta funcionalidade), criamos na primeira autenticação.
        try {
            const existing = await getNotifications(user.id);
            if (!existing || existing.length === 0) {
                await createNotification({
                    id_user: user.id,
                    type: "welcome",
                    title: "Bem-vindo ao CASAR",
                    message: "Que bom ter você de volta! Revise suas preferências e veja os anúncios recomendados para você.",
                    link: "/anuncios"
                });
            }
        } catch {
            // Qualquer erro ao criar/consultar notificações não deve quebrar o login
        }

        return;

    } catch (error) {
        throw error;
    }
}