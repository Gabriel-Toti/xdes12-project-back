import { PrismaClient } from "@prisma/client";
import { ICreateNotification } from "../interfaces/notification.interface";

const prisma = new PrismaClient();

export async function createNotification(data: ICreateNotification) {
  const notification = await prisma.notification.create({
    data: {
      id_user: data.id_user,
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link,
      read: false
    }
  });

  return notification;
}

