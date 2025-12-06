import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

// ❗ PAS DE cache() ICI (Sécurité Zero-Trust pour données temps réel)
export async function getDashboardData() {
  const user = await getCurrentUser();
  // 1. SÉCURITÉ : Si pas d'utilisateur, on renvoie null tout de suite
  if (!user || !user.userId) return null;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // --- 2. RÉCUPÉRATION DES DONNÉES ---
  
  // A. Propriétés (Pour les compteurs et l'IA)
  const properties = await db.property.findMany({
    where: { managerId: user.userId }, // SoftDelete géré par l'extension
    include: {
      leases: { where: { status: "ACTIVE" } },
      tickets: { where: { status: { not: "DONE" } } },
    }
  });

  // B. Paiements (Pour les finances)
  const payments = await db.payment.findMany({
    where: {
      lease: { property: { managerId: user.userId } }
    },
    select: {
      amount: true,
      receivedAmount: true,
      dueDate: true,       // Date prévue
      lastPaymentDate: true, // Date réelle
      status: true,
    }
  });

  // C. Notifications (Pour InboxWidget)
  const recentNotifications = await db.notification.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
       id: true,
       title: true,
       message: true,
       type: true,
       read: true,
       createdAt: true
    }
  });

  // D. Locataires Récents (Pour le widget TenantView)
  const recentTenantsRaw = await db.tenant.findMany({
    where: {
      property: { managerId: user.userId },
    },
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      property: { select: { title: true } },
      leases: { 
        where: { status: 'ACTIVE' },
        select: { status: true }
      }
    }
  });

  // --- 3. CALCULS KPI & FORMATAGE ---

  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.leases.length > 0).length;
  
  const occupancyRate = totalProperties > 0 
    ? Math.round((occupiedProperties / totalProperties) * 100)
    : 0;

  const activeTickets = properties.reduce((acc, p) => acc + p.tickets.length, 0);

  // Revenus ENCAISSÉS ce mois-ci
  const monthlyRevenue = payments
    .filter(p => {
      if (!p.lastPaymentDate) return false;
      const d = new Date(p.lastPaymentDate);
      return d.getMonth() === currentMonth &&
             d.getFullYear() === currentYear &&
             (p.status === "PAID" || p.status === "PARTIAL");
    })
    .reduce((acc, p) => acc + (p.receivedAmount || 0), 0);

  // Revenus ATTENDUS ce mois-ci
  const monthlyExpected = payments
    .filter(p => {
      const d = new Date(p.dueDate);
      return d.getMonth() === currentMonth &&
             d.getFullYear() === currentYear;
    })
    .reduce((acc, p) => acc + p.amount, 0);

  // Formatage des Locataires pour le Front
  const recentTenants = recentTenantsRaw.map(t => ({
    id: t.id,
    name: `${t.firstName} ${t.lastName}`,
    property: t.property?.title || "Aucun bien",
    status: t.leases.length > 0 ? "À jour" : "Inactif",
  }));

  // --- 4. DONNÉES DU GRAPHIQUE (6 MOIS) ---
  const chartData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = d.toLocaleString("fr-FR", { month: "short" });

    const monthPayments = payments.filter(p => {
      if (!p.lastPaymentDate) return false;
      const pd = new Date(p.lastPaymentDate);
      return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear();
    });

    const income = monthPayments.reduce((acc, p) => acc + (p.receivedAmount || 0), 0);

    chartData.push({
      month: monthLabel,
      in: income,
      out: 0 
    });
  }

  // --- 5. BIEN À OPTIMISER (IA) ---
  const propertyToOptimize = properties[0] 
    ? { title: properties[0].title, id: properties[0].id }
    : null;

  // --- 6. RETOUR FINAL ---
  return {
    kpi: {
      monthlyRevenue,
      monthlyExpected,
      occupancyRate,
      activeTickets,
      totalProperties,
    },
    chartData,
    recentTenants,      // <--- Connecté au widget Locataires
    propertyToOptimize, // <--- Connecté au widget IA
    recentNotifications // <--- Connecté au widget Notifications
  };
}