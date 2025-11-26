"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserByEmail = getUserByEmail;
exports.getUserById = getUserById;
exports.updateLastLogin = updateLastLogin;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const date_format_1 = require("../../../utils/date-format");
async function createUser(userData, prisma) {
    return prisma.users.create({
        data: {
            ...userData
        },
        select: {
            id: true
        }
    });
}
async function getUserByEmail(email, prisma) {
    return prisma.users.findUnique({
        where: {
            email
        }
    });
}
async function getUserById(id, prisma) {
    return prisma.users.findUnique({
        where: {
            id
        }
    });
}
async function updateLastLogin(email, now, prisma) {
    return prisma.users.update({
        where: {
            email,
        },
        data: {
            last_login: now,
            active: true
        }
    });
}
async function updateUser(userId, userData, prisma) {
    return prisma.users.update({
        where: {
            id: userId
        },
        data: {
            ...userData
        }
    });
}
async function deleteUser(userId, prisma) {
    return prisma.users.update({
        where: {
            id: userId
        },
        data: {
            active: false,
            deletedat: (0, date_format_1.toISOLocaleString)(new Date())
        }
    });
}
//# sourceMappingURL=users.repository.js.map