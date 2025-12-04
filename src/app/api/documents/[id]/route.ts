export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getPaymentForReceipt } from "@/app/data/documents";
import { generateReceiptPDF } from "@/lib/pdf-generator";
import { createClient } from "@/lib/supabase-server";
import { db } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 1. Récupération des données
  const payment = await getPaymentForReceipt(id);
  if (!payment) return new NextResponse("Non trouvé", { status: 404 });

  // 2. CHECK CACHE (Optimisation)
  if (payment.receiptUrl && payment.status === "PAID") {
      return NextResponse.redirect(payment.receiptUrl);
  }

  try {
    // 3. GÉNÉRATION
    const pdfBuffer = await generateReceiptPDF(payment);

    // 4. ARCHIVAGE (Upload vers Supabase Storage)
    const supabase = await createClient();
    const fileName = `receipts/${payment.id}_${Date.now()}.pdf`;
    
    const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, pdfBuffer, { contentType: 'application/pdf' });

    if (!uploadError) {
       const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
       
       // Mise à jour BDD
       await db.payment.update({
          where: { id: payment.id },
          data: { receiptUrl: data.publicUrl }
       });
    }

    // 5. RÉPONSE (CORRECTION ICI : as any)
    return new NextResponse(pdfBuffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Quittance_${payment.tenant.lastName}_${payment.id.slice(0,4)}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });

  } catch (error) {
    console.error("PDF Error:", error);
    return new NextResponse("Erreur génération PDF", { status: 500 });
  }
}