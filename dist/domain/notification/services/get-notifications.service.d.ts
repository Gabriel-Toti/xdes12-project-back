export declare function getNotifications(id_user: string): Promise<{
    id: string;
    created_at: Date;
    link: string | null;
    message: string;
    id_user: string;
    type: import(".prisma/client").$Enums.notification_type;
    title: string;
    read: boolean;
}[]>;
export declare function getUnreadCount(id_user: string): Promise<number>;
//# sourceMappingURL=get-notifications.service.d.ts.map