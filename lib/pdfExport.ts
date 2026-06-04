import type { LedgerAccount } from "./adminStore";

const COMPANY = "PT. Renewa Green Energy";

function rp(juta: number): string {
  const full = juta * 1_000_000;
  if (full < 0) return `(${Math.abs(full).toLocaleString("id-ID")})`;
  return full.toLocaleString("id-ID");
}

function statementNumber(juta: number): string {
  return (juta * 1_000_000).toLocaleString("id-ID");
}

function loadJsPDF(): Promise<{ jsPDF: typeof import("jspdf").jsPDF; autoTable: typeof import("jspdf-autotable").default }> {
  return Promise.all([
    import("jspdf").then(m => m.jsPDF),
    import("jspdf-autotable").then(m => m.default),
  ]).then(([jsPDF, autoTable]) => ({ jsPDF, autoTable }));
}

const TODAY = () => new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function periodRangeFromLabels(labels: string[]): string {
  const parsed = labels.map(label => {
    const match = label.match(/(Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des)\s+(\d{4})/);
    if (!match) return null;
    const map: Record<string, number> = { Jan:0, Feb:1, Mar:2, Apr:3, Mei:4, Jun:5, Jul:6, Agu:7, Sep:8, Okt:9, Nov:10, Des:11 };
    return { month: map[match[1]], year: Number(match[2]) };
  }).filter((v): v is { month: number; year: number } => !!v);
  if (parsed.length === 0) return labels.join(" | ");
  const sorted = parsed.sort((a, b) => a.year === b.year ? a.month - b.month : a.year - b.year);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  return `From Period ${MONTHS_EN[first.month]} ${first.year} until ${MONTHS_EN[last.month]} ${last.year}`;
}

export type PdfOrientation = "portrait" | "landscape";

export interface ProfitLossExportPeriod {
  label: string;
  revenues: LedgerAccount[];
  expenses: LedgerAccount[];
  totalRev: number;
  totalExp: number;
  net: number;
}

export interface BalanceSheetExportPeriod {
  label: string;
  assets: LedgerAccount[];
  liabilities: LedgerAccount[];
  equities: LedgerAccount[];
  net: number;
  totalAsset: number;
  totalLiab: number;
  totalEq: number;
  totalPassiva: number;
  balanced: boolean;
}

