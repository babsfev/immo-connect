import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

/**
 * Récupère la liste des biens de l'utilisateur connecté.
 * SANS CACHE pour éviter les fuites de données cross-users.
 */
export async function getProperties() {
  const user = await getCurrentUser();
  
  if (!user) return [];

  try {
    const properties = await db.property.findMany({
      where: {
        managerId: user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        address: true,
        price: true,
        status: true,
        type: true,
        coverImage: true,
        tenants: {
          select: { id: true },
        },
      },
    });

    return properties;
  } catch (error) {
    console.error("Erreur chargement biens:", error);
    return [];
  }
}

/**
 * Récupère un bien spécifique par son ID (avec ses détails)
 * SANS CACHE et avec vérification stricte du managerId.
 */
export async function getPropertyById(propertyId: string) {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const property = await db.property.findUnique({
      where: {
        id: propertyId,
        managerId: user.userId, // SÉCURITÉ : Uniquement mes biens
      },
      include: {
        tenants: true,
        leases: {
          where: { status: "ACTIVE" },
        },
        // Chargement des sous-lots (pour les immeubles)
        lots: {
          orderBy: { title: "asc" },
          include: {
            tenants: true,
          },
        },
      },
    });

    return property;
  } catch (error) {
    console.error("Erreur getPropertyById:", error);
    return null;
  }
}