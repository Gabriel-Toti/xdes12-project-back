import { NextFunction, Request, Response } from "express";
import RolesValidationType from "../utils/enum/roles-validation-types.enum";
import { UserRole } from "../utils/enum/user-role.enum";
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
export declare function userRoleMiddleware(validationType: RolesValidationType, ...roles: UserRole[]): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=user-role-middleware.d.ts.map