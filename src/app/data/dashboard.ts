import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";
// ❗ PAS DE cache() ICI (Sécurité Zero-Trust)

export async function getDashboardData() {
  const user = await getCurrentUser();
  if (!user) return null;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // --- 1. PROPERTIES ---
  const properties = await db.property.findMany({
    where: { managerId: user.userId },
    include: {
      leases: { where: { status: "ACTIVE" } },
      tickets: { where: { status: { not: "DONE" } } },
    }
  });

  // --- 2. PAYMENTS ---
  const payments = await db.payment.findMany({
    where: {
      lease: { property: { managerId: user.userId } }
    },
    orderBy: { date: "asc" },
    select: {
      amount: true,
      receivedAmount: true,
      date: true,
      dueDate: true,
      status: true,
    }
  });

  // --- 3. CALCULS KPIs ---
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.leases.length > 0).length;
  const occupancyRate = totalProperties > 0 
    ? Math.round((occupiedProperties / totalProperties) * 100)
    : 0;

  const monthlyRevenue = payments
    .filter(p => {
      const d = new Date(p.date);
      return d.getMonth() === currentMonth &&
             d.getFullYear() === currentYear &&
             (p.status === "PAID" || p.status === "PARTIAL");
    })
    .reduce((acc, p) => acc + (p.receivedAmount || 0), 0);

  const monthlyExpected = payments
    .filter(p => {
      const d = new Date(p.dueDate);
      return d.getMonth() === currentMonth &&
             d.getFullYear() === currentYear;
    })
    .reduce((acc, p) => acc + p.amount, 0);

  const activeTickets = properties.reduce((acc, p) => acc + p.tickets.length, 0);

  // --- 4. GRAPHIQUE (6 MOIS) ---
  const chartData = [];
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = d.toLocaleString("fr-FR", { month: "short" });

    const monthPayments = payments.filter(p => {
      const pd = new Date(p.date);
      return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear();
    });

    const income = monthPayments.reduce((acc, p) => acc + (p.receivedAmount || 0), 0);

    chartData.push({
      month: monthLabel,
      in: income,
      out: 0 
    });
  }

  return {
    kpi: {
      monthlyRevenue,
      monthlyExpected,
      occupancyRate,
      activeTickets,
      totalProperties,
    },
    chartData,
  };
}