import { PrismaClient } from "@prisma/client";
export declare function getUserService(userId: string, prisma: PrismaClient): Promise<{
    name: string;
    birthdate: Date;
    email: string;
    cpf: string;
    gender: import(".prisma/client").$Enums.gender_t;
    active: boolean | null;
    premium: boolean | null;
    phone: string;
}>;
//# sourceMappingURL=get-user.service.d.ts.map