"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = UpdateUserService;
const users_repository_1 = require("../repositories/users.repository");
async function UpdateUserService(userId, userData, prisma) {
    try {
        await (0, users_repository_1.updateUser)(userId, userData, prisma);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=update-user.service.js.map