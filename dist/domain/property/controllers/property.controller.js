"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProperty = createProperty;
exports.getProperty = getProperty;
exports.updateProperty = updateProperty;
exports.deleteProperty = deleteProperty;
exports.getUserPropertiesList = getUserPropertiesList;
exports.uploadPropertyImage = uploadPropertyImage;
exports.deletePropertyImage = deletePropertyImage;
const error_handler_1 = require("../../../utils/error-handler");
const create_property_service_1 = require("../services/create-property.service");
const get_property_service_1 = require("../services/get-property.service");
const update_property_service_1 = require("../services/update-property.service");
const delete_property_service_1 = require("../services/delete-property.service");
const property_repository_1 = require("../repositories/property.repository");
function createProperty(prisma) {
    return async function (req, res) {
        try {
            const propertyData = req.body;
            const { userId } = req.headers;
            const property = await (0, create_property_service_1.createPropertyService)(userId, propertyData, prisma);
            if (!property || property.length === 0) {
                throw new Error("Erro ao criar o imóvel.");
            }
            const propertyResult = property[0];
            res.status(200).json({
                id: propertyResult.id
            });
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getProperty(prisma) {
    return async function (req, res) {
        try {
            const { id } = req.params;
            const result = await (0, get_property_service_1.getPropertyService)(id, prisma);
            res.status(200).json(result);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function updateProperty(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { id } = req.params;
            const propertyData = req.body;
            await (0, update_property_service_1.updatePropertyService)(userId, id, propertyData, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function deleteProperty(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { id } = req.params;
            await (0, delete_property_service_1.deletePropertyService)(userId, id, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getUserPropertiesList(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const participations = await (0, property_repository_1.getUserProperties)(userId, prisma);
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
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function uploadPropertyImage(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { id } = req.params;
            const files = req.files;
            if (!files || files.length === 0) {
                return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
            }
            if (!id) {
                return res.status(400).json({ error: "ID do imóvel é obrigatório" });
            }
            // Verificar se o usuário é admin do imóvel
            const property = await (0, get_property_service_1.getPropertyService)(id, prisma);
            if (!property) {
                return res.status(404).json({ error: "Imóvel não encontrado" });
            }
            const participants = await prisma.participation.findMany({
                where: {
                    id_property: id,
                    id_user: userId,
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
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function deletePropertyImage(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            const { id, imageId } = req.params;
            const fs = require('fs');
            const path = require('path');
            if (!id || !imageId) {
                return res.status(400).json({ error: "ID do imóvel e ID da imagem são obrigatórios" });
            }
            // Verificar se o usuário é admin do imóvel
            const property = await (0, get_property_service_1.getPropertyService)(id, prisma);
            if (!property) {
                return res.status(404).json({ error: "Imóvel não encontrado" });
            }
            const participants = await prisma.participation.findMany({
                where: {
                    id_property: id,
                    id_user: userId,
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
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
//# sourceMappingURL=property.controller.js.map