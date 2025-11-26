import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function markAsRead(id: string, id_user: string) {
  const notification = await prisma.notification.updateMany({
    where: {
      id,
      id_user // Garantir que o usuário é o dono da notificação
    },
    data: {
      read: true
    }
  });

  return notification;
}

export async function markAllAsRead(id_user: string) {
  const result = await prisma.notification.updateMany({
    where: {
      id_user,
      read: false
    },
    data: {
      read: true
    }
  });

  return result;
}

