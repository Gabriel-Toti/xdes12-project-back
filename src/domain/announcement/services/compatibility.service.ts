import { PrismaClient } from "@prisma/client";
import { getAttributeConfig } from "../../../utils/attributes";

/**
 * Calcula a compatibilidade entre uma preferência e uma regra
 * Retorna um score de 0 a 1, onde 1 é totalmente compatível
 * O peso será aplicado no cálculo final da compatibilidade total
 */
function calculateAttributeCompatibility(
    preferenceName: string,
    preferenceValue: string,
    ruleName: string,
    ruleValue: string
): number {
    // Se os nomes não correspondem, não há compatibilidade
    if (preferenceName !== ruleName) {
        return 0;
    }

    const attributeConfig = getAttributeConfig();
    const config = attributeConfig[preferenceName as keyof typeof attributeConfig];

    if (!config) {
        return 0;
    }

    // Para atributos do tipo "closed" (enum)
    if (config.type === "closed") {
        const prefValues = preferenceValue.split(", ").map(v => v.trim());
        const ruleValues = ruleValue.split(", ").map(v => v.trim());
        
        // Verifica quantos valores da preferência estão presentes na regra
        const matches = prefValues.filter(pv => ruleValues.includes(pv)).length;
        
        if (matches === 0) {
            return 0; // Nenhuma compatibilidade
        }
        
        // Score baseado na proporção de valores que correspondem
        // Retorna score base (0 a 1), o peso será aplicado no cálculo final
        const baseScore = matches / Math.max(prefValues.length, ruleValues.length);
        
        return baseScore;
    }

    // Para atributos do tipo "location" (distância em km)
    if (config.type === "location") {
        const prefDistance = parseFloat(preferenceValue);
        const ruleDistance = parseFloat(ruleValue);
        
        if (isNaN(prefDistance) || isNaN(ruleDistance)) {
            return 0;
        }
        
        // Se a regra permite distância maior ou igual à preferência, há compatibilidade
        if (ruleDistance >= prefDistance) {
            // Score baseado na proximidade (quanto mais próximo, melhor)
            // Se a regra permite exatamente a distância desejada, score máximo
            // Retorna score base (0 a 1), o peso será aplicado no cálculo final
            const distanceRatio = prefDistance / ruleDistance;
            const baseScore = Math.min(1, distanceRatio);
            
            return baseScore;
        }
        
        return 0; // Regra não atende à preferência de distância
    }

    // Para atributos do tipo "schedule" (horários de silêncio)
    if (config.type === "schedule") {
        // Formato: "HHh-HHh; HHh-HHh; ..."
        const parseSchedule = (scheduleStr: string): Array<{ start: number; end: number }> => {
            if (!scheduleStr || scheduleStr.trim() === "") {
                return [];
            }
            return scheduleStr.split(";").map(interval => {
                const trimmed = interval.trim();
                if (!trimmed) return { start: -1, end: -1 };
                const parts = trimmed.split("-");
                if (parts.length !== 2 || !parts[0] || !parts[1]) return { start: -1, end: -1 };
                const start = parseInt(parts[0].trim().replace("h", ""));
                const end = parseInt(parts[1].trim().replace("h", ""));
                return { 
                    start: isNaN(start) ? -1 : start, 
                    end: isNaN(end) ? -1 : end 
                };
            }).filter(i => i.start >= 0 && i.end >= 0 && i.start <= 23 && i.end <= 23);
        };

        const prefIntervals = parseSchedule(preferenceValue);
        const ruleIntervals = parseSchedule(ruleValue);

        if (prefIntervals.length === 0 || ruleIntervals.length === 0) {
            return 0;
        }

        // Verifica quantos intervalos da preferência estão presentes na regra
        let matchingIntervals = 0;
        for (const prefInterval of prefIntervals) {
            for (const ruleInterval of ruleIntervals) {
                // Verifica se há sobreposição ou se o intervalo da regra contém o da preferência
                // A regra deve permitir o horário de silêncio desejado
                if (
                    // O intervalo da preferência está completamente dentro da regra
                    (prefInterval.start >= ruleInterval.start && prefInterval.end <= ruleInterval.end) ||
                    // Há sobreposição parcial
                    (prefInterval.start <= ruleInterval.end && prefInterval.end >= ruleInterval.start)
                ) {
                    matchingIntervals++;
                    break;
                }
            }
        }

        if (matchingIntervals === 0) {
            return 0;
        }

        // Score baseado na proporção de intervalos que correspondem
        // Retorna score base (0 a 1), o peso será aplicado no cálculo final
        const baseScore = matchingIntervals / prefIntervals.length;
        
        return baseScore;
    }

    return 0;
}

/**
 * Calcula a compatibilidade total entre as preferências de um usuário e as regras de um imóvel
 * Usa média ponderada onde o peso de cada preferência influencia diretamente no score final
 */
