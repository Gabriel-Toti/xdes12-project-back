import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createPropertyService } from "../services/create-property.service";
import { CreatePropertyData } from "../interfaces/property.interface";

export function createProperty(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const propertyData: CreatePropertyData = req.body;

            const { userId } = req.headers;

            await createPropertyService(userId as string, propertyData, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}