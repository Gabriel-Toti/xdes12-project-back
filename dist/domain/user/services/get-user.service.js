"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserService = getUserService;
const users_repository_1 = require("../repositories/users.repository");
const not_found_1 = require("../../../utils/errors/not-found");
async function getUserService(userId, prisma) {
    try {
        const user = await (0, users_repository_1.getUserById)(userId, prisma);
        if (!user) {
            throw new not_found_1.NotFound("Usuario não encontrado.");
        }
        const { name, birthdate, email, cpf, gender, active, premium, phone } = user;
        return { name, birthdate, email, cpf, gender, active, premium, phone };
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=get-user.service.js.map