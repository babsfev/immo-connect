import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

export async function getExpenses() {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const expenses = await db.expense.findMany({
      where: {
        property: { managerId: user.userId } // Sécurité via la propriété
      },
      orderBy: { date: 'desc' },
      include: {
        property: { select: { title: true } }
      }
    });

    // KPIs
    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
    const recoverableAmount = expenses
        .filter(e => e.isRecoverable)
        .reduce((sum, e) => sum + e.amount, 0);
    
    // Formatage
    const safeExpenses = expenses.map(e => ({
       ...e,
       date: e.date.toISOString(),
       createdAt: e.createdAt.toISOString(),
       propertyName: e.property.title
    }));

    return {
       expenses: safeExpenses,
       stats: { totalAmount, recoverableAmount }
    };

  } catch (error) {
    return null;
  }
}