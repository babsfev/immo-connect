import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";
import { cache } from "react";

/**
 * Récupère tous les locataires (Liste)
 * Sécurité : Déjà filtré par le 'where' de la requête
 */
export const getTenants = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return [];

  try {
    const tenants = await db.tenant.findMany({
      where: { property: { managerId: user.userId } },
      orderBy: { createdAt: 'desc' },
      include: {
        property: { select: { title: true } },
        leases: { where: { status: 'ACTIVE' }, select: { rentAmount: true } },
        payments: { orderBy: { dueDate: 'desc' }, take: 1, select: { status: true } }
      }
    });

    return tenants.map(t => {
      const lastPayment = t.payments[0];
      let status = "À jour";
      if (!lastPayment) status = "Nouveau";
      else if (lastPayment.status === "PENDING") status = "En attente";
      else if (lastPayment.status === "LATE" || lastPayment.status === "FAILED") status = "En retard";
      
      return {
        id: t.id,
        name: `${t.firstName} ${t.lastName}`,
        email: t.email,
        phone: t.phone,
        property: t.property?.title || "Non assigné",
        rent: t.leases[0]?.rentAmount || 0,
        status: status,
        initials: `${t.firstName.charAt(0)}${t.lastName.charAt(0)}`,
      };
    });
  } catch (e) { return []; }
});

/**
 * Récupère un locataire unique (Détail)
 * Sécurité : Vérification manuelle du managerId après fetch
 */
export const getTenantById = cache(async (id: string) => {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const tenant = await db.tenant.findUnique({
      where: { id },
      include: {
        property: { 
           select: { 
              id: true, 
              title: true, 
              address: true, 
              city: true, 
              managerId: true // <--- CRITIQUE : On récupère l'ID du propriétaire
           } 
        },
        leases: { where: { status: "ACTIVE" }, take: 1 },
        payments: { orderBy: { dueDate: "desc" }, take: 10 },
      }
    });

    // 🔒 SÉCURITÉ ULTIME :
    // Si le locataire n'existe pas OU si le bien ne m'appartient pas => 404
    if (!tenant || tenant.property?.managerId !== user.userId) {
        return null;
    }

    return tenant;
  } catch (error) {
    return null;
  }
});