import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createRulesService } from "../services/create-rule.service";
import { getRulesService } from "../services/get-rules.service";
import { deleteRuleService } from "../services/delete-rule.service";
import { updateRuleService } from "../services/update-rule.service";
import { AttributeData } from "../interfaces/attributes.interface";

export function createRules(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { propertyId } = req.params;
            const rulePayload: AttributeData[] = req.body.rules;

            await createRulesService(propertyId as string, rulePayload, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function getRules(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { propertyId } = req.params;

            const rules = await getRulesService(propertyId as string, prisma);

            const formattedRules = rules.map(rule => ({
                name: rule.attribute.name,
                value: rule.attribute.value,
            }));

            res.status(200).json(formattedRules);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function deleteRule(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, name } = req.params;

            await deleteRuleService(userId as string, propertyId as string, name as string, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function updateRule(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, name } = req.params;
            const { value } = req.body;

            await updateRuleService(userId as string, propertyId as string, name as string, value as string, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}