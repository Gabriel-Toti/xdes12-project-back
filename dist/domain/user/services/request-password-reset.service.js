"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPasswordResetService = requestPasswordResetService;
const users_repository_1 = require("../repositories/users.repository");
const mailer_1 = require("../../../utils/mailer");
function generateResetCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
const RESET_EXPIRATION_MINUTES = 30;
async function requestPasswordResetService(email, prisma) {
    const user = await (0, users_repository_1.getUserByEmail)(email, prisma);
    // Não revela se o email existe ou não
    if (!user) {
        return;
    }
    const resetCode = generateResetCode();
    const expiresAt = new Date(Date.now() + RESET_EXPIRATION_MINUTES * 60 * 1000);
    await prisma.users.update({
        where: { email },
        data: {
            reset_password_code: resetCode,
            code_expires_at: expiresAt,
        },
    });
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetLink = `${frontendUrl.replace(/\/$/, "")}/redefinir-senha?email=${encodeURIComponent(email)}&code=${resetCode}`;
    const textContent = [
        "Recebemos uma solicitação para redefinir a sua senha no CASAR.",
        `Use o código ${resetCode} ou clique no link abaixo:`,
        resetLink,
        "",
        "Se você não solicitou a redefinição, ignore este email.",
    ].join("\n");
    await (0, mailer_1.sendMail)({
        to: email,
        subject: "CASAR - Redefinição de senha",
        html: `
            <p>Recebemos uma solicitação para redefinir a sua senha no <strong>CASAR</strong>.</p>
            <p><strong>Código:</strong> ${resetCode}</p>
            <p>Você também pode clicar no link abaixo para redefinir:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p>Se você não solicitou a redefinição, pode ignorar este email.</p>
        `,
        text: textContent,
    });
}
//# sourceMappingURL=request-password-reset.service.js.map