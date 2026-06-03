import type { LedgerAccount } from "./adminStore";

const COMPANY = "PT. Renewa Green Energy";

function rp(juta: number): string {
  const full = juta * 1_000_000;
  if (full < 0) return `(${Math.abs(full).toLocaleString("id-ID")})`;
  return full.toLocaleString("id-ID");
}

function loadJsPDF(): Promise<{ jsPDF: typeof import("jspdf").jsPDF; autoTable: typeof import("jspdf-autotable").default }> {
  return Promise.all([
    import("jspdf").then(m => m.jsPDF),
    import("jspdf-autotable").then(m => m.default),
  ]).then(([jsPDF, autoTable]) => ({ jsPDF, autoTable }));
}

const TODAY = () => new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

/* ── Shared header drawer ──────────────────────────────── */
function drawHeader(doc: InstanceType<typeof import("jspdf").jsPDF>, title: string, subtitle: string) {
  const pageW = doc.internal.pageSize.getWidth();

  // Green accent bar at top
  doc.setFillColor(45, 122, 79);
  doc.rect(0, 0, pageW, 6, "F");

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(26, 34, 50);
  doc.text(COMPANY, 20, 18);

  // Report title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(26, 34, 50);
  doc.text(title, 20, 28);

  // Subtitle (period or date)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(105, 117, 134);
  doc.text(subtitle, 20, 36);

  // Print date (right aligned)
  doc.setFontSize(9);
  doc.text(`Dicetak: ${TODAY()}`, pageW - 20, 36, { align: "right" });

  // Divider
  doc.setDrawColor(228, 232, 242);
  doc.setLineWidth(0.5);
  doc.line(20, 40, pageW - 20, 40);

  return 48; // y position after header
}

/* ── Section builder ───────────────────────────────────── */
function drawSection(
  doc: InstanceType<typeof import("jspdf").jsPDF>,
  autoTable: typeof import("jspdf-autotable").default,
  y: number,
  title: string,
  titleColor: [number, number, number],
  items: LedgerAccount[],
  total: number,
  totalLabel: string,
): number {
  const pageW = doc.internal.pageSize.getWidth();

  // Section title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...titleColor);
  doc.text(title, 20, y);
  y += 5;

  autoTable(doc, {
    startY: y,
    margin: { left: 20, right: 20 },
    head: [],
    body: items.length === 0
      ? [["— Tidak ada transaksi —", ""]]
      : items.map(a => [a.name, `Rp ${rp(a.balance)}`]),
    styles: { fontSize: 10, cellPadding: { top: 3, bottom: 3, left: 4, right: 4 }, textColor: [26, 34, 50], lineColor: [228, 232, 242] },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { halign: "right", cellWidth: 50, font: "courier", textColor: titleColor },
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    tableLineColor: [228, 232, 242],
    tableLineWidth: 0.1,
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  // Total row
  const totalY = finalY + 2;
  doc.setFillColor(245, 247, 251);
  doc.rect(20, totalY, pageW - 40, 10, "F");
  doc.setDrawColor(...titleColor);
  doc.setLineWidth(0.4);
  doc.line(20, totalY, pageW - 20, totalY);
  doc.line(20, totalY + 10, pageW - 20, totalY + 10);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(26, 34, 50);
  doc.text(totalLabel, 24, totalY + 7);

  doc.setFont("courier", "bold");
  doc.setTextColor(...titleColor);
  doc.text(`Rp ${rp(total)}`, pageW - 24, totalY + 7, { align: "right" });

  return totalY + 18;
}

/* ── Page footer ───────────────────────────────────────── */
function drawFooter(doc: InstanceType<typeof import("jspdf").jsPDF>) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFillColor(45, 122, 79);
  doc.rect(0, pageH - 5, pageW, 5, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Dibuat dengan Renewa Admin — Data bersumber dari Jurnal Akuntansi", 20, pageH - 9);
  doc.text(`Halaman 1`, pageW - 20, pageH - 9, { align: "right" });
}

/* ═══════════════════════════════════════════════════════ */
/* ── Export Profit & Loss ──────────────────────────────── */
export async function exportProfitLoss(
  revenues: LedgerAccount[],
  expenses: LedgerAccount[],
  netIncome: number,
  period = `s/d ${TODAY()}`,
  orientation: "portrait" | "landscape" = "portrait",
) {
  const { jsPDF, autoTable } = await loadJsPDF();
  const doc = new jsPDF({ orientation, unit: "mm", format: "a4" });

  let y = drawHeader(doc, "Laporan Laba Rugi", `Periode: ${period}`);

  y = drawSection(doc, autoTable, y, "PENDAPATAN", [45, 122, 79], revenues, revenues.reduce((s, a) => s + a.balance, 0), "Total Pendapatan");
  y = drawSection(doc, autoTable, y, "BEBAN OPERASIONAL", [176, 104, 32], expenses, expenses.reduce((s, a) => s + a.balance, 0), "Total Beban");

  // Net Income box
  const pageW = doc.internal.pageSize.getWidth();
  const profitable = netIncome >= 0;
  const netColor: [number, number, number] = profitable ? [45, 122, 79] : [192, 60, 60];
  doc.setFillColor(profitable ? 235 : 255, profitable ? 245 : 240, profitable ? 238 : 240);
  doc.rect(20, y, pageW - 40, 14, "F");
  doc.setDrawColor(...netColor);
  doc.setLineWidth(0.5);
  doc.rect(20, y, pageW - 40, 14, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...netColor);
  doc.text(profitable ? "LABA BERSIH" : "RUGI BERSIH", 24, y + 9);

  doc.setFont("courier", "bold");
  doc.setFontSize(12);
  doc.text(`Rp ${rp(Math.abs(netIncome))}`, pageW - 24, y + 9, { align: "right" });

  drawFooter(doc);
  doc.save(`LaporanLabaRugi_${new Date().toISOString().slice(0, 10)}.pdf`);
}

/* ═══════════════════════════════════════════════════════ */
/* ── Export Balance Sheet ──────────────────────────────── */
export async function exportBalanceSheet(
  assets: LedgerAccount[],
  liabilities: LedgerAccount[],
  equities: LedgerAccount[],
  netIncome: number,
  asOf = TODAY(),
  orientation: "portrait" | "landscape" = "portrait",
) {
  const { jsPDF, autoTable } = await loadJsPDF();
  const doc = new jsPDF({ orientation, unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  let y = drawHeader(doc, "Neraca Keuangan", `Per Tanggal: ${asOf}`);

  const totalAsset     = assets.reduce((s, a) => s + a.balance, 0);
  const totalLiability = liabilities.reduce((s, a) => s + a.balance, 0);
  const totalEquity    = equities.reduce((s, a) => s + a.balance, 0);
  const totalLiabEq    = totalLiability + totalEquity + netIncome;

  /* ── AKTIVA ── */
  y = drawSection(doc, autoTable, y, "AKTIVA", [62, 124, 200], assets, totalAsset, "Total Aktiva");

  /* ── KEWAJIBAN ── */
  y = drawSection(doc, autoTable, y, "KEWAJIBAN", [192, 60, 60], liabilities, totalLiability, "Total Kewajiban");

  /* ── EKUITAS (add net income row) ── */
  const equityRows: LedgerAccount[] = [
    ...equities,
    ...(netIncome !== 0 ? [{ id: "__net__", code: "", name: netIncome >= 0 ? "Laba Periode Berjalan" : "Rugi Periode Berjalan", type: "equity" as const, normalBalance: "credit" as const, balance: netIncome, totalDebit: 0, totalCredit: 0 }] : []),
  ];
  y = drawSection(doc, autoTable, y, "EKUITAS", [112, 80, 192], equityRows, totalEquity + netIncome, "Total Ekuitas");

  /* ── Balance check ── */
  const balanced = Math.abs(totalAsset - totalLiabEq) < 0.001;
  const checkColor: [number, number, number] = balanced ? [45, 122, 79] : [192, 60, 60];
  doc.setFillColor(balanced ? 235 : 255, balanced ? 245 : 240, balanced ? 238 : 240);
  doc.rect(20, y, pageW - 40, 14, "F");
  doc.setDrawColor(...checkColor);
  doc.setLineWidth(0.5);
  doc.rect(20, y, pageW - 40, 14, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...checkColor);
  doc.text("TOTAL KEWAJIBAN + EKUITAS", 24, y + 9);
  doc.setFont("courier", "bold");
  doc.text(`Rp ${rp(totalLiabEq)}`, pageW - 24, y + 9, { align: "right" });

  drawFooter(doc);
  doc.save(`NeracaKeuangan_${new Date().toISOString().slice(0, 10)}.pdf`);
}
