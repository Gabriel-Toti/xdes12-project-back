"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatch = createMatch;
exports.getMatch = getMatch;
exports.getMatches = getMatches;
exports.updateMatch = updateMatch;
exports.deleteMatch = deleteMatch;
const error_handler_1 = require("../../../utils/error-handler");
const create_match_service_1 = require("../services/create-match.service");
const get_match_service_1 = require("../services/get-match.service");
const get_matches_service_1 = require("../services/get-matches.service");
const update_match_service_1 = require("../services/update-match.service");
const delete_match_service_1 = require("../services/delete-match.service");
function createMatch(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const matchData = req.body;
            await (0, create_match_service_1.createMatchService)(userId, matchData, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getMatch(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, numberAnnouncement } = req.params;
            const match = await (0, get_match_service_1.getMatchService)(userId, propertyId, parseInt(numberAnnouncement), prisma);
            res.status(200).json(match);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getMatches(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, numberAnnouncement } = req.query;
            const matches = await (0, get_matches_service_1.getMatchesService)(userId, propertyId, numberAnnouncement ? parseInt(numberAnnouncement) : undefined, prisma);
            res.status(200).json(matches);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function updateMatch(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, numberAnnouncement } = req.params;
            const matchData = req.body;
            await (0, update_match_service_1.updateMatchService)(userId, propertyId, parseInt(numberAnnouncement), matchData, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function deleteMatch(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, numberAnnouncement } = req.params;
            const { matchUserId } = req.body;
            await (0, delete_match_service_1.deleteMatchService)(userId, propertyId, {
                numberAnnouncement: parseInt(numberAnnouncement),
                matchUserId: matchUserId,
            }, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
//# sourceMappingURL=matches.controller.js.map