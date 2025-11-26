"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleMiddleware = userRoleMiddleware;
const error_handler_1 = require("../utils/error-handler");
const forbidden_1 = require("../utils/errors/forbidden");
const roles_validation_types_enum_1 = __importDefault(require("../utils/enum/roles-validation-types.enum"));
const user_role_enum_1 = require("../utils/enum/user-role.enum");
const not_defined_1 = require("../utils/errors/not-defined");
/**
 * Função que verifica o nível de acesso de um usuário.
 *
 * @param { RolesValidationType } validationType
 * Enum que define o tipo de validação do nível de acesso.
 * Pode assumir dois valores:
 *  - Vertical: só tem acesso o usuário que possui os níveis de acesso determinados em 'roles';
 *  - Horizontal: tem acesso quem tem pelo menos o menor nível de acesso determinado em 'roles'.
 *
 * @param { UserRoles[] } roles
 * Array de Enum que define os níveis de acesso que podem performar a ação da rota.
 *
 * @throws { Forbidden }
 * Na verificação vertical, é lançado se o nível de acesso do usuário não for contemplado em 'roles';
 * Na verificação horizontal, é lancado se o nível de acesso do usuário for menor que no nível de acesso mínimo contemplado em 'roles'.
 *
 * @throws { Error }
 * Se o um dos parâmetros for undefined ou estiver fora do esperado pelo Enum, o erro será lançado.
 *
 */
function userRoleMiddleware(validationType, ...roles) {
    return async function (req, res, next) {
        try {
            const { userRole } = req.headers;
            if (userRole == undefined)
                throw new Error("Não foi possível verificar o nível de acesso, pois ele está definido.");
            if (roles.length === 0)
                throw new Error("Não foi possível verificar o nível de acesso, pois eles não estão definidos.");
            if (!Object.values(user_role_enum_1.UserRole).includes(userRole))
                throw new not_defined_1.NotDefined("Nível de acesso inválido.");
            if (validationType === roles_validation_types_enum_1.default.VERTICAL) {
                if (!roles.includes(parseInt(userRole))) {
                    throw new forbidden_1.Forbidden("Esse perfil não está autorizado a realizar esta ação.");
                }
            }
            else if (validationType === roles_validation_types_enum_1.default.HORIZONTAL) {
                if (parseInt(userRole) < Math.min(...roles)) {
                    throw new forbidden_1.Forbidden("Esse perfil não está autorizado a realizar esta ação.");
                }
            }
            else {
                throw new Error("Tipo de verificação inválido.");
            }
            next();
        }
        catch (error) {
            const response = (0, error_handler_1.handleError)(error);
            res.status(response.status).json(response.error);
        }
    };
}
//# sourceMappingURL=user-role-middleware.js.map