"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = getToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getToken(user) {
    return jsonwebtoken_1.default.sign({ userId: user.userId }, process.env.JWT_SECRET);
}
//# sourceMappingURL=token.js.map