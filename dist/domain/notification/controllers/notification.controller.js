"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationsController = getNotificationsController;
exports.getUnreadCountController = getUnreadCountController;
exports.markAsReadController = markAsReadController;
exports.markAllAsReadController = markAllAsReadController;
const logger_1 = require("../../../utils/logger");
const get_notifications_service_1 = require("../services/get-notifications.service");
const mark_as_read_service_1 = require("../services/mark-as-read.service");
async function getNotificationsController(req, res) {
    try {
        const userId = req.session?.id;
        if (!userId) {
            return res.status(401).json({
                error: {
                    type: "Unauthorized",
                    message: "Usuário não autenticado"
                }
            });
        }
        const notifications = await (0, get_notifications_service_1.getNotifications)(userId);
        return res.status(200).json(notifications);
    }
    catch (error) {
        logger_1.logger.error(error.message || "Erro ao buscar notificações");
        return res.status(500).json({
            error: {
                type: "InternalServerError",
                message: "Erro ao buscar notificações"
            }
        });
    }
}
async function getUnreadCountController(req, res) {
    try {
        const userId = req.session?.id;
        if (!userId) {
            return res.status(401).json({
                error: {
                    type: "Unauthorized",
                    message: "Usuário não autenticado"
                }
            });
        }
        const count = await (0, get_notifications_service_1.getUnreadCount)(userId);
        return res.status(200).json({ count });
    }
    catch (error) {
        logger_1.logger.error(error.message || "Erro ao buscar contador de notificações");
        return res.status(500).json({
            error: {
                type: "InternalServerError",
                message: "Erro ao buscar contador"
            }
        });
    }
}
async function markAsReadController(req, res) {
    try {
        const userId = req.session?.id;
        if (!userId) {
            return res.status(401).json({
                error: {
                    type: "Unauthorized",
                    message: "Usuário não autenticado"
                }
            });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                error: {
                    type: "BadRequest",
                    message: "ID da notificação é obrigatório"
                }
            });
        }
        await (0, mark_as_read_service_1.markAsRead)(id, userId);
        return res.status(200).json({ message: "Notificação marcada como lida" });
    }
    catch (error) {
        logger_1.logger.error(error.message || "Erro ao marcar notificação como lida");
        return res.status(500).json({
            error: {
                type: "InternalServerError",
                message: "Erro ao marcar como lida"
            }
        });
    }
}
async function markAllAsReadController(req, res) {
    try {
        const userId = req.session?.id;
        if (!userId) {
            return res.status(401).json({
                error: {
                    type: "Unauthorized",
                    message: "Usuário não autenticado"
                }
            });
        }
        await (0, mark_as_read_service_1.markAllAsRead)(userId);
        return res.status(200).json({ message: "Todas as notificações marcadas como lidas" });
    }
    catch (error) {
        logger_1.logger.error(error.message || "Erro ao marcar todas como lidas");
        return res.status(500).json({
            error: {
                type: "InternalServerError",
                message: "Erro ao marcar todas como lidas"
            }
        });
    }
}
//# sourceMappingURL=notification.controller.js.map