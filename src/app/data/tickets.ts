import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

export async function getTickets() {
  const user = await getCurrentUser();
  if (!user) return [];

  const tickets = await db.ticket.findMany({
    where: { 
      property: { managerId: user.userId }, // Seulement mes tickets
      deletedAt: null 
    },
    orderBy: { createdAt: 'desc' }, // Les plus récents en premier
    include: {
      property: { 
        select: { title: true },
        include: {
           leases: {
              where: { status: 'ACTIVE' },
              include: { tenant: { select: { firstName: true, lastName: true } } }
           }
        }
      }
    }
  });

  // On transforme les données brutes en format facile pour le Frontend
  return tickets.map(t => ({
    id: t.id,
    title: t.title,
    description: t.description || "",
    property: t.property.title,
    // On essaie de trouver le locataire via le bail actif, sinon "Inconnu"
    tenant: t.property.leases[0]?.tenant 
      ? `${t.property.leases[0].tenant.firstName} ${t.property.leases[0].tenant.lastName}`
      : "Non assigné",
    date: t.createdAt.toISOString(),
    priority: t.priority,
    status: t.status,
    provider: null // Pas encore géré en V1
  }));
}