import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createPreferencesService } from "../services/create-preference.service";
import { PrismaClient } from "@prisma/client";
import { getAttributeConfig } from "../../../utils/attributes";

export function createPreferences(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { preferences } = req.body;

            //TODO: Preciso fazer uma verificação manual de se ja existe a preferencia com esse nome

            await createPreferencesService(userId as string, preferences, prisma);

            res.status(204).send();

        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function getPreferencesModel() {
    return async function (_: Request, res: Response) {
        try {

            const model = getAttributeConfig();

            res.status(200).json(model);

        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}