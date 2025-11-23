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
            const { userId } = req.headers;

            const announcement = await getAnnouncementService(
                propertyId as string,
                parseInt(number as string),
                userId as string | undefined,
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
            const { userId } = req.headers;

            const announcements = await getAnnouncementsService(
                propertyId as string | undefined,
                userId as string | undefined,
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
            // Rota pública: não há userId, então não calcula compatibilidade
            const announcements = await getAnnouncementsService(
                propertyId as string | undefined,
                undefined, // userId não disponível em rota pública
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

export function uploadAnnouncementImage(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, number } = req.params;
            const files = (req as any).files as Express.Multer.File[];

            if (!files || files.length === 0) {
                return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
            }

            if (!propertyId || !number) {
                return res.status(400).json({ error: "ID da propriedade e número do anúncio são obrigatórios" });
            }

            // Verificar se o usuário é admin do imóvel
            const announcement = await getAnnouncementService(
                propertyId,
                parseInt(number),
                userId as string | undefined,
                prisma
            );

            if (!announcement) {
                return res.status(404).json({ error: "Anúncio não encontrado" });
            }

            const participants = await prisma.participation.findMany({
                where: {
                    id_property: propertyId,
                    id_user: userId as string,
                    admin: true
                }
            });

            if (participants.length === 0) {
                return res.status(403).json({ error: "Apenas administradores do imóvel podem fazer upload de imagens" });
            }

            // Salvar múltiplas imagens
            const imageUrls = files.map(file => `/uploads/${file.filename}`);
            
            const createdImages = await prisma.announcement_image.createMany({
                data: imageUrls.map(imageUrl => ({
                    id_property: propertyId,
                    number_announcement: parseInt(number),
                    image_url: imageUrl
                }))
            });

            res.status(200).json({ 
                images: imageUrls,
                count: createdImages.count
            });
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

export function deleteAnnouncementImage(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { propertyId, number, imageId } = req.params;
            const fs = require('fs');
            const path = require('path');

            if (!propertyId || !number || !imageId) {
                return res.status(400).json({ error: "ID da propriedade, número do anúncio e ID da imagem são obrigatórios" });
            }

            // Verificar se o usuário é admin do imóvel
            const announcement = await getAnnouncementService(
                propertyId,
                parseInt(number),
                userId as string | undefined,
                prisma
            );

            if (!announcement) {
                return res.status(404).json({ error: "Anúncio não encontrado" });
            }

            const participants = await prisma.participation.findMany({
                where: {
                    id_property: propertyId,
                    id_user: userId as string,
                    admin: true
                }
            });

            if (participants.length === 0) {
                return res.status(403).json({ error: "Apenas administradores do imóvel podem deletar imagens" });
            }

            // Buscar a imagem
            const image = await prisma.announcement_image.findUnique({
                where: { id: imageId }
            });

            if (!image || image.id_property !== propertyId || image.number_announcement !== parseInt(number)) {
                return res.status(404).json({ error: "Imagem não encontrada" });
            }

            // Deletar arquivo físico
            const filePath = path.join(process.cwd(), image.image_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            // Deletar do banco de dados
            await prisma.announcement_image.delete({
                where: { id: imageId }
            });

            res.status(200).json({ message: "Imagem deletada com sucesso" });
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}

