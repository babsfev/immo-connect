import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

export async function getConversations() {
  const user = await getCurrentUser();
  if (!user) return [];

  // Si je suis une Agence/Proprio, je veux voir tous les gens qui m'ont parlé
  if (user.role === "AGENCY" || user.role === "OWNER") {
    const usersWithMessages = await db.user.findMany({
      where: {
        messages: { some: {} } // Utilisateurs ayant envoyé des messages
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Le dernier message pour l'aperçu
          select: {
            content: true,
            createdAt: true,
            read: true
          }
        }
      }
    });

    return usersWithMessages.map(u => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      avatar: u.avatar,
      lastMsg: u.messages[0]?.content || "...",
      time: u.messages[0]?.createdAt,
      unread: !u.messages[0]?.read,
      color: "bg-blue-100 text-blue-700" 
    })).sort((a, b) => b.time.getTime() - a.time.getTime());
  } 
  
  return [];
}