"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPropertyService = createPropertyService;
const property_repository_1 = require("../repositories/property.repository");
const users_repository_1 = require("../../user/repositories/users.repository");
const not_defined_1 = require("../../../utils/errors/not-defined");
async function createPropertyService(userId, propertyData, prisma) {
    try {
        const user = await (0, users_repository_1.getUserById)(userId, prisma);
        if (!user) {
            throw new not_defined_1.NotDefined("Não foi possível encontrar o usuário.");
        }
        return await (0, property_repository_1.createProperty)(userId, propertyData, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=create-property.service.js.map