"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePropertyService = updatePropertyService;
const property_repository_1 = require("../repositories/property.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const not_defined_1 = require("../../../utils/errors/not-defined");
const property_repository_2 = require("../repositories/property.repository");
async function updatePropertyService(userId, propertyId, propertyData, prisma) {
    try {
        const property = await (0, property_repository_1.getPropertyById)(propertyId, prisma);
        if (!property) {
            throw new not_found_1.NotFound("Propriedade não encontrada");
        }
        const participants = await (0, property_repository_2.getParticipantsByProperty)(propertyId, prisma);
        const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);
        if (!userIsAdmin) {
            throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem atualizar a propriedade");
        }
        if (propertyData.total_vacancies !== undefined) {
            const existingAnnouncements = await prisma.announcement.findMany({
                where: {
                    id_property: propertyId,
                },
            });
            const totalAnnouncedVacancies = existingAnnouncements.reduce((sum, ann) => sum + ann.vacancies, 0);
            if (propertyData.total_vacancies < totalAnnouncedVacancies) {
                throw new not_defined_1.NotDefined(`Não é possível reduzir o total de vagas abaixo de ${totalAnnouncedVacancies} (vagas já anunciadas)`);
            }
        }
        return await (0, property_repository_1.updateProperty)(propertyId, propertyData, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=update-property.service.js.map