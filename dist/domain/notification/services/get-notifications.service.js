"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = getNotifications;
exports.getUnreadCount = getUnreadCount;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getNotifications(id_user) {
    const notifications = await prisma.notification.findMany({
        where: {
            id_user
        },
        orderBy: {
            created_at: 'desc'
        },
        take: 50 // Limite de 50 notificações mais recentes
    });
    return notifications;
}
async function getUnreadCount(id_user) {
    const count = await prisma.notification.count({
        where: {
            id_user,
            read: false
        }
    });
    return count;
}
//# sourceMappingURL=get-notifications.service.js.map