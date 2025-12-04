import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";
// Pas de cache() ici pour éviter le partage de données entre utilisateurs !

/**
 * Récupère tous les tickets d'un gestionnaire
 * SANS CACHE pour garantir l'isolation des données.
 */
export async function getTickets() {
  const user = await getCurrentUser();
  if (!user) return [];

  try {
    const tickets = await db.ticket.findMany({
      where: {
        property: { managerId: user.userId } // Sécurité : Mes biens uniquement
      },
      orderBy: { createdAt: 'desc' },
      include: {
        property: { select: { title: true, address: true } },
        creator: { select: { firstName: true, lastName: true, roles: true } },
        assignee: { select: { firstName: true, lastName: true } }
      }
    });

    return tickets.map(t => ({
      id: t.id,
      title: t.title,
      description: t.description || "",
      property: t.property.title,
      tenant: t.creator.roles.includes("TENANT") 
        ? `${t.creator.firstName} ${t.creator.lastName}` 
        : "Interne / Agence",
      date: t.createdAt.toISOString(),
      priority: t.priority,
      status: t.status,
      provider: t.assignee 
        ? `${t.assignee.firstName} ${t.assignee.lastName}` 
        : null,
    }));

  } catch (error) {
    console.error(error);
    return [];
  }
}