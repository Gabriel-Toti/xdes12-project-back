import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createRulesService } from "../services/create-rule.service";
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