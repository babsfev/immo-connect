import PDFDocument from "pdfkit";
import { formatCurrency } from "@/lib/utils";

// Helper Image
async function fetchImage(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    return Buffer.from(buffer);
  } catch { return null; }
}

export async function generateInvoicePDF(payment: any): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    // DONNÉES
    const agency = payment.lease.property.manager.agencySettings || {};
    const tenant = payment.tenant;
    const property = payment.lease.property;
    // Date d'émission = Date de création de la ligne de paiement (généralement le 1er du mois)
    const dateEmission = new Date(payment.createdAt).toLocaleDateString("fr-FR");
    const dateLimite = new Date(payment.dueDate).toLocaleDateString("fr-FR");
    const periode = new Date(payment.dueDate).toLocaleDateString("fr-FR", { month: 'long', year: 'numeric' });
    const ref = `AVIS-${payment.id.substring(0, 8).toUpperCase()}`;

    // --- 1. HEADER (Orange pour différencier de la Quittance Bleue) ---
    doc.rect(0, 0, 595.28, 120).fill("#F97316"); // Orange Immo-Connect
    
    if (agency.logoUrl) {
       const logoBuffer = await fetchImage(agency.logoUrl);
       if (logoBuffer) { try { doc.image(logoBuffer, 50, 30, { width: 60 }); } catch {} }
    }
    
    doc.fillColor("white")
       .fontSize(24).font("Helvetica-Bold").text(agency.companyName || "IMMO CONNECT", 50, 40, { align: "left" })
       .fontSize(10).font("Helvetica").text(agency.address || "Adresse non renseignée", 50, 70)
       .text(`${agency.email || ""} • ${agency.phone || ""}`, 50, 85);

    doc.fillColor("white")
       .fontSize(30).font("Helvetica-Bold").text("AVIS D'ÉCHÉANCE", 0, 40, { align: "right", width: 545 })
       .fontSize(12).text(`N° ${ref}`, 0, 75, { align: "right", width: 545 });

    // --- 2. DESTINATAIRE ---
    const startY = 150;
    doc.roundedRect(305, startY, 240, 100, 5).fillAndStroke("#F8FAFC", "#E2E8F0");
    doc.fillColor("#64748B").fontSize(9).font("Helvetica-Bold").text("DESTINATAIRE", 325, startY + 15);
    doc.fillColor("#0F172A").fontSize(12).text(`${tenant.firstName} ${tenant.lastName}`, 325, startY + 35);
    doc.fillColor("#475569").fontSize(10).font("Helvetica").text("Locataire principal", 325, startY + 55);
    
    // Info Gauche
    doc.fillColor("#0F172A").fontSize(10).text(`Date d'émission : ${dateEmission}`, 50, startY + 15);
    doc.text(`Période : ${periode}`, 50, startY + 30);
    doc.text(`Bien loué : ${property.title}`, 50, startY + 45);
    doc.text(property.address, 50, startY + 60);

    // --- 3. TABLEAU ---
    const tableY = 280;
    doc.rect(50, tableY, 495, 30).fill("#E2E8F0");
    doc.fillColor("#475569").fontSize(10).font("Helvetica-Bold");
    doc.text("DESCRIPTION", 60, tableY + 10);
    doc.text("MONTANT", 0, tableY + 10, { align: "right", width: 535 });

    const rowY = tableY + 40;
    doc.fillColor("#0F172A").font("Helvetica");
    doc.text(`Loyer & Charges - ${periode}`, 60, rowY);
    doc.font("Helvetica-Bold").text(formatCurrency(payment.amount), 0, rowY, { align: "right", width: 535 });
    doc.moveTo(50, rowY + 20).lineTo(545, rowY + 20).stroke("#E2E8F0");

    // --- 4. TOTAL À PAYER ---
    const totalY = rowY + 40;
    doc.fontSize(14).text("NET À PAYER", 300, totalY);
    doc.fontSize(16).fillColor("#F97316").text(formatCurrency(payment.amount), 0, totalY, { align: "right", width: 535 });

    doc.fontSize(10).fillColor("#EF4444").text(`Date limite de paiement : ${dateLimite}`, 300, totalY + 25, { align: "right", width: 535 });

    // --- 5. INSTRUCTIONS DE PAIEMENT ---
    const instructionsY = 550;
    doc.rect(50, instructionsY, 495, 100).fillAndStroke("#F1F5F9", "#E2E8F0");
    doc.fillColor("#0F172A").fontSize(10).font("Helvetica-Bold").text("MODALITÉS DE RÈGLEMENT", 70, instructionsY + 15);
    
    if (agency.paymentInstructions) {
        doc.font("Helvetica").fontSize(9).text(agency.paymentInstructions, 70, instructionsY + 35, { width: 450 });
    } else {
        doc.font("Helvetica").fontSize(9).text(
            "Merci de régler par Virement Bancaire, Chèque ou Mobile Money (Wave/OM).\n" +
            "Veuillez indiquer la référence " + ref + " dans le libellé de votre virement.",
            70, instructionsY + 35
        );
    }

    // --- 6. FOOTER ---
    const bottomY = 750;
    doc.moveTo(50, bottomY).lineTo(545, bottomY).stroke("#E2E8F0");
    doc.fontSize(8).fillColor("#94A3B8").text(
       `Avis d'échéance généré par Immo-Connect. Ceci n'est pas une quittance.`,
       50, bottomY + 10, { align: "center" }
    );

    doc.end();
  });
}