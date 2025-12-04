import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

export async function getNotifications() {
  const user = await getCurrentUser();
  if (!user) return [];

  try {
    return await db.notification.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
  } catch (e) { return []; }
}

export async function getUnreadCount() {
  const user = await getCurrentUser();
  if (!user) return 0;
  return await db.notification.count({
    where: { userId: user.userId, read: false }
  });
}