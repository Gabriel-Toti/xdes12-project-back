"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePreferenceService = deletePreferenceService;
const preference_repository_1 = require("../repositories/preference.repository");
const not_defined_1 = require("../../../utils/errors/not-defined");
const attribute_repository_1 = require("../repositories/attribute.repository");
const not_found_1 = require("../../../utils/errors/not-found");
async function deletePreferenceService(userId, name, prisma) {
    try {
        const userPreferences = await (0, preference_repository_1.getUserPreferences)(userId, prisma);
        if (userPreferences.length <= 3) {
            throw new not_defined_1.NotDefined("Devem haver ao menos 3 preferências para o usuário");
        }
        const preference = await (0, preference_repository_1.getPreferenceByName)(userId, name, prisma);
        if (!preference) {
            throw new not_found_1.NotFound("Não foi possível encontrar a preferência.");
        }
        await (0, attribute_repository_1.deleteAttribute)(preference.id_attributes, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=delete-preference.service.js.map