import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getNotifications(id_user: string) {
  const notifications = await prisma.notification.findMany({
    where: {
      id_user
    },
    orderBy: {
      created_at: 'desc'
    },
    take: 50 // Limite de 50 notificações mais recentes
  });

  return notifications;
}

export async function getUnreadCount(id_user: string) {
  const count = await prisma.notification.count({
    where: {
      id_user,
      read: false
    }
  });

  return count;
}

