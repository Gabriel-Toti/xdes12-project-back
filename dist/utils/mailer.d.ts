type SendMailParams = {
    to: string;
    subject: string;
    html: string;
    text?: string;
};
export declare function sendMail({ to, subject, html, text }: SendMailParams): Promise<void>;
export {};
//# sourceMappingURL=mailer.d.ts.map