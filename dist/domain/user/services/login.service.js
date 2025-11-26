"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = loginService;
const bcrypt = __importStar(require("bcrypt"));
const users_repository_1 = require("../repositories/users.repository");
const date_format_1 = require("../../../utils/date-format");
const token_1 = require("../../../utils/token");
const cookie_1 = require("../../../utils/cookie");
const unauthorized_1 = require("../../../utils/errors/unauthorized");
async function loginService(email, password, res, prisma) {
    try {
        const user = await (0, users_repository_1.getUserByEmail)(email, prisma);
        if (!user) {
            throw new unauthorized_1.Unauthorized("Email ou senha incorretos.");
        }
        const hashedPassword = user.password;
        if (!await bcrypt.compare(password, hashedPassword)) {
            throw new unauthorized_1.Unauthorized("Email ou senha incorretos.");
        }
        const now = (0, date_format_1.toISOLocaleString)(new Date());
        const updateResult = await (0, users_repository_1.updateLastLogin)(email, now, prisma);
        if (!updateResult) {
            throw new Error("Falha ao atualizar dados de login");
        }
        const token = (0, token_1.getToken)({ userId: user.id });
        (0, cookie_1.setAuthCookie)(res, token);
        return;
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=login.service.js.map