/* ── Shared header drawer ──────────────────────────────── */
function drawHeader(doc: InstanceType<typeof import("jspdf").jsPDF>, title: string, subtitle: string) {
  const pageW = doc.internal.pageSize.getWidth();

  doc.setFillColor(45, 122, 79);
  doc.rect(0, 0, pageW, 5, "F");

  doc.setFont("courier", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text(COMPANY, pageW / 2, 20, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(160, 0, 50);
  doc.text(title, pageW / 2, 30, { align: "center" });

  doc.setFont("courier", "bold");
  doc.setFontSize(10);
  doc.setTextColor(31, 41, 55);
  doc.text(subtitle, pageW / 2, 38, { align: "center" });

  return 47;
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
  doc.rect(0, pageH - 10, pageW, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("Dibuat oleh Dashboard Renewa Asia", 20, pageH - 4);
}

type StatementRowKind = "section" | "group" | "account" | "total" | "line";
type StatementRow = {
  kind: StatementRowKind;
  label: string;
  values?: number[];
};

function buildAccountRows(
  title: string,
  groupLabel: string | undefined,
  columns: string[],
  accountsByColumn: LedgerAccount[][],
  totals: number[],
  totalLabel: string,
): StatementRow[] {
  const ids = allAccountIds(accountsByColumn);
  const rows: StatementRow[] = title ? [{ kind: "section", label: title }] : [];
  if (groupLabel) rows.push({ kind: "group", label: groupLabel });
  if (ids.length === 0) {
    rows.push({ kind: "account", label: "Tidak ada transaksi", values: columns.map(() => 0) });
  } else {
    ids.forEach(id => {
      rows.push({ kind: "account", label: accountName(id, accountsByColumn), values: accountsByColumn.map(items => valueFor(id, items)) });
    });
  }
  rows.push({ kind: "total", label: totalLabel, values: totals });
  return rows;
}

function statementBodyRow(row: StatementRow, columnCount: number): any[] {
  if (row.kind === "section" || row.kind === "group") return [row.label, ...Array.from({ length: columnCount - 1 }, () => "")];

  const values = row.values ?? [];
  const total = values.reduce((sum, value) => sum + value, 0);
  return [
    row.label,
    ...values.map(statementNumber),
    statementNumber(total),
  ];
}

function drawStatementTable(
  doc: InstanceType<typeof import("jspdf").jsPDF>,
  autoTable: typeof import("jspdf-autotable").default,
  startY: number,
  columns: string[],
  rows: StatementRow[],
) {
  const pageW = doc.internal.pageSize.getWidth();
  const columnCount = columns.length + 2;
  const usableW = pageW - 40;
  const descWidth = Math.min(38, Math.max(30, usableW * 0.16));
  const totalWidth = Math.min(26, Math.max(20, usableW * 0.1));
  const valueWidth = Math.max(13, (usableW - descWidth - totalWidth) / Math.max(columns.length, 1));
  const manyColumns = columns.length >= 8;
  const valueFontSize = manyColumns ? 4.8 : 6.8;

  const columnStyles: Record<number, Record<string, unknown>> = {
    0: { cellWidth: descWidth, halign: "left", font: "helvetica" },
    [columnCount - 1]: { cellWidth: totalWidth, halign: "right", font: "courier" },
  };
  columns.forEach((_, idx) => {
    columnStyles[idx + 1] = { cellWidth: valueWidth, halign: "right", font: "courier" };
  });

  autoTable(doc, {
    theme: "plain",
    startY,
    margin: { left: 20, right: 20, bottom: 16 },
    tableWidth: usableW,
    head: [["Description", ...columns, "Total"]],
    body: rows.map(row => statementBodyRow(row, columnCount)),
    styles: {
      fontSize: valueFontSize,
      overflow: "hidden",
      cellPadding: { top: 1.6, bottom: 1.6, left: 1.1, right: 1.1 },
      textColor: [17, 24, 39],
      lineColor: [238, 241, 246],
      lineWidth: 0,
      fontStyle: "bold",
      minCellHeight: 4.2,
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [15, 59, 104],
      fontStyle: "bold",
      lineColor: [17, 24, 39],
      lineWidth: { bottom: 0.25, top: 0, left: 0, right: 0 },
      fontSize: manyColumns ? 6.2 : 7.4,
      cellPadding: { top: 2, bottom: 2.5, left: 1.1, right: 1.1 },
    },
    columnStyles,
    didParseCell: data => {
      if (data.section !== "body") return;
      const row = rows[data.row.index];
      if (!row) return;

      if (row.kind === "section") {
        data.cell.styles.font = "helvetica";
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fontSize = 7.8;
        data.cell.styles.textColor = [15, 23, 42];
        data.cell.styles.fillColor = [255, 255, 255];
        data.cell.styles.lineColor = [238, 241, 246];
        data.cell.styles.lineWidth = { bottom: 0.08, top: 0, left: 0, right: 0 };
        data.cell.styles.cellPadding = { top: 3.2, bottom: 2, left: data.column.index === 0 ? 3.8 : 0, right: 0 };
      }

      if (row.kind === "group") {
        data.cell.styles.font = "helvetica";
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fontSize = 6.4;
        data.cell.styles.textColor = [17, 24, 39];
        data.cell.styles.fillColor = [255, 255, 255];
        data.cell.styles.cellPadding = { top: 2.4, bottom: 1.2, left: data.column.index === 0 ? 6 : 0, right: 0 };
      }

      if (row.kind === "account" && data.column.index === 0) {
        data.cell.styles.font = "helvetica";
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fontSize = manyColumns ? 5.8 : 6.8;
        data.cell.styles.cellPadding = { top: 1.7, bottom: 1.7, left: 8, right: 1.1 };
      }

      if (row.kind === "account" && data.column.index > 0) {
        data.cell.styles.fontSize = valueFontSize;
      }

      if (row.kind === "total") {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = [250, 251, 253];
        data.cell.styles.lineColor = [17, 24, 39];
        data.cell.styles.lineWidth = { top: 0.25, bottom: 0.12, left: 0, right: 0 };
        data.cell.styles.fontSize = data.column.index === 0 ? (manyColumns ? 6 : 7) : valueFontSize;
      }

      if (row.kind === "line") {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fontSize = data.column.index === 0 ? (manyColumns ? 6.2 : 7.4) : valueFontSize;
        data.cell.styles.cellPadding = { top: 2.8, bottom: 2.2, left: 1.1, right: 1.1 };
        if (data.column.index > 0) {
          const value = row.values?.[data.column.index - 1] ?? row.values?.reduce((sum, item) => sum + item, 0) ?? 0;
          data.cell.styles.textColor = value >= 0 ? [45, 122, 79] : [192, 60, 60];
        }
      }
    },
    didDrawCell: data => {
      if (data.section !== "body") return;
      const row = rows[data.row.index];
      if (row?.kind !== "section" || data.column.index !== 0) return;
      doc.setFillColor(45, 122, 79);
      doc.roundedRect(data.cell.x + 1, data.cell.y + 3.1, 0.7, 3.2, 0.35, 0.35, "F");
    },
    didDrawPage: () => drawFooter(doc),
  });
}

function allAccountIds(periods: LedgerAccount[][]): string[] {
  return [...new Set(periods.flatMap(items => items.filter(a => a.balance !== 0).map(a => a.id)))];
}

function accountName(id: string, periods: LedgerAccount[][]): string {
  return periods.flat().find(a => a.id === id)?.name ?? id;
}

function valueFor(id: string, items: LedgerAccount[]): number {
  return items.find(a => a.id === id)?.balance ?? 0;
}

function isOtherIncomeAccount(account: LedgerAccount): boolean {
  const name = account.name.toLowerCase();
  return /(other|lain|interest|bunga|bank|gain|keuntungan)/i.test(name);
}

function isOtherExpenseAccount(account: LedgerAccount): boolean {
  const name = account.name.toLowerCase();
  return /(other|lain|bank|tax|pajak|loan|pinjaman|provision|interest|bunga|admin fee)/i.test(name);
}

function drawMultiTotalLine(
  doc: InstanceType<typeof import("jspdf").jsPDF>,
  autoTable: typeof import("jspdf-autotable").default,
  y: number,
  label: string,
  periods: { label: string; value: number }[],
): number {
  autoTable(doc, {
    startY: y,
    margin: { left: 20, right: 20 },
    body: [[label, ...periods.map(p => `Rp ${rp(p.value)}`), `Rp ${rp(periods.reduce((sum, p) => sum + p.value, 0))}`]],
    styles: { fontSize: 8.5, cellPadding: { top: 2.8, bottom: 2.8, left: 3, right: 3 }, textColor: [26, 34, 50], lineColor: [228, 232, 242], fontStyle: "bold" },
    columnStyles: Object.fromEntries(periods.map((_, i) => [i + 1, { halign: "right", font: "courier" }])),
  });
  return (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
}

function drawMultiAccountSection(
  doc: InstanceType<typeof import("jspdf").jsPDF>,
  autoTable: typeof import("jspdf-autotable").default,
  y: number,
  title: string,
  titleColor: [number, number, number],
  periods: { label: string; items: LedgerAccount[]; total: number }[],
  totalLabel: string,
): number {
  const ids = allAccountIds(periods.map(p => p.items));
  const head = [["Akun", ...periods.map(p => p.label)]];
  const body = ids.length === 0
    ? [["— Tidak ada transaksi —", ...periods.map(() => "")]]
    : ids.map(id => [accountName(id, periods.map(p => p.items)), ...periods.map(p => valueFor(id, p.items) === 0 ? "—" : `Rp ${rp(valueFor(id, p.items))}`)]);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...titleColor);
  doc.text(title, 20, y);

  autoTable(doc, {
    startY: y + 4,
    margin: { left: 20, right: 20 },
    head,
    body: [
      ...body,
      [totalLabel, ...periods.map(p => `Rp ${rp(p.total)}`)],
    ],
    styles: { fontSize: 8.5, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 }, textColor: [26, 34, 50], lineColor: [228, 232, 242] },
    headStyles: { fillColor: [245, 247, 251], textColor: [26, 34, 50], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [250, 251, 253] },
    columnStyles: Object.fromEntries(periods.map((_, i) => [i + 1, { halign: "right", font: "courier", textColor: titleColor }])),
    didParseCell: data => {
      if (data.section === "body" && data.row.index === body.length) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = [245, 247, 251];
      }
    },
  });

  return (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
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

export async function exportProfitLossMulti(
  periods: ProfitLossExportPeriod[],
  orientation: PdfOrientation = "landscape",
) {
  const { jsPDF, autoTable } = await loadJsPDF();
  const doc = new jsPDF({ orientation, unit: "mm", format: "a4" });
  const subtitle = periodRangeFromLabels(periods.map(p => p.label));
  let y = drawHeader(doc, periods.length === 1 ? "Profit/Loss (Monthly)" : "Profit/Loss (Multi Period)", subtitle);

  const operatingRevenue = periods.map(p => p.revenues.filter(a => !isOtherIncomeAccount(a)));
  const otherIncome = periods.map(p => p.revenues.filter(isOtherIncomeAccount));
  const operatingExpense = periods.map(p => p.expenses.filter(a => !isOtherExpenseAccount(a)));
  const otherExpense = periods.map(p => p.expenses.filter(isOtherExpenseAccount));
  const sumAccounts = (items: LedgerAccount[]) => items.reduce((sum, account) => sum + account.balance, 0);
  const operatingRevenueTotals = operatingRevenue.map(sumAccounts);
  const otherIncomeTotals = otherIncome.map(sumAccounts);
  const operatingExpenseTotals = operatingExpense.map(sumAccounts);
  const otherExpenseTotals = otherExpense.map(sumAccounts);
  const columns = periods.map(p => p.label);
  const rows: StatementRow[] = [
    ...buildAccountRows("REVENUE", "Pendapatan Operasional", columns, operatingRevenue, operatingRevenueTotals, "Total REVENUE"),
    ...buildAccountRows("OPERATING EXPENSES", "Beban Operasional", columns, operatingExpense, operatingExpenseTotals, "Total OPERATING EXPENSES"),
    { kind: "line", label: "OPERATING REVENUE", values: periods.map((_, i) => operatingRevenueTotals[i] - operatingExpenseTotals[i]) },
    ...buildAccountRows("OTHER INCOME and EXPENSES", "Other Income", columns, otherIncome, otherIncomeTotals, "Total Other Income"),
    ...buildAccountRows("", "Other Expenses", columns, otherExpense, otherExpenseTotals, "Total Other Expenses"),
    { kind: "line", label: "Total OTHER INCOME and EXPENSES", values: periods.map((_, i) => otherIncomeTotals[i] - otherExpenseTotals[i]) },
    { kind: "line", label: "NET PROFIT / LOSS", values: periods.map(p => p.net) },
  ];

  drawStatementTable(doc, autoTable, y, columns, rows);

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

export async function exportBalanceSheetMulti(
  periods: BalanceSheetExportPeriod[],
  orientation: PdfOrientation = "landscape",
) {
  const { jsPDF, autoTable } = await loadJsPDF();
  const doc = new jsPDF({ orientation, unit: "mm", format: "a4" });
  const subtitle = periodRangeFromLabels(periods.map(p => p.label));
  let y = drawHeader(doc, periods.length === 1 ? "Balance Sheet (Monthly)" : "Balance Sheet (Multi Period)", subtitle);
  const columns = periods.map(p => p.label);
  const equityRowsByPeriod = periods.map(p => [
    ...p.equities,
    ...(p.net !== 0 ? [{ id: "__net__", code: "", name: p.net >= 0 ? "Laba Periode Berjalan" : "Rugi Periode Berjalan", type: "equity" as const, normalBalance: "credit" as const, balance: p.net, totalDebit: 0, totalCredit: 0 }] : []),
  ]);
  const equityTotals = periods.map(p => p.totalEq + p.net);
  const rows: StatementRow[] = [
    ...buildAccountRows("ASSETS", "Aktiva", columns, periods.map(p => p.assets), periods.map(p => p.totalAsset), "Total ASSETS"),
    ...buildAccountRows("LIABILITIES", "Kewajiban", columns, periods.map(p => p.liabilities), periods.map(p => p.totalLiab), "Total LIABILITIES"),
    ...buildAccountRows("EQUITY", "Ekuitas", columns, equityRowsByPeriod, equityTotals, "Total EQUITY"),
    { kind: "line", label: "TOTAL LIABILITIES + EQUITY", values: periods.map(p => p.totalPassiva) },
  ];

  drawStatementTable(doc, autoTable, y, columns, rows);

  doc.save(`NeracaKeuangan_${new Date().toISOString().slice(0, 10)}.pdf`);
}
