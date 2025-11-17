import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createPreferencesService } from "../services/create-preference.service";
import { PrismaClient } from "@prisma/client";
import { getAttributeConfig } from "../../../utils/attributes";
import { updatePreferenceService } from "../services/update-preference.service";
import { deletePreferenceService } from "../services/delete-preference.service";
import { getUserPreferencesWithAttributes } from "../repositories/preference.repository";

export function createPreferences(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { preferences } = req.body;

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

export function updatePreferences(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;

            const { name, ...preferencePayload } = req.body;

            await updatePreferenceService(userId as string, name, preferencePayload, prisma);

            res.status(204).send();

        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function deletePreferences(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {

            const { userId } = req.headers;
            const { name } = req.params;

            await deletePreferenceService(userId as string, name as string, prisma);

            res.status(204).send();

        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function getPreferences(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;

            const preferences = await getUserPreferencesWithAttributes(userId as string, prisma);

            const serialized = preferences.map((preference) => ({
                name: preference.attribute.name,
                value: preference.attribute.value,
                weight: preference.weight
            }));

            res.status(200).json(serialized);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}