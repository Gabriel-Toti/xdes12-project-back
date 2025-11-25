import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { getUserByEmail } from "../repositories/users.repository";
import { Unauthorized } from "../../../utils/errors/unauthorized";

export async function resetPasswordService(email: string, code: string, password: string, prisma: PrismaClient) {
    const user = await getUserByEmail(email, prisma);

    if (!user || !user.reset_password_code || user.reset_password_code !== code) {
        throw new Unauthorized("Código inválido ou expirado.");
    }

    if (!user.code_expires_at || user.code_expires_at.getTime() < Date.now()) {
        throw new Unauthorized("Código inválido ou expirado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.update({
        where: { email },
        data: {
            password: hashedPassword,
            reset_password_code: null,
            code_expires_at: null,
        },
    });
}

