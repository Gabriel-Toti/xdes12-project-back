"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = markAsRead;
exports.markAllAsRead = markAllAsRead;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function markAsRead(id, id_user) {
    const notification = await prisma.notification.updateMany({
        where: {
            id,
            id_user // Garantir que o usuário é o dono da notificação
        },
        data: {
            read: true
        }
    });
    return notification;
}
async function markAllAsRead(id_user) {
    const result = await prisma.notification.updateMany({
        where: {
            id_user,
            read: false
        },
        data: {
            read: true
        }
    });
    return result;
}
//# sourceMappingURL=mark-as-read.service.js.map