export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getPaymentForReceipt } from "@/app/data/documents";
import { generateReceiptPDF } from "@/lib/pdf-generator";
import { createClient } from "@/lib/supabase-server";
import { db } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. SÉCURITÉ : Vérification de la session
  // On bloque l'accès si l'utilisateur n'est pas connecté
  const session = await verifySession();
  if (!session) {
    return new NextResponse("Non authentifié", { status: 401 });
  }

  // 2. Récupération des données
  // (La vérification des droits manager/tenant est faite DANS cette fonction, voir data/documents.ts)
  const payment = await getPaymentForReceipt(id);

  if (!payment) {
    // Si return null, c'est que le paiement n'existe pas OU que l'user n'a pas le droit.
    // On renvoie 404 pour ne pas fuiter d'infos.
    return new NextResponse("Document non trouvé ou accès refusé", { status: 404 });
  }

  // 3. CHECK CACHE (Optimisation)
  // Si le PDF existe déjà sur Supabase, on redirige directement vers l'URL
  if (payment.receiptUrl && payment.status === "PAID") {
    return NextResponse.redirect(payment.receiptUrl);
  }

  try {
    // 4. GÉNÉRATION DU PDF (Buffer Node.js)
    const pdfBuffer = await generateReceiptPDF(payment);

    // 5. ARCHIVAGE (Upload vers Supabase Storage)
    const supabase = await createClient();
    const fileName = `receipts/${payment.id}_${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, pdfBuffer, { contentType: 'application/pdf' });

    if (!uploadError) {
      const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
      
      // Mise à jour BDD (asynchrone, on ne bloque pas la réponse)
      await db.payment.update({
        where: { id: payment.id },
        data: { receiptUrl: data.publicUrl }
      });
    }

    // 6. RÉPONSE ET CORRECTION DE L'ERREUR TYPESCRIPT
    // On convertit le Buffer Node.js en Uint8Array standard pour satisfaire NextResponse
    const body = new Uint8Array(pdfBuffer);

    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Quittance_${payment.tenant.lastName}_${payment.id.slice(0, 4)}.pdf"`,
        "Content-Length": String(body.length),
      },
    });

  } catch (error) {
    console.error("PDF Error:", error);
    return new NextResponse("Erreur lors de la génération du PDF", { status: 500 });
  }
}