export function calculateUserPropertyCompatibility(
    userPreferences: Array<{ attribute: { name: string; value: string }; weight: number }>,
    propertyRules: Array<{ attribute: { name: string; value: string } }>
): number {
    if (userPreferences.length === 0 || propertyRules.length === 0) {
        return 0;
    }

    let weightedScore = 0;
    let totalWeight = 0;

    // Para cada preferência do usuário, encontra a regra correspondente e calcula compatibilidade
    for (const preference of userPreferences) {
        const matchingRule = propertyRules.find(
            rule => rule.attribute.name === preference.attribute.name
        );

        if (matchingRule) {
            // Calcula compatibilidade base (0 a 1)
            const baseCompatibility = calculateAttributeCompatibility(
                preference.attribute.name,
                preference.attribute.value,
                matchingRule.attribute.name,
                matchingRule.attribute.value
            );
            
            // Aplica o peso da preferência: score ponderado = baseScore * weight
            // Isso significa que preferências com peso maior têm mais influência
            // O peso varia de 1 a 10, então multiplicamos o score base pelo peso
            weightedScore += baseCompatibility * preference.weight;
            totalWeight += preference.weight;
        }
        // Se não há regra correspondente, não adiciona ao score (mas também não penaliza)
    }

    // Retorna a média ponderada: soma dos scores ponderados dividido pela soma dos pesos
    if (totalWeight === 0) {
        return 0;
    }

    return weightedScore / totalWeight;
}

/**
 * Calcula a compatibilidade considerando:
 * 1. As preferências do usuário buscando com as regras do imóvel
 * 2. As preferências dos participantes da república com as regras do imóvel
 * 
 * Retorna um score combinado que considera ambos os fatores
 */
export async function calculatePropertyCompatibility(
    userId: string | undefined,
    propertyId: string,
    prisma: PrismaClient
): Promise<number> {
    // Buscar regras do imóvel
    const propertyRules = await prisma.rule.findMany({
        where: { id_property: propertyId },
        include: { attribute: true }
    });

    if (propertyRules.length === 0) {
        return 0;
    }

    const rulesArray = propertyRules.map(r => ({ attribute: r.attribute }));

    let userCompatibility = 0;
    let participantsCompatibility = 0;

    // 1. Calcular compatibilidade do usuário buscando com as regras
    if (userId) {
        const userPreferences = await prisma.preferences.findMany({
            where: { id_user: userId },
            include: { attribute: true }
        });

        if (userPreferences.length > 0) {
            userCompatibility = calculateUserPropertyCompatibility(
                userPreferences.map(p => ({
                    attribute: p.attribute,
                    weight: p.weight
                })),
                rulesArray
            );
        }
    }

    // 2. Calcular compatibilidade dos participantes da república com as regras
    const participants = await prisma.participation.findMany({
        where: { id_property: propertyId },
        select: { id_user: true }
    });

    if (participants.length > 0) {
        const participantIds = participants.map(p => p.id_user);
        
        // Buscar todas as preferências dos participantes
        const participantsPreferences = await prisma.preferences.findMany({
            where: { id_user: { in: participantIds } },
            include: { attribute: true }
        });

        // Agrupar preferências por usuário
        const preferencesByUser = new Map<string, typeof participantsPreferences>();
        for (const pref of participantsPreferences) {
            if (!preferencesByUser.has(pref.id_user)) {
                preferencesByUser.set(pref.id_user, []);
            }
            preferencesByUser.get(pref.id_user)!.push(pref);
        }

        // Calcular compatibilidade média dos participantes
        let totalParticipantCompatibility = 0;
        let participantCount = 0;

        for (const [_, preferences] of preferencesByUser) {
            const compatibility = calculateUserPropertyCompatibility(
                preferences.map(p => ({
                    attribute: p.attribute,
                    weight: p.weight
                })),
                rulesArray
            );
            totalParticipantCompatibility += compatibility;
            participantCount++;
        }

        if (participantCount > 0) {
            participantsCompatibility = totalParticipantCompatibility / participantCount;
        }
    }

    // Combinar os dois scores:
    // - Se há usuário buscando e participantes, usa 70% do score do usuário + 30% do score dos participantes
    // - Se há apenas usuário buscando (sem participantes), usa 100% do score do usuário
    // - Se não há usuário, usa apenas o score dos participantes (ou 0 se não houver participantes)
    // Retorna valor entre 0 e 100 (porcentagem)
    let finalCompatibility = 0;
    if (userId && userCompatibility > 0) {
        if (participants.length > 0 && participantsCompatibility > 0) {
            finalCompatibility = (userCompatibility * 0.7) + (participantsCompatibility * 0.3);
        } else {
            finalCompatibility = userCompatibility;
        }
    } else {
        finalCompatibility = participantsCompatibility;
    }
    
    // Retorna como porcentagem (0-100)
    return Math.round(finalCompatibility * 100);
}

