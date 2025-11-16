import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../utils/errors/unauthorized";
import { handleError } from "../utils/error-handler";

const secretKey = process.env.JWT_SECRET!;

export function authMiddleware() {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.auth_token;

      if (!token) {
        throw new Unauthorized("Token não fornecido");
      }

      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

      if (!decoded || !decoded.userId) {
        throw new Unauthorized("Token inválido ou sem ID");
      }

      req.headers.userId = decoded.userId;

      next();
    } catch (error: any) {
      const response = handleError(error);
      res.status(response.status).json(response.error);
    }
  };
}
