import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createPropertyService } from "../services/create-property.service";
import { CreatePropertyData, UpdatePropertyData } from "../interfaces/property.interface";
import { getPropertyService } from "../services/get-property.service";
import { updatePropertyService } from "../services/update-property.service";
import { deletePropertyService } from "../services/delete-property.service";

export function createProperty(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const propertyData: CreatePropertyData = req.body;

            const { userId } = req.headers;

            const property = await createPropertyService(userId as string, propertyData, prisma);

            if (!property || property.length === 0) {
                throw new Error("Erro ao criar o imóvel.");
            }

            const propertyResult = property[0] as { id: string };

            res.status(200).json({
                id: propertyResult.id
            });
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function getProperty(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { id } = req.params;

            const result = await getPropertyService(id as string, prisma);

            res.status(200).json(result);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function updateProperty(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { id } = req.params;
            const propertyData: UpdatePropertyData = req.body;

            await updatePropertyService(userId as string, id as string, propertyData, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function deleteProperty(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { id } = req.params;

            await deletePropertyService(userId as string, id as string, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}