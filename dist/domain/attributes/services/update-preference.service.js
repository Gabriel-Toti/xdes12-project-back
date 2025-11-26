"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferenceService = updatePreferenceService;
const preference_repository_1 = require("../repositories/preference.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const preference_repository_2 = require("../repositories/preference.repository");
async function updatePreferenceService(userId, name, preferencePayload, prisma) {
    try {
        const preference = await (0, preference_repository_1.getPreferenceByName)(userId, name, prisma);
        if (!preference) {
            throw new not_found_1.NotFound("Não foi possível encontrar a preferência especificada");
        }
        const preferenceData = {
            ...preferencePayload,
            id: preference.id_attributes
        };
        await (0, preference_repository_2.updatePreference)(preferenceData, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=update-preference.service.js.map