import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

// 1. Liste de tous les locataires
export async function getTenants() {
  const user = await getCurrentUser();
  if (!user) return [];

  const tenants = await db.tenant.findMany({
    where: {
      property: { managerId: user.userId },
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' },
    include: {
      property: { select: { title: true } },
      leases: { 
        where: { status: 'ACTIVE' },
        select: { status: true, rentAmount: true, startDate: true }
      }
    }
  });

  return tenants.map(t => {
    const activeLease = t.leases[0];
    return {
      id: t.id,
      name: `${t.firstName} ${t.lastName}`, // Nom complet pour l'affichage
      firstName: t.firstName,
      lastName: t.lastName,
      email: t.email,
      phone: t.phone,
      initials: `${t.firstName[0]}${t.lastName[0]}`.toUpperCase(),
      property: t.property?.title || "Aucun bien",
      rent: activeLease?.rentAmount || 0,
      status: activeLease ? "À jour" : "Inactif", // Simplifié
      joinedDate: t.createdAt.toISOString()
    };
  });
}

// 2. Détail d'un locataire (LA FONCTION MANQUANTE)
export async function getTenantById(tenantId: string) {
  const user = await getCurrentUser();
  if (!user) return null;

  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
    include: {
      property: true,
      leases: true,
      payments: {
        orderBy: { dueDate: 'desc' },
        take: 5
      }
    }
  });

  if (!tenant) return null;

  // Sécurité : Vérifier que ce locataire appartient bien à un bien du manager
  // Note: C'est une vérification simple, on pourrait faire plus strict
  if (tenant.property?.managerId !== user.userId) return null;

  return {
    ...tenant,
    initials: `${tenant.firstName[0]}${tenant.lastName[0]}`.toUpperCase(),
    rent: tenant.leases[0]?.rentAmount || 0,
    status: tenant.leases.length > 0 ? "Actif" : "Inactif"
  };
}