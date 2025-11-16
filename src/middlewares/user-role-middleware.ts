import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/error-handler";
import { Forbidden } from "../utils/errors/forbidden";
import RolesValidationType from "../utils/enum/roles-validation-types.enum";
import { UserRole } from "../utils/enum/user-role.enum";
import { NotDefined } from "../utils/errors/not-defined";

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

export function userRoleMiddleware(
    validationType: RolesValidationType,
    ...roles: UserRole[]
  ) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        const { userRole } = req.headers;
  
        if (userRole == undefined)
          throw new Error(
            "Não foi possível verificar o nível de acesso, pois ele está definido."
          );
  
        if (roles.length === 0)
          throw new Error(
            "Não foi possível verificar o nível de acesso, pois eles não estão definidos."
          );
  
        if (!Object.values(UserRole).includes(userRole as string))
          throw new NotDefined("Nível de acesso inválido.");
  
        if (validationType === RolesValidationType.VERTICAL) {
          if (!roles.includes(parseInt(userRole as string))) {
            throw new Forbidden(
              "Esse perfil não está autorizado a realizar esta ação."
            );
          }
        } else if (validationType === RolesValidationType.HORIZONTAL) {
          if (parseInt(userRole as string) < Math.min(...roles)) {
            throw new Forbidden(
              "Esse perfil não está autorizado a realizar esta ação."
            );
          }
        } else {
          throw new Error("Tipo de verificação inválido.");
        }
  
        next();
      } catch (error: any) {
        const response = handleError(error);
        res.status(response.status).json(response.error);
      }
    };
  }