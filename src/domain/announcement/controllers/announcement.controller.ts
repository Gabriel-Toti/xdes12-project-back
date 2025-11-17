import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createAnnouncementService } from "../services/create-announcement.service";
import { getAnnouncementService } from "../services/get-announcement.service";
import { getAnnouncementsService } from "../services/get-announcements.service";
import { updateAnnouncementService } from "../services/update-announcement.service";
import { deleteAnnouncementService } from "../services/delete-announcement.service";
import { CreateAnnouncementData, UpdateAnnouncementData } from "../interfaces/announcement.interface";

export function createAnnouncement(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const announcementData: CreateAnnouncementData = req.body;

            await createAnnouncementService(userId as string, announcementData, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function getAnnouncement(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { propertyId, number } = req.params;

            const announcement = await getAnnouncementService(
                propertyId as string,
                parseInt(number as string),
                prisma
            );

            res.status(200).json(announcement);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function getAnnouncements(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { propertyId } = req.query;

            const announcements = await getAnnouncementsService(
                propertyId as string | undefined,
                prisma
            );

            res.status(200).json(announcements);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function getPublicAnnouncements(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { propertyId } = req.query;

            // Rota pública: retorna todos os anúncios ativos, sem necessidade de autenticação
            const announcements = await getAnnouncementsService(
                propertyId as string | undefined,
                prisma
            );

            res.status(200).json(announcements);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function updateAnnouncement(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, number } = req.params;
            const announcementData: UpdateAnnouncementData = req.body;

            await updateAnnouncementService(
                userId as string,
                propertyId as string,
                parseInt(number as string),
                announcementData,
                prisma
            );

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function deleteAnnouncement(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, number } = req.params;

            await deleteAnnouncementService(
                userId as string,
                propertyId as string,
                parseInt(number as string),
                prisma
            );

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

