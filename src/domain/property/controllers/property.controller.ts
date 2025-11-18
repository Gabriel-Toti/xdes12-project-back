import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../../../utils/error-handler";
import { createPropertyService } from "../services/create-property.service";
import { CreatePropertyData, UpdatePropertyData } from "../interfaces/property.interface";
import { getPropertyService } from "../services/get-property.service";
import { updatePropertyService } from "../services/update-property.service";
import { deletePropertyService } from "../services/delete-property.service";
import { getUserProperties } from "../repositories/property.repository";

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

export function getUserPropertiesList(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;

            const participations = await getUserProperties(userId as string, prisma);

            const properties = participations.map(p => ({
                id: p.property.id,
                name: p.property.name,
                type: p.property.type,
                address: p.property.address,
                costs: p.property.costs,
                total_vacancies: p.property.total_vacancies,
                total_dorms: p.property.total_dorms,
                total_bathrooms: p.property.total_bathrooms,
                garage: p.property.garage,
                external_area: p.property.external_area,
                created_at: p.property.created_at,
                image_url: p.property.image_url,
                rules: p.property.rule.map(r => ({
                    name: r.attribute.name,
                    value: r.attribute.value
                })),
                active_announcements: p.property.announcement.length
            }));

            res.status(200).json(properties);
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    }
}

export function uploadPropertyImage(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { id } = req.params;
            const files = (req as any).files as Express.Multer.File[];

            if (!files || files.length === 0) {
                return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
            }

            if (!id) {
                return res.status(400).json({ error: "ID do imóvel é obrigatório" });
            }

            // Verificar se o usuário é admin do imóvel
            const property = await getPropertyService(id, prisma);
            if (!property) {
                return res.status(404).json({ error: "Imóvel não encontrado" });
            }

            const participants = await prisma.participation.findMany({
                where: {
                    id_property: id,
                    id_user: userId as string,
                    admin: true
                }
            });

            if (participants.length === 0) {
                return res.status(403).json({ error: "Apenas administradores do imóvel podem fazer upload de imagens" });
            }

            // Salvar múltiplas imagens
            const imageUrls = files.map(file => `/uploads/${file.filename}`);
            
            const createdImages = await prisma.property_image.createMany({
                data: imageUrls.map(imageUrl => ({
                    id_property: id,
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

export function deletePropertyImage(prisma: PrismaClient) {
    return async function (req: Request, res: Response) {
        try {
            const { userId } = req.headers;
            const { id, imageId } = req.params;
            const fs = require('fs');
            const path = require('path');

            if (!id || !imageId) {
                return res.status(400).json({ error: "ID do imóvel e ID da imagem são obrigatórios" });
            }

            // Verificar se o usuário é admin do imóvel
            const property = await getPropertyService(id, prisma);
            if (!property) {
                return res.status(404).json({ error: "Imóvel não encontrado" });
            }

            const participants = await prisma.participation.findMany({
                where: {
                    id_property: id,
                    id_user: userId as string,
                    admin: true
                }
            });

            if (participants.length === 0) {
                return res.status(403).json({ error: "Apenas administradores do imóvel podem deletar imagens" });
            }

            // Buscar a imagem
            const image = await prisma.property_image.findUnique({
                where: { id: imageId }
            });

            if (!image || image.id_property !== id) {
                return res.status(404).json({ error: "Imagem não encontrada" });
            }

            // Deletar arquivo físico
            const filePath = path.join(process.cwd(), image.image_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            // Deletar do banco de dados
            await prisma.property_image.delete({
                where: { id: imageId }
            });

            res.status(200).json({ message: "Imagem deletada com sucesso" });
        } catch (error: any) {
            const e = handleError(error);
            res.status(e.status).json(e.error);
        }
    };
}