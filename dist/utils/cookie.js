"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = setAuthCookie;
exports.revokeAuthCookie = revokeAuthCookie;
function setAuthCookie(res, token) {
    return res.cookie("auth_token", token, {
        httpOnly: true, // Garante que o cookie não seja acessível por JavaScript
        secure: process.env.NODE_ENV === "production", // Garante que o cookie seja enviado apenas via HTTPS em produção
        maxAge: 3600000 * 4, // Expiração do cookie em 4 horas
        domain: process.env.NODE_ENV === "production"
            ? process.env.COOKIE_DOMAIN
            : undefined, // Domínio do cookie
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Limita o envio do cookie apenas para o mesmo site em produção
        path: "/", // Caminho do cookie
    });
}
function revokeAuthCookie(res) {
    res.clearCookie("auth_token", { path: "/", domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : undefined });
}
//# sourceMappingURL=cookie.js.map