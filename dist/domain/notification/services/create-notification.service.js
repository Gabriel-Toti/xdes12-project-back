"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createNotification(data) {
    const notification = await prisma.notification.create({
        data: {
            id_user: data.id_user,
            type: data.type,
            title: data.title,
            message: data.message,
            link: data.link || null,
            read: false
        }
    });
    return notification;
}
//# sourceMappingURL=create-notification.service.js.map