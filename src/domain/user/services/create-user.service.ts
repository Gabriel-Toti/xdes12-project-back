import { PrismaClient } from "@prisma/client";
import { CreateUserData } from "../interfaces/user-data.interface";
import { createUser } from "../repositories/users.repository";
import bcrypt from "bcrypt"
import { Response } from "express";
import { setAuthCookie } from "../../../utils/cookie";
import { getToken } from "../../../utils/token";
import { toISOLocaleString } from "../../../utils/date-format";


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

    }
    catch (error)
    {
        throw error;
    }
}