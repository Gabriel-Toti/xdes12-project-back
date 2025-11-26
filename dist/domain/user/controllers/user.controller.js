"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getMe = getMe;
exports.logout = logout;
exports.requestPasswordReset = requestPasswordReset;
exports.resetPassword = resetPassword;
const error_handler_1 = require("../../../utils/error-handler");
const create_user_service_1 = require("../services/create-user.service");
const login_service_1 = require("../services/login.service");
const update_user_service_1 = require("../services/update-user.service");
const delete_user_service_1 = require("../services/delete-user.service");
const users_repository_1 = require("../repositories/users.repository");
const not_found_1 = require("../../../utils/errors/not-found");
const cookie_1 = require("../../../utils/cookie");
const request_password_reset_service_1 = require("../services/request-password-reset.service");
const reset_password_service_1 = require("../services/reset-password.service");
function createUser(prisma) {
    return async function (req, res) {
        try {
            const userData = req.body;
            await (0, create_user_service_1.createUserService)(userData, res, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function login(prisma) {
    return async function (req, res) {
        try {
            const { email, password } = req.body;
            await (0, login_service_1.loginService)(email, password, res, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function updateUser(prisma) {
    return async function (req, res) {
        try {
            const userData = req.body;
            const { userId } = req.headers;
            await (0, update_user_service_1.UpdateUserService)(userId, userData, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function deleteUser(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            await (0, delete_user_service_1.deleteUserService)(userId, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function getMe(prisma) {
    return async function (req, res) {
        try {
            const { userId } = req.headers;
            if (!userId) {
                throw new not_found_1.NotFound("Usuário não encontrado.");
            }
            const user = await (0, users_repository_1.getUserById)(userId, prisma);
            if (!user) {
                throw new not_found_1.NotFound("Usuário não encontrado.");
            }
            const { password, reset_password_code, ...safeUser } = user;
            res.status(200).json(safeUser);
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function logout(_prisma) {
    return async function (_req, res) {
        try {
            (0, cookie_1.revokeAuthCookie)(res);
            res.status(200).json({ message: "Logout realizado com sucesso" });
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function requestPasswordReset(prisma) {
    return async function (req, res) {
        try {
            const { email } = req.body;
            await (0, request_password_reset_service_1.requestPasswordResetService)(email, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
function resetPassword(prisma) {
    return async function (req, res) {
        try {
            const { email, code, password } = req.body;
            await (0, reset_password_service_1.resetPasswordService)(email, code, password, prisma);
            res.status(204).send();
        }
        catch (error) {
            const e = (0, error_handler_1.handleError)(error);
            res.status(e.status).json(e.error);
        }
    };
}
//# sourceMappingURL=user.controller.js.map