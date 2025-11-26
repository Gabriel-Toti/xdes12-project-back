"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreferencesService = createPreferencesService;
const preference_repository_1 = require("../repositories/preference.repository");
const users_repository_1 = require("../../user/repositories/users.repository");
const not_defined_1 = require("../../../utils/errors/not-defined");
async function createPreferencesService(userId, preferencePayload, prisma) {
    try {
        const user = await (0, users_repository_1.getUserById)(userId, prisma);
        if (!user) {
            throw new not_defined_1.NotDefined("Usuário inexistente");
        }
        const seen = new Set();
        const names = preferencePayload.map((p) => p.name);
        const exists = await (0, preference_repository_1.userPreferencesExists)(userId, names, prisma);
        if (exists.length > 0) {
            throw new not_defined_1.NotDefined("Ao menos uma das preferências já está definida.");
        }
        const preferenceData = [];
        const weight = [];
        for (let i = 0; i < preferencePayload.length; i++) {
            let p = preferencePayload[i];
            if (seen.has(p.name))
                throw new not_defined_1.NotDefined("Preferências duplicadas");
            seen.add(p.name);
            preferenceData.push({ name: p.name, value: p.value });
            weight.push(p.weight);
        }
        await (0, preference_repository_1.createPreferences)(userId, weight, preferenceData, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=create-preference.service.js.map