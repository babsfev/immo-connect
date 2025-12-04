import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

export async function getLeases() {
  const user = await getCurrentUser();
  if (!user) return [];

  try {
    const leases = await db.lease.findMany({
      where: {
        property: { managerId: user.userId }
      },
      orderBy: { startDate: 'desc' },
      include: {
        property: { select: { title: true } },
        tenant: { select: { firstName: true, lastName: true } }
      }
    });

    return leases.map(lease => ({
      id: lease.id,
      property: lease.property.title,
      tenant: `${lease.tenant.firstName} ${lease.tenant.lastName}`,
      startDate: lease.startDate.toLocaleDateString('fr-FR'),
      endDate: lease.endDate.toLocaleDateString('fr-FR'),
      rent: lease.rentAmount,
      deposit: lease.deposit,
      status: lease.status,
      // Calcul : Jours restants avant fin de bail
      daysLeft: Math.ceil((new Date(lease.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}