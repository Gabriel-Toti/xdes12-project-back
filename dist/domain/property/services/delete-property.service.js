"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePropertyService = deletePropertyService;
const property_repository_1 = require("../repositories/property.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const not_defined_1 = require("../../../utils/errors/not-defined");
const property_repository_2 = require("../repositories/property.repository");
async function deletePropertyService(userId, propertyId, prisma) {
    try {
        const property = await (0, property_repository_1.getPropertyById)(propertyId, prisma);
        if (!property) {
            throw new not_found_1.NotFound("Propriedade não encontrada");
        }
        const participants = await (0, property_repository_2.getParticipantsByProperty)(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);
        if (!userIsAdmin) {
            throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem deletar a propriedade");
        }
        const existingAnnouncements = await prisma.announcement.findMany({
            where: {
                id_property: propertyId,
            },
        });
        if (existingAnnouncements.length > 0) {
            throw new not_defined_1.NotDefined("Não é possível deletar uma propriedade que possui anúncios ativos");
        }
        return await prisma.property.delete({
            where: {
                id: propertyId,
            },
        });
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=delete-property.service.js.map