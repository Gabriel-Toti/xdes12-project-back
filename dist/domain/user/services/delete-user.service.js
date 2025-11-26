"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = deleteUserService;
const users_repository_1 = require("../repositories/users.repository");
async function deleteUserService(userId, prisma) {
    try {
        await (0, users_repository_1.deleteUser)(userId, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=delete-user.service.js.map