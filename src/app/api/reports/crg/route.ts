export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getCRGData } from "@/app/data/crg";
import { generateCRGPDF } from "@/lib/pdf-crg-generator";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const month = parseInt(searchParams.get("month") || new Date().getMonth().toString());
  const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

  const user = await getCurrentUser();
  if (!user) return new NextResponse("Non autorisé", { status: 401 });

  // 1. Données Financières
  const data = await getCRGData({ month, year });
  
  // 2. Données Agence (Pour le logo)
  const agencySettings = await db.agencySettings.findUnique({
      where: { userId: user.userId }
  });

  if (!data) return new NextResponse("Erreur données", { status: 500 });

  try {
    const pdfBuffer = await generateCRGPDF(data, agencySettings);

    // CORRECTION ICI : cast 'as any' pour satisfaire TypeScript
    return new NextResponse(pdfBuffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="CRG_${month}_${year}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Erreur PDF", { status: 500 });
  }
}