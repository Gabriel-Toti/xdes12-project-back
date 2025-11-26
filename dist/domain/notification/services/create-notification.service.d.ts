import { ICreateNotification } from "../interfaces/notification.interface";
export declare function createNotification(data: ICreateNotification): Promise<{
    id: string;
    created_at: Date;
    link: string | null;
    message: string;
    id_user: string;
    type: import(".prisma/client").$Enums.notification_type;
    title: string;
    read: boolean;
}>;
//# sourceMappingURL=create-notification.service.d.ts.map