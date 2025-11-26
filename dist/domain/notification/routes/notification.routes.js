"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const notificationRouter = (0, express_1.Router)();
// Buscar notificações do usuário
notificationRouter.get("/notification", auth_middleware_1.authMiddleware, controllers_1.NotificationController.getNotificationsController);
// Buscar contador de notificações não lidas
notificationRouter.get("/notification/unread-count", auth_middleware_1.authMiddleware, controllers_1.NotificationController.getUnreadCountController);
// Marcar notificação como lida
notificationRouter.put("/notification/:id/read", auth_middleware_1.authMiddleware, controllers_1.NotificationController.markAsReadController);
// Marcar todas as notificações como lidas
notificationRouter.put("/notification/read-all", auth_middleware_1.authMiddleware, controllers_1.NotificationController.markAllAsReadController);
exports.default = notificationRouter;
//# sourceMappingURL=notification.routes.js.map