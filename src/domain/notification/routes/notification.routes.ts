import { Router } from "express";
import { NotificationController } from "../controllers";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const notificationRouter = Router();

// Buscar notificações do usuário
notificationRouter.get(
  "/notification",
  authMiddleware,
  NotificationController.getNotificationsController
);

// Buscar contador de notificações não lidas
notificationRouter.get(
  "/notification/unread-count",
  authMiddleware,
  NotificationController.getUnreadCountController
);

// Marcar notificação como lida
notificationRouter.put(
  "/notification/:id/read",
  authMiddleware,
  NotificationController.markAsReadController
);

// Marcar todas as notificações como lidas
notificationRouter.put(
  "/notification/read-all",
  authMiddleware,
  NotificationController.markAllAsReadController
);

export default notificationRouter;

