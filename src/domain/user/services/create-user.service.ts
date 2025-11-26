import { PrismaClient } from "@prisma/client";
import { CreateUserData } from "../interfaces/user-data.interface";
import { createUser } from "../repositories/users.repository";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { setAuthCookie } from "../../../utils/cookie";
import { getToken } from "../../../utils/token";
import { toISOLocaleString } from "../../../utils/date-format";
import { createNotification } from "../../notification/services/create-notification.service";


export async function createUserService(userData: CreateUserData, res: Response, prisma: PrismaClient) {
    try
    {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(userData.password, saltRounds);

        userData.password = passwordHash;

        userData.birthdate = toISOLocaleString(new Date(userData.birthdate));

        const user = await createUser(userData, prisma);
        
        if(!user)
        {
            throw new Error("Falha ao criar usuário");
        }

        const token = getToken({ userId: user.id  });
        
        setAuthCookie(res, token);

        // Notificação de boas-vindas padrão para novos usuários
        try {
            await createNotification({
                id_user: user.id,
                type: "welcome",
                title: "Bem-vindo ao CASAR",
                message: "Seu cadastro foi realizado com sucesso. Comece configurando suas preferências para encontrar a república ideal!",
                link: "/preferencias"
            });
        } catch (e) {
            // Falha ao criar notificação não deve impedir o cadastro
            // (log poderia ser adicionado aqui se necessário)
        }

    }
    catch (error)
    {
        throw error;
    }
}