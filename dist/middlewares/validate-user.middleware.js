"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserMiddleware = validateUserMiddleware;
const error_handler_1 = require("../utils/error-handler");
const forbidden_1 = require("../utils/errors/forbidden");
const users_repository_1 = require("../domain/user/repositories/users.repository");
function validateUserMiddleware(prisma) {
    return async function (req, res, next) {
        try {
            const { userId } = req.headers;
            if (userId == undefined) {
                throw new Error("Não foi possível verificar o usuário, pois ele está indefinido.");
            }
            const user = await (0, users_repository_1.getUserById)(userId, prisma);
            if (!user) {
                throw new forbidden_1.Forbidden("Usuário não encontrado.");
            }
            const { active } = user;
            if (!active) {
                throw new forbidden_1.Forbidden("Usuário não ativo.");
            }
            next();
        }
        catch (error) {
            const response = (0, error_handler_1.handleError)(error);
            res.status(response.status).json(response.error);
        }
    };
}
//# sourceMappingURL=validate-user.middleware.js.map