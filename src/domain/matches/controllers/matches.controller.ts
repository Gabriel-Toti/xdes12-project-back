import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createMatchService } from "../services/create-match.service";
import { getMatchService } from "../services/get-match.service";
import { getMatchesService } from "../services/get-matches.service";
import { updateMatchService } from "../services/update-match.service";
import { deleteMatchService } from "../services/delete-match.service";
import { CreateMatchData, UpdateMatchData } from "../interfaces/matches.interface";

export function createMatch(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const matchData: CreateMatchData = req.body;

            await createMatchService(userId as string, matchData, prisma);

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function getMatch(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, numberAnnouncement } = req.params;

            const match = await getMatchService(
                userId as string,
                propertyId as string,
                parseInt(numberAnnouncement as string),
                prisma
            );

            res.status(200).json(match);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function getMatches(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, numberAnnouncement } = req.query;

            const matches = await getMatchesService(
                userId as string | undefined,
                propertyId as string | undefined,
                numberAnnouncement ? parseInt(numberAnnouncement as string) : undefined,
                prisma
            );

            res.status(200).json(matches);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function updateMatch(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, numberAnnouncement } = req.params;
            const matchData = req.body as UpdateMatchData & { matchUserId: string };

            await updateMatchService(
                userId as string,
                propertyId as string,
                parseInt(numberAnnouncement as string),
                matchData,
                prisma
            );

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function deleteMatch(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, numberAnnouncement } = req.params;
            const { matchUserId } = req.body as { matchUserId: string };

            await deleteMatchService(
                userId as string,
                propertyId as string,
                ({
                    numberAnnouncement: parseInt(numberAnnouncement as string),
                    matchUserId: matchUserId as string,
                } as unknown) as number,
                prisma
            );

            res.status(204).send();
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

