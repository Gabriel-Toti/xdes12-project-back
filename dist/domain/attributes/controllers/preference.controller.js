"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreferences = createPreferences;
exports.getPreferencesModel = getPreferencesModel;
exports.updatePreferences = updatePreferences;
exports.deletePreferences = deletePreferences;
exports.getPreferences = getPreferences;
const error_handler_1 = require("../../../utils/error-handler");
const create_preference_service_1 = require("../services/create-preference.service");
const attributes_1 = require("../../../utils/attributes");
const update_preference_service_1 = require("../services/update-preference.service");
const delete_preference_service_1 = require("../services/delete-preference.service");
const preference_repository_1 = require("../repositories/preference.repository");
function createPreferences(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { preferences } = req.body;
            await (0, create_preference_service_1.createPreferencesService)(userId, preferences, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getPreferencesModel() {
    return async function (_, res) {
        try {
            const model = (0, attributes_1.getAttributeConfig)();
            res.status(200).json(model);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function updatePreferences(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { name, ...preferencePayload } = req.body;
            await (0, update_preference_service_1.updatePreferenceService)(userId, name, preferencePayload, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function deletePreferences(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { name } = req.params;
            await (0, delete_preference_service_1.deletePreferenceService)(userId, name, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getPreferences(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const preferences = await (0, preference_repository_1.getUserPreferencesWithAttributes)(userId, prisma);
            const serialized = preferences.map((preference) => ({
                name: preference.attribute.name,
                value: preference.attribute.value,
                weight: preference.weight
            }));
            res.status(200).json(serialized);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
//# sourceMappingURL=preference.controller.js.map