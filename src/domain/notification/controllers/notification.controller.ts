import { Request, Response } from "express";
import { logger } from "../../../config/logger";
import { getNotifications, getUnreadCount } from "../services/get-notifications.service";
import { markAsRead, markAllAsRead } from "../services/mark-as-read.service";

export async function getNotificationsController(req: Request, res: Response) {
  try {
    const userId = (req as any).session?.id;
    if (!userId) {
      return res.status(401).json({
        error: {
          type: "Unauthorized",
          message: "Usuário não autenticado"
        }
      });
    }

    const notifications = await getNotifications(userId);
    return res.status(200).json(notifications);
  } catch (error: any) {
    logger.error(error.message || "Erro ao buscar notificações");
    return res.status(500).json({
      error: {
        type: "InternalServerError",
        message: "Erro ao buscar notificações"
      }
    });
  }
}

export async function getUnreadCountController(req: Request, res: Response) {
  try {
    const userId = (req as any).session?.id;
    if (!userId) {
      return res.status(401).json({
        error: {
          type: "Unauthorized",
          message: "Usuário não autenticado"
        }
      });
    }

    const count = await getUnreadCount(userId);
    return res.status(200).json({ count });
  } catch (error: any) {
    logger.error(error.message || "Erro ao buscar contador de notificações");
    return res.status(500).json({
      error: {
        type: "InternalServerError",
        message: "Erro ao buscar contador"
      }
    });
  }
}

export async function markAsReadController(req: Request, res: Response) {
  try {
    const userId = (req as any).session?.id;
    if (!userId) {
      return res.status(401).json({
        error: {
          type: "Unauthorized",
          message: "Usuário não autenticado"
        }
      });
    }

    const { id } = req.params;
    await markAsRead(id, userId);
    return res.status(200).json({ message: "Notificação marcada como lida" });
  } catch (error: any) {
    logger.error(error.message || "Erro ao marcar notificação como lida");
    return res.status(500).json({
      error: {
        type: "InternalServerError",
        message: "Erro ao marcar como lida"
      }
    });
  }
}

export async function markAllAsReadController(req: Request, res: Response) {
  try {
    const userId = (req as any).session?.id;
    if (!userId) {
      return res.status(401).json({
        error: {
          type: "Unauthorized",
          message: "Usuário não autenticado"
        }
      });
    }

    await markAllAsRead(userId);
    return res.status(200).json({ message: "Todas as notificações marcadas como lidas" });
  } catch (error: any) {
    logger.error(error.message || "Erro ao marcar todas como lidas");
    return res.status(500).json({
      error: {
        type: "InternalServerError",
        message: "Erro ao marcar todas como lidas"
      }
    });
  }
}

