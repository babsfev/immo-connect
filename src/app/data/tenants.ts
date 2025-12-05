import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";
// ❌ On enlève l'import de cache

export async function getTenants() { // ❌ Plus de cache() autour
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

    return tenants.map(t => ({
      id: t.id,
      name: `${t.firstName} ${t.lastName}`,
      email: t.email,
      phone: t.phone,
      property: t.property?.title || "Non assigné",
      rent: t.leases[0]?.rentAmount || 0,
      status: t.payments[0]?.status === "PENDING" ? "En attente" : "À jour", // Simplifié pour l'exemple
      initials: `${t.firstName.charAt(0)}${t.lastName.charAt(0)}`,
    }));
  } catch (e) { return []; }
}

export async function getTenantById(id: string) { // ❌ Plus de cache()
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const tenant = await db.tenant.findUnique({
      where: { id },
      include: {
        property: { select: { id: true, title: true, address: true, city: true, managerId: true } },
        leases: { where: { status: "ACTIVE" }, take: 1 },
        payments: { orderBy: { dueDate: "desc" }, take: 10 },
      }
    });

    if (!tenant || tenant.property?.managerId !== user.userId) return null;
    return tenant;
  } catch (error) { return null; }
}