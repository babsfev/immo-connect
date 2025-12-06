import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

export async function getConversations() {
  const user = await getCurrentUser();
  if (!user) return [];

  // Si je suis une Agence/Proprio, je veux voir tous les gens qui m'ont parlé
  if (user.role === "AGENCY" || user.role === "OWNER") {
    // On cherche les utilisateurs qui ont envoyé au moins un message
    const usersWithMessages = await db.user.findMany({
      where: {
        messages: { some: {} } // Qui ont des messages
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // On prend juste le dernier pour l'aperçu
          select: {
            content: true,
            createdAt: true,
            read: true
          }
        }
      }
    });

    // On formate pour l'UI
    return usersWithMessages.map(u => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      avatar: u.avatar,
      lastMsg: u.messages[0]?.content || "...",
      time: u.messages[0]?.createdAt,
      unread: !u.messages[0]?.read,
      // Couleur aléatoire stable basée sur l'ID (pour l'avatar par défaut)
      color: "bg-blue-100 text-blue-700" 
    })).sort((a, b) => b.time.getTime() - a.time.getTime()); // Tri par date récente
  } 
  
  // Si je suis Locataire, je ne vois pas de liste, juste le chat admin (géré ailleurs)
  return [];
}

export async function getMessagesForUser(targetUserId: string) {
  return await db.message.findMany({
    where: { userId: targetUserId },
    orderBy: { createdAt: 'asc' },
    include: {
        user: { select: { firstName: true, lastName: true, avatar: true } }
    }
  });
}