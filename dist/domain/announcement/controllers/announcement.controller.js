"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnnouncement = createAnnouncement;
exports.getAnnouncement = getAnnouncement;
exports.getAnnouncements = getAnnouncements;
exports.getPublicAnnouncements = getPublicAnnouncements;
exports.updateAnnouncement = updateAnnouncement;
exports.deleteAnnouncement = deleteAnnouncement;
exports.uploadAnnouncementImage = uploadAnnouncementImage;
exports.deleteAnnouncementImage = deleteAnnouncementImage;
const error_handler_1 = require("../../../utils/error-handler");
const create_announcement_service_1 = require("../services/create-announcement.service");
const get_announcement_service_1 = require("../services/get-announcement.service");
const get_announcements_service_1 = require("../services/get-announcements.service");
const update_announcement_service_1 = require("../services/update-announcement.service");
const delete_announcement_service_1 = require("../services/delete-announcement.service");
function createAnnouncement(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const announcementData = req.body;
            const createdAnnouncement = await (0, create_announcement_service_1.createAnnouncementService)(userId, announcementData, prisma);
            // Retornar o anúncio criado para que o frontend possa obter o número
            res.status(201).json({
                id_property: createdAnnouncement.id_property,
                number: createdAnnouncement.number
            });
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getAnnouncement(prisma) {
    return async function (req, res) {
        try {
            const { propertyId, number } = req.params;
            const { userId } = req.headers;
            const announcement = await (0, get_announcement_service_1.getAnnouncementService)(propertyId, parseInt(number), userId, prisma);
            res.status(200).json(announcement);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getAnnouncements(prisma) {
    return async function (req, res) {
        try {
            const { propertyId } = req.query;
            const { userId } = req.headers;
            const announcements = await (0, get_announcements_service_1.getAnnouncementsService)(propertyId, userId, prisma);
            res.status(200).json(announcements);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getPublicAnnouncements(prisma) {
    return async function (req, res) {
        try {
            const { propertyId } = req.query;
            // Rota pública: não há userId, então não calcula compatibilidade
            const announcements = await (0, get_announcements_service_1.getAnnouncementsService)(propertyId, undefined, // userId não disponível em rota pública
            prisma);
            res.status(200).json(announcements);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function updateAnnouncement(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, number } = req.params;
            const announcementData = req.body;
            await (0, update_announcement_service_1.updateAnnouncementService)(userId, propertyId, parseInt(number), announcementData, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function deleteAnnouncement(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, number } = req.params;
            await (0, delete_announcement_service_1.deleteAnnouncementService)(userId, propertyId, parseInt(number), prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function uploadAnnouncementImage(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, number } = req.params;
            const files = req.files;
            if (!files || files.length === 0) {
                return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
            }
            if (!propertyId || !number) {
                return res.status(400).json({ error: "ID da propriedade e número do anúncio são obrigatórios" });
            }
            // Verificar se o usuário é admin do imóvel
            const announcement = await (0, get_announcement_service_1.getAnnouncementService)(propertyId, parseInt(number), userId, prisma);
            if (!announcement) {
                return res.status(404).json({ error: "Anúncio não encontrado" });
            }
            const participants = await prisma.participation.findMany({
                where: {
                    id_property: propertyId,
                    id_user: userId,
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
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function deleteAnnouncementImage(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { propertyId, number, imageId } = req.params;
            const fs = require('fs');
            const path = require('path');
            if (!propertyId || !number || !imageId) {
                return res.status(400).json({ error: "ID da propriedade, número do anúncio e ID da imagem são obrigatórios" });
            }
            // Verificar se o usuário é admin do imóvel
            const announcement = await (0, get_announcement_service_1.getAnnouncementService)(propertyId, parseInt(number), userId, prisma);
            if (!announcement) {
                return res.status(404).json({ error: "Anúncio não encontrado" });
            }
            const participants = await prisma.participation.findMany({
                where: {
                    id_property: propertyId,
                    id_user: userId,
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
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
//# sourceMappingURL=announcement.controller.js.map