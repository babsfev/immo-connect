export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getPaymentForReceipt } from "@/app/data/documents"; // On réutilise le même loader (mêmes données)
import { generateInvoicePDF } from "@/lib/pdf-invoice-generator";

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payment = await getPaymentForReceipt(id);

  if (!payment) {
    return new NextResponse("Document introuvable.", { status: 404 });
  }

  try {
    const pdfBuffer = await generateInvoicePDF(payment);

    return new NextResponse(pdfBuffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Avis_Echeance_${payment.id}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (error) {
    return new NextResponse("Erreur génération PDF", { status: 500 });
  }
}