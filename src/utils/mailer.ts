import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || smtpUser || "no-reply@casar.local";

const transporter = nodemailer.createTransport({
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

type SendMailParams = {
    to: string;
    subject: string;
    html: string;
    text?: string;
};

export async function sendMail({ to, subject, html, text }: SendMailParams) {
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

