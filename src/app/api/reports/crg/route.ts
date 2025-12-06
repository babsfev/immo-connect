export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getCRGData } from "@/app/data/crg";
import { generateCRGPDF } from "@/lib/pdf-crg-generator";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz"; // Vérifie cet import, c'était verifySession avant ?

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  const month = parseInt(searchParams.get("month") || new Date().getMonth().toString());
  const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

  // Calcul des dates exactes
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59);

  // Sécurité (si tu utilises getCurrentUser ou verifySession)
  // Assure-toi que la fonction est bien importée
  // const user = await getCurrentUser(); 
  // if (!user) ...

  // 👇 CORRECTION ICI : On passe 2 arguments
  const data = await getCRGData(startDate, endDate);
  
  // ... (Reste du code identique : récupération agencySettings, génération PDF)
  
  // Simulation du reste pour que tu puisses copier-coller si besoin
  const user = await getCurrentUser();
  if (!user) return new NextResponse("Non connecté", { status: 401 });

  const agencySettings = await db.agencySettings.findUnique({ where: { userId: user.userId } });

  if (!data) return new NextResponse("Erreur", { status: 500 });

  try {
    const pdfBuffer = await generateCRGPDF(data, agencySettings);
    
    // Correction du type Buffer pour Next
    const body = new Uint8Array(pdfBuffer);

    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="CRG_${month}_${year}.pdf"`,
      },
    });
  } catch (error) {
    return new NextResponse("Erreur PDF", { status: 500 });
  }
}