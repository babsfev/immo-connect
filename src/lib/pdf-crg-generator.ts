import PDFDocument from "pdfkit";
import { formatCurrency } from "@/lib/utils";

async function fetchImage(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    return Buffer.from(buffer);
  } catch { return null; }
}

export async function generateCRGPDF(data: any, agencySettings: any): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    const monthName = new Date(data.period.year, data.period.month).toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

    // --- HEADER ---
    doc.rect(0, 0, 600, 100).fill("#1E293B"); // Fond sombre pro
    
    if (agencySettings?.logoUrl) {
        const logo = await fetchImage(agencySettings.logoUrl);
        if (logo) try { doc.image(logo, 40, 30, { width: 50 }); } catch {}
    }
    
    doc.fillColor("white")
       .fontSize(20).font("Helvetica-Bold").text("COMPTE RENDU DE GESTION", 100, 35)
       .fontSize(10).font("Helvetica").text(`Période : ${monthName}`, 100, 60);

    doc.fontSize(10).text(agencySettings?.companyName || "IMMO CONNECT", 400, 35, { align: "right" })
       .text(agencySettings?.address || "Siège Social", 400, 50, { align: "right" });

    // --- SYNTHÈSE ---
    const startY = 130;
    doc.fillColor("black").font("Helvetica-Bold").fontSize(14).text("SYNTHÈSE FINANCIÈRE", 40, startY);
    
    // Cadre Net à payer
    doc.roundedRect(350, startY - 10, 200, 50, 5).fillAndStroke("#DCFCE7", "#166534");
    doc.fillColor("#166534").fontSize(10).text("NET À VERSER AU PROPRIÉTAIRE", 370, startY + 5);
    doc.fontSize(18).text(formatCurrency(data.totals.netBalance), 370, startY + 20);

    // --- TABLEAU DÉTAILLÉ ---
    let y = startY + 70;
    
    // En-têtes
    doc.rect(40, y, 515, 25).fill("#F1F5F9");
    doc.fillColor("#475569").fontSize(9).font("Helvetica-Bold");
    doc.text("DATE", 50, y + 8);
    doc.text("LIBELLÉ", 120, y + 8);
    doc.text("DÉBIT (Sorties)", 350, y + 8, { align: "right", width: 80 });
    doc.text("CRÉDIT (Entrées)", 450, y + 8, { align: "right", width: 80 });
    
    y += 30;

    // 1. LES ENTRÉES
    doc.font("Helvetica");
    data.incomes.forEach((item: any) => {
        const date = new Date(item.date).toLocaleDateString('fr-FR');
        doc.fillColor("black").text(date, 50, y);
        doc.text(item.label, 120, y);
        doc.fillColor("#166534").text(`+ ${formatCurrency(item.amount)}`, 450, y, { align: "right", width: 80 });
        
        doc.moveTo(40, y + 15).lineTo(555, y + 15).strokeColor("#E2E8F0").stroke();
        y += 25;
    });

    // 2. LES SORTIES
    data.expenses.forEach((item: any) => {
        const date = new Date(item.date).toLocaleDateString('fr-FR');
        doc.fillColor("black").text(date, 50, y);
        doc.text(item.label, 120, y);
        doc.fillColor("#DC2626").text(`- ${formatCurrency(item.amount)}`, 350, y, { align: "right", width: 80 });
        
        doc.moveTo(40, y + 15).lineTo(555, y + 15).strokeColor("#E2E8F0").stroke();
        y += 25;
    });

    // 3. HONORAIRES AGENCE
    doc.fillColor("black").text(new Date().toLocaleDateString('fr-FR'), 50, y);
    doc.text(data.fees.label, 120, y);
    doc.fillColor("#DC2626").text(`- ${formatCurrency(data.fees.amount)}`, 350, y, { align: "right", width: 80 });
    
    y += 40;

    // --- TOTAUX ---
    doc.rect(350, y, 205, 30).fill("#F8FAFC");
    doc.fillColor("black").font("Helvetica-Bold").text("TOTAL", 360, y + 10);
    doc.text(formatCurrency(data.totals.totalExpense + data.fees.amount), 350, y + 10, { align: "right", width: 80 });
    doc.text(formatCurrency(data.totals.totalIncome), 450, y + 10, { align: "right", width: 80 });

    doc.end();
  });
}