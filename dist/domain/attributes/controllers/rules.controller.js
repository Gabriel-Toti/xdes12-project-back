"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRules = createRules;
exports.getRules = getRules;
exports.deleteRule = deleteRule;
exports.updateRule = updateRule;
const error_handler_1 = require("../../../utils/error-handler");
const create_rule_service_1 = require("../services/create-rule.service");
const get_rules_service_1 = require("../services/get-rules.service");
const delete_rule_service_1 = require("../services/delete-rule.service");
const update_rule_service_1 = require("../services/update-rule.service");
function createRules(prisma) {
    return async function (req, res) {
        try {
            const { propertyId } = req.params;
            const rulePayload = req.body.rules;
            await (0, create_rule_service_1.createRulesService)(propertyId, rulePayload, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getRules(prisma) {
    return async function (req, res) {
        try {
            const { propertyId } = req.params;
            const rules = await (0, get_rules_service_1.getRulesService)(propertyId, prisma);
            const formattedRules = rules.map(rule => ({
                name: rule.attribute.name,
                value: rule.attribute.value,
            }));
            res.status(200).json(formattedRules);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function deleteRule(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, name } = req.params;
            await (0, delete_rule_service_1.deleteRuleService)(userId, propertyId, name, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function updateRule(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, name } = req.params;
            const { value } = req.body;
            await (0, update_rule_service_1.updateRuleService)(userId, propertyId, name, value, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
//# sourceMappingURL=rules.controller.js.map