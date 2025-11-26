import { PrismaClient } from "@prisma/client";
/**
 * Calcula a compatibilidade total entre as preferências de um usuário e as regras de um imóvel
 * Usa média ponderada onde o peso de cada preferência influencia diretamente no score final
 */
export declare function calculateUserPropertyCompatibility(userPreferences: Array<{
    attribute: {
        name: string;
        value: string;
    };
    weight: number;
}>, propertyRules: Array<{
    attribute: {
        name: string;
        value: string;
    };
}>): number;
/**
 * Calcula a compatibilidade considerando:
 * 1. As preferências do usuário buscando com as regras do imóvel
 * 2. As preferências dos participantes da república com as regras do imóvel
 *
 * Retorna um score combinado que considera ambos os fatores
 */
export declare function calculatePropertyCompatibility(userId: string | undefined, propertyId: string, prisma: PrismaClient): Promise<number>;
//# sourceMappingURL=compatibility.service.d.ts.map