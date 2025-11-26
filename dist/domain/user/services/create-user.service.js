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
exports.createUserService = createUserService;
const users_repository_1 = require("../repositories/users.repository");
const bcrypt = __importStar(require("bcrypt"));
const cookie_1 = require("../../../utils/cookie");
const token_1 = require("../../../utils/token");
const date_format_1 = require("../../../utils/date-format");
async function createUserService(userData, res, prisma) {
    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(userData.password, saltRounds);
        userData.password = passwordHash;
        userData.birthdate = (0, date_format_1.toISOLocaleString)(new Date(userData.birthdate));
        const user = await (0, users_repository_1.createUser)(userData, prisma);
        if (!user) {
            throw new Error("Falha ao criar usuário");
        }
        const token = (0, token_1.getToken)({ userId: user.id });
        (0, cookie_1.setAuthCookie)(res, token);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=create-user.service.js.map