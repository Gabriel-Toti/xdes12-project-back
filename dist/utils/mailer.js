"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || smtpUser || "no-reply@casar.local";
const transporter = nodemailer_1.default.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: smtpUser && smtpPass
        ? {
            user: smtpUser,
            pass: smtpPass,
        }
        : undefined,
});
async function sendMail({ to, subject, html, text }) {
    if (!smtpUser || !smtpPass) {
        throw new Error("SMTP_USER e SMTP_PASS precisam estar definidos para enviar emails.");
    }
    await transporter.sendMail({
        from: smtpFrom,
        to,
        subject,
        html,
        text,
    });
}
//# sourceMappingURL=mailer.js.map