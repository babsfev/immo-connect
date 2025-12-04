import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { formatCurrency } from "@/lib/utils";

async function fetchImage(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    return Buffer.from(buffer);
  } catch { return null; }
}

async function generateQRCode(text: string) {
  try { return await QRCode.toBuffer(text, { margin: 1, width: 100 }); } catch { return null; }
}

export async function generateReceiptPDF(payment: any): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    const agency = payment.lease.property.manager.agencySettings || {};
    const tenant = payment.tenant;
    const property = payment.lease.property;
    const datePaiement = new Date(payment.date).toLocaleDateString("fr-FR");
    const periode = new Date(payment.dueDate).toLocaleDateString("fr-FR", { month: 'long', year: 'numeric' });
    const ref = `QT-${payment.id.substring(0, 8).toUpperCase()}`;
    
    const totalPaid = payment.receivedAmount ?? payment.amount;
    const remaining = payment.amount - totalPaid;
    const isPartial = remaining > 100;

    // HEADER
    doc.rect(0, 0, 595.28, 120).fill(agency.primaryColor || "#2563EB");
    if (agency.logoUrl) {
       const logo = await fetchImage(agency.logoUrl);
       if (logo) try { doc.image(logo, 50, 30, { width: 60 }); } catch {}
    }
    doc.fillColor("white").fontSize(24).text(agency.companyName || "IMMO CONNECT", 50, 40);
    doc.fontSize(10).text(agency.address || "Adresse non renseignée", 50, 70);
    
    doc.fillColor("white").fontSize(30).text(isPartial ? "REÇU" : "QUITTANCE", 0, 40, { align: "right", width: 545 });
    doc.fontSize(12).text(`N° ${ref}`, 0, 75, { align: "right", width: 545 });

    // INFOS
    const startY = 150;
    doc.fillColor("black").fontSize(12).text(`LOCATAIRE : ${tenant.firstName} ${tenant.lastName}`, 50, startY);
    doc.text(`BIEN : ${property.title}`, 300, startY);

    // TABLEAU FINANCIER
    const rowY = 280;
    doc.fontSize(14).text(`Total Payé : ${formatCurrency(totalPaid)}`, 300, rowY);
    if (isPartial) doc.fillColor("red").fontSize(12).text(`Reste à payer : ${formatCurrency(remaining)}`, 300, rowY + 20);
    
    // SIGNATURE & QR
    const sigY = 600;
    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify/payment/${payment.id}`;
    const qr = await generateQRCode(verifyUrl);
    if (qr) doc.image(qr, 50, sigY, { width: 70 });
    
    if (agency.signatureUrl) {
       const sign = await fetchImage(agency.signatureUrl);
       if (sign) doc.image(sign, 400, sigY - 20, { width: 100 });
    }

    doc.end();
  });
}