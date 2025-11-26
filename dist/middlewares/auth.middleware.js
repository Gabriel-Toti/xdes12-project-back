"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthorized_1 = require("../utils/errors/unauthorized");
const error_handler_1 = require("../utils/error-handler");
const secretKey = process.env.JWT_SECRET;
function authMiddleware() {
    return async function (req, res, next) {
        try {
            const token = req.cookies.auth_token;
            if (!token) {
                throw new unauthorized_1.Unauthorized("Token não fornecido");
            }
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            if (!decoded || !decoded.userId) {
                throw new unauthorized_1.Unauthorized("Token inválido ou sem ID");
            }
            req.headers.userId = decoded.userId;
            next();
        }
        catch (error) {
            const response = (0, error_handler_1.handleError)(error);
            res.status(response.status).json(response.error);
        }
    };
}
//# sourceMappingURL=auth.middleware.js.map