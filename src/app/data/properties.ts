import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";
// ❌ On enlève l'import de cache

export async function getProperties() { // ❌ Plus de cache()
  const user = await getCurrentUser();
  if (!user) return [];

  try {
    return await db.property.findMany({
      where: { managerId: user.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, address: true, price: true, status: true, type: true, coverImage: true,
        tenants: { select: { id: true } },
      },
    });
  } catch (error) { return []; }
}

export async function getPropertyById(propertyId: string) { // ❌ Plus de cache()
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    return await db.property.findUnique({
      where: { id: propertyId, managerId: user.userId },
      include: {
        tenants: true,
        leases: { where: { status: "ACTIVE" } },
        lots: { orderBy: { title: "asc" }, include: { tenants: true } },
      },
    });
  } catch (error) { return null; }
}