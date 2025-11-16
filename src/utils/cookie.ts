import { Response } from "express";

export function setAuthCookie(res: Response, token: string)
{
    return res.cookie("auth_token", token, {
        httpOnly: true, // Garante que o cookie não seja acessível por JavaScript
        secure: process.env.NODE_ENV === "production", // Garante que o cookie seja enviado apenas via HTTPS em produção
        maxAge: 3600000 * 4, // Expiração do cookie em 4 horas
        domain:
            process.env.NODE_ENV === "production"
            ? process.env.COOKIE_DOMAIN
            : undefined, // Domínio do cookie
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Limita o envio do cookie apenas para o mesmo site em produção
        path: "/", // Caminho do cookie
    });
}

export function revokeAuthCookie(res: Response)
{
    res.clearCookie("auth_token", {path: "/", domain:  process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : undefined});
}