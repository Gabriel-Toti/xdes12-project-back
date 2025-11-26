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
exports.resetPasswordService = resetPasswordService;
const bcrypt = __importStar(require("bcrypt"));
const users_repository_1 = require("../repositories/users.repository");
const unauthorized_1 = require("../../../utils/errors/unauthorized");
async function resetPasswordService(email, code, password, prisma) {
    const user = await (0, users_repository_1.getUserByEmail)(email, prisma);
    if (!user || !user.reset_password_code || user.reset_password_code !== code) {
        throw new unauthorized_1.Unauthorized("Código inválido ou expirado.");
    }
    if (!user.code_expires_at || user.code_expires_at.getTime() < Date.now()) {
        throw new unauthorized_1.Unauthorized("Código inválido ou expirado.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.users.update({
        where: { email },
        data: {
            password: hashedPassword,
            reset_password_code: null,
            code_expires_at: null,
        },
    });
}
//# sourceMappingURL=reset-password.service.js.map