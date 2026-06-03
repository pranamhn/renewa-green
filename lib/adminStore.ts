export const ADMIN_EMAIL = "admin@renewa.asia";
export const ADMIN_PASSWORD = "Renewa2026!";
export const AUTH_KEY = "renewa_admin_auth";
export const SUBMISSIONS_KEY = "renewa_submissions";
export const NEWS_KEY = "renewa_news";
export const JOBS_KEY = "renewa_jobs";

/* ─── Form Submission types ──────────────────────────── */
export type FormType =
  | "contact"
  | "schedule-meeting"
  | "apply-partnership"
  | "register-product"
  | "apply-ev-credit"
  | "register-vehicle"
  | "buy-carbon-credit";

export const FORM_LABELS: Record<FormType, string> = {
  "contact": "Contact Us",
  "schedule-meeting": "Jadwalkan Pertemuan",
  "apply-partnership": "Ajukan Kemitraan",
  "register-product": "Daftarkan Produk",
  "apply-ev-credit": "Ajukan Kredit EV",
  "register-vehicle": "Registrasi Kendaraan",
  "buy-carbon-credit": "Beli Carbon Credit",
};

export const FORM_COLORS: Record<FormType, string> = {
  "contact": "#B8F53A",
  "schedule-meeting": "#5DD6A0",
  "apply-partnership": "#60C4F8",
  "register-product": "#F8C660",
  "apply-ev-credit": "#C060F8",
  "register-vehicle": "#F86060",
  "buy-carbon-credit": "#60F8D6",
};

export interface FormSubmission {
  id: string;
  formType: FormType;
  refId: string;
  date: string;
  primaryName: string;
  primaryEmail: string;
  data: Record<string, string>;
}

export function getSubmissions(): FormSubmission[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || "[]"); }
  catch { return []; }
}

export function saveFormSubmission(
  formType: FormType,
  refId: string,
  data: Record<string, string>
): void {
  const all = getSubmissions();
  const primaryName = data.name || data.picName || data.companyName || data.company || data.contact || "—";
  const primaryEmail = data.email || "—";
  all.unshift({
    id: Date.now().toString(),
    formType,
    refId,
    primaryName,
    primaryEmail,
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    data,
  });
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(all));
}

/* ─── Auth ──────────────────────────────────────────── */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function login(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

/* ─── Admin News ─────────────────────────────────────── */
export interface AdminArticle {
  id: string;
  slug: string;
  category: { id: string; en: string };
  tag: "news" | "insight" | "featured";
  date: string;
  readTime: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  body: { type: "paragraph"; text: { id: string; en: string } }[];
  published: boolean;
  source: "admin";
}

export function getAdminNews(): AdminArticle[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(NEWS_KEY) || "[]"); }
  catch { return []; }
}

export function saveAdminArticle(a: AdminArticle): void {
  const all = getAdminNews();
  const idx = all.findIndex((x) => x.id === a.id);
  if (idx >= 0) all[idx] = a; else all.unshift(a);
  localStorage.setItem(NEWS_KEY, JSON.stringify(all));
}

export function deleteAdminArticle(id: string): void {
  localStorage.setItem(NEWS_KEY, JSON.stringify(getAdminNews().filter((a) => a.id !== id)));
}

/* ─── Admin Jobs ─────────────────────────────────────── */
export interface AdminJob {
  id: string;
  dept: { id: string; en: string };
  title: string;
  type: { id: string; en: string };
  level: { id: string; en: string };
  location: string;
  desc: { id: string; en: string };
  skills: string[];
  active: boolean;
  source: "admin";
}

export function getAdminJobs(): AdminJob[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(JOBS_KEY) || "[]"); }
  catch { return []; }
}

export function saveAdminJob(j: AdminJob): void {
  const all = getAdminJobs();
  const idx = all.findIndex((x) => x.id === j.id);
  if (idx >= 0) all[idx] = j; else all.unshift(j);
  localStorage.setItem(JOBS_KEY, JSON.stringify(all));
}

export function deleteAdminJob(id: string): void {
  localStorage.setItem(JOBS_KEY, JSON.stringify(getAdminJobs().filter((j) => j.id !== id)));
}

/* ─── Investors ──────────────────────────────────────── */
export const INVESTORS_KEY = "renewa_investors";
export const FINANCE_KEY = "renewa_finance";

export type InvestorType = "angel" | "vc" | "strategic" | "government";
export type InvestorStatus = "disbursed" | "committed" | "pending";

export interface InvestorRecord {
  id: string;
  name: string;
  company: string;
  type: InvestorType;
  round: string;
  amountM: number;   // Rp juta
  equity: number;    // %
  date: string;
  status: InvestorStatus;
  notes?: string;
}

export interface FinanceSnapshot {
  totalRaisedM: number;
  monthlyBurnM: number;
  valuationB: number;
  lastUpdated: string;
}

const SEED_INVESTORS: InvestorRecord[] = [
  { id: "inv1", name: "Hendry Donald", company: "Renewa Asia", type: "angel", round: "Pre-Seed", amountM: 500, equity: 5, date: "Jan 2025", status: "disbursed", notes: "Co-founder contribution" },
  { id: "inv2", name: "Zaki Umaro", company: "Renewa Asia", type: "angel", round: "Pre-Seed", amountM: 250, equity: 2.5, date: "Jan 2025", status: "disbursed", notes: "Co-founder contribution" },
  { id: "inv3", name: "Angel Investor", company: "—", type: "angel", round: "Pre-Seed", amountM: 1250, equity: 7.5, date: "Feb 2025", status: "disbursed" },
  { id: "inv4", name: "EV Ventures Fund", company: "EV Ventures", type: "vc", round: "Seed", amountM: 10000, equity: 15, date: "Agu 2025", status: "disbursed" },
  { id: "inv5", name: "Strategic Partner A", company: "Mitra Strategis", type: "strategic", round: "Seed Ext.", amountM: 5000, equity: 5, date: "Des 2025", status: "committed" },
];

const DEFAULT_FINANCE: FinanceSnapshot = {
  totalRaisedM: 17000,
  monthlyBurnM: 850,
  valuationB: 85,
  lastUpdated: "Mei 2026",
};

export function getInvestors(): InvestorRecord[] {
  if (typeof window === "undefined") return SEED_INVESTORS;
  try {
    const stored = localStorage.getItem(INVESTORS_KEY);
    return stored ? JSON.parse(stored) : SEED_INVESTORS;
  } catch { return SEED_INVESTORS; }
}

export function saveInvestor(inv: InvestorRecord): void {
  const all = getInvestors();
  const idx = all.findIndex(x => x.id === inv.id);
  if (idx >= 0) all[idx] = inv; else all.push(inv);
  localStorage.setItem(INVESTORS_KEY, JSON.stringify(all));
}

export function deleteInvestor(id: string): void {
  localStorage.setItem(INVESTORS_KEY, JSON.stringify(getInvestors().filter(i => i.id !== id)));
}

export function getFinanceSnapshot(): FinanceSnapshot {
  if (typeof window === "undefined") return DEFAULT_FINANCE;
  try {
    const stored = localStorage.getItem(FINANCE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_FINANCE;
  } catch { return DEFAULT_FINANCE; }
}

export function saveFinanceSnapshot(f: FinanceSnapshot): void {
  localStorage.setItem(FINANCE_KEY, JSON.stringify(f));
}

/* ─── Fund Entries (Dana Masuk) ──────────────────────── */
export const FUND_ENTRIES_KEY = "renewa_fund_entries";

export interface FundEntry {
  id: string;
  from: string;
  amountM: number;  // Rp juta
  date: string;     // e.g. "15 Jan 2025"
  round: string;
  notes?: string;
}

const SEED_FUND_ENTRIES: FundEntry[] = [
  { id: "fe1", from: "Hendry Donald", amountM: 500,   date: "10 Jan 2025", round: "Pre-Seed", notes: "Co-founder contribution" },
  { id: "fe2", from: "Zaki Umaro",    amountM: 250,   date: "10 Jan 2025", round: "Pre-Seed", notes: "Co-founder contribution" },
  { id: "fe3", from: "Angel Investor",amountM: 1250,  date: "20 Feb 2025", round: "Pre-Seed" },
  { id: "fe4", from: "EV Ventures Fund", amountM: 10000, date: "5 Agu 2025", round: "Seed" },
];

export function getFundEntries(): FundEntry[] {
  if (typeof window === "undefined") return SEED_FUND_ENTRIES;
  try {
    const stored = localStorage.getItem(FUND_ENTRIES_KEY);
    return stored ? JSON.parse(stored) : SEED_FUND_ENTRIES;
  } catch { return SEED_FUND_ENTRIES; }
}

export function saveFundEntry(entry: FundEntry): void {
  const all = getFundEntries();
  const idx = all.findIndex(x => x.id === entry.id);
  if (idx >= 0) all[idx] = entry; else all.unshift(entry);
  localStorage.setItem(FUND_ENTRIES_KEY, JSON.stringify(all));
}

export function deleteFundEntry(id: string): void {
  localStorage.setItem(FUND_ENTRIES_KEY, JSON.stringify(getFundEntries().filter(e => e.id !== id)));
}

/* ─── Chart of Accounts ──────────────────────────────── */
export const ACCOUNTS_KEY = "renewa_accounts";
export const JOURNAL_KEY  = "renewa_journal";

export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export interface ChartAccount {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  normalBalance: "debit" | "credit";
  parentId?: string;
}

export interface JournalLine {
  accountId: string;
  debit: number;   // Rp juta
  credit: number;  // Rp juta
}

export interface JournalEntry {
  id: string;
  ref: string;
  date: string;
  description: string;
  lines: JournalLine[];
  contactId?: string;  // vendor or customer id
}

/* ─── Vendors / Customers ────────────────────────────── */
export const VENDORS_KEY = "renewa_vendors";

export type ContactType = "vendor" | "customer" | "both";

export interface VendorRecord {
  id: string;
  code: string;
  name: string;
  type: ContactType;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

const DEFAULT_VENDORS: VendorRecord[] = [];

export function getVendors(): VendorRecord[] {
  if (typeof window === "undefined") return DEFAULT_VENDORS;
  try {
    const s = localStorage.getItem(VENDORS_KEY);
    return s ? JSON.parse(s) : DEFAULT_VENDORS;
  } catch { return DEFAULT_VENDORS; }
}

export function saveVendor(v: VendorRecord): void {
  const all = getVendors();
  const idx = all.findIndex(x => x.id === v.id);
  if (idx >= 0) all[idx] = v; else all.push(v);
  localStorage.setItem(VENDORS_KEY, JSON.stringify(all));
}

export function deleteVendor(id: string): void {
  localStorage.setItem(VENDORS_KEY, JSON.stringify(getVendors().filter(v => v.id !== id)));
}

const DEFAULT_ACCOUNTS: ChartAccount[] = [
  // Assets
  { id: "a01", code: "1-1100", name: "Kas",                       type: "asset",     normalBalance: "debit" },
  { id: "a02", code: "1-1110", name: "Bank BCA",                  type: "asset",     normalBalance: "debit" },
  { id: "a03", code: "1-1120", name: "Bank Mandiri",              type: "asset",     normalBalance: "debit" },
  { id: "a04", code: "1-1200", name: "Piutang Usaha",             type: "asset",     normalBalance: "debit" },
  { id: "a05", code: "1-1300", name: "Biaya Dibayar Dimuka",      type: "asset",     normalBalance: "debit" },
  { id: "a06", code: "1-2100", name: "Peralatan & Teknologi IT",  type: "asset",     normalBalance: "debit" },
  { id: "a07", code: "1-2110", name: "Akm. Penyusutan Peralatan", type: "asset",     normalBalance: "credit" },
  // Liabilities
  { id: "l01", code: "2-1100", name: "Utang Usaha",               type: "liability", normalBalance: "credit" },
  { id: "l02", code: "2-1200", name: "Utang Gaji",                type: "liability", normalBalance: "credit" },
  { id: "l03", code: "2-1300", name: "Utang Pajak",               type: "liability", normalBalance: "credit" },
  { id: "l04", code: "2-2100", name: "Pinjaman Bank",             type: "liability", normalBalance: "credit" },
  // Equity
  { id: "e01", code: "3-1100", name: "Modal Disetor",             type: "equity",    normalBalance: "credit" },
  { id: "e02", code: "3-1200", name: "Agio Saham",                type: "equity",    normalBalance: "credit" },
  { id: "e03", code: "3-1300", name: "Laba Ditahan",              type: "equity",    normalBalance: "credit" },
  // Revenue
  { id: "r01", code: "4-1100", name: "Pendapatan Kredit EV",      type: "revenue",   normalBalance: "credit" },
  { id: "r02", code: "4-1200", name: "Pendapatan Carbon Credit",  type: "revenue",   normalBalance: "credit" },
  { id: "r03", code: "4-1300", name: "Pendapatan Kemitraan",      type: "revenue",   normalBalance: "credit" },
  { id: "r04", code: "4-1400", name: "Pendapatan Konsultasi",     type: "revenue",   normalBalance: "credit" },
  { id: "r05", code: "4-9900", name: "Pendapatan Lain-lain",      type: "revenue",   normalBalance: "credit" },
  // Expenses
  { id: "x01", code: "5-1100", name: "Beban Gaji",                type: "expense",   normalBalance: "debit" },
  { id: "x02", code: "5-1200", name: "Beban Sewa",                type: "expense",   normalBalance: "debit" },
  { id: "x03", code: "5-1300", name: "Beban Operasional",         type: "expense",   normalBalance: "debit" },
  { id: "x04", code: "5-1400", name: "Beban Pemasaran",           type: "expense",   normalBalance: "debit" },
  { id: "x05", code: "5-1500", name: "Beban Teknologi",           type: "expense",   normalBalance: "debit" },
  { id: "x06", code: "5-1600", name: "Beban Perjalanan",          type: "expense",   normalBalance: "debit" },
  { id: "x07", code: "5-1700", name: "Beban Administrasi",        type: "expense",   normalBalance: "debit" },
  { id: "x08", code: "5-2100", name: "Beban Bunga",               type: "expense",   normalBalance: "debit" },
  { id: "x09", code: "5-2200", name: "Beban Penyusutan",          type: "expense",   normalBalance: "debit" },
  { id: "x10", code: "5-9900", name: "Beban Lain-lain",           type: "expense",   normalBalance: "debit" },
];

const SEED_JOURNAL: JournalEntry[] = [
  {
    id: "je01", ref: "JE-2026-001", date: "10 Jan 2026",
    description: "Setoran modal Hendry Donald (co-founder)",
    lines: [
      { accountId: "a02", debit: 500,   credit: 0   },
      { accountId: "e01", debit: 0,     credit: 500 },
    ],
  },
  {
    id: "je02", ref: "JE-2026-002", date: "10 Jan 2026",
    description: "Setoran modal Zaki Umaro (co-founder)",
    lines: [
      { accountId: "a02", debit: 250,   credit: 0   },
      { accountId: "e01", debit: 0,     credit: 250 },
    ],
  },
  {
    id: "je03", ref: "JE-2026-003", date: "20 Feb 2026",
    description: "Investasi Angel Investor (Pre-Seed)",
    lines: [
      { accountId: "a02", debit: 1250,  credit: 0    },
      { accountId: "e01", debit: 0,     credit: 1250 },
    ],
  },
  {
    id: "je04", ref: "JE-2026-004", date: "5 Agu 2026",
    description: "Investasi EV Ventures Fund (Seed)",
    lines: [
      { accountId: "a03", debit: 10000, credit: 0     },
      { accountId: "e01", debit: 0,     credit: 10000 },
    ],
  },
  {
    id: "je05", ref: "JE-2026-005", date: "31 Jan 2026",
    description: "Beban operasional Januari 2026",
    lines: [
      { accountId: "x01", debit: 350, credit: 0   },
      { accountId: "x02", debit: 50,  credit: 0   },
      { accountId: "x05", debit: 80,  credit: 0   },
      { accountId: "x07", debit: 30,  credit: 0   },
      { accountId: "a02", debit: 0,   credit: 510 },
    ],
  },
  {
    id: "je06", ref: "JE-2026-006", date: "28 Feb 2026",
    description: "Beban operasional Februari 2026",
    lines: [
      { accountId: "x01", debit: 350, credit: 0   },
      { accountId: "x02", debit: 50,  credit: 0   },
      { accountId: "x05", debit: 80,  credit: 0   },
      { accountId: "x07", debit: 30,  credit: 0   },
      { accountId: "a02", debit: 0,   credit: 510 },
    ],
  },
  {
    id: "je07", ref: "JE-2026-007", date: "15 Mar 2026",
    description: "Pendapatan Credit Connect — batch perdana",
    lines: [
      { accountId: "a02", debit: 150, credit: 0   },
      { accountId: "r01", debit: 0,   credit: 150 },
    ],
  },
  {
    id: "je08", ref: "JE-2026-008", date: "22 Mar 2026",
    description: "Beban pemasaran — acara peluncuran",
    lines: [
      { accountId: "x04", debit: 75, credit: 0  },
      { accountId: "a02", debit: 0,  credit: 75 },
    ],
  },
  {
    id: "je09", ref: "JE-2026-009", date: "10 Apr 2026",
    description: "Pendapatan Carbon Credit — MOU IDX Carbon",
    lines: [
      { accountId: "a02", debit: 85, credit: 0  },
      { accountId: "r02", debit: 0,  credit: 85 },
    ],
  },
  {
    id: "je10", ref: "JE-2026-010", date: "31 Mei 2026",
    description: "Beban operasional Mei 2026",
    lines: [
      { accountId: "x01", debit: 350, credit: 0   },
      { accountId: "x02", debit: 50,  credit: 0   },
      { accountId: "x03", debit: 120, credit: 0   },
      { accountId: "x04", debit: 80,  credit: 0   },
      { accountId: "x05", debit: 80,  credit: 0   },
      { accountId: "x07", debit: 40,  credit: 0   },
      { accountId: "a02", debit: 0,   credit: 720 },
    ],
  },
];

export function getChartAccounts(): ChartAccount[] {
  if (typeof window === "undefined") return DEFAULT_ACCOUNTS;
  try {
    const s = localStorage.getItem(ACCOUNTS_KEY);
    return s ? JSON.parse(s) : DEFAULT_ACCOUNTS;
  } catch { return DEFAULT_ACCOUNTS; }
}

export function saveChartAccount(acc: ChartAccount): void {
  const all = getChartAccounts();
  const idx = all.findIndex(x => x.id === acc.id);
  if (idx >= 0) all[idx] = acc; else all.push(acc);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(all));
}

export function deleteChartAccount(id: string): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(getChartAccounts().filter(a => a.id !== id)));
}

export function getJournalEntries(): JournalEntry[] {
  if (typeof window === "undefined") return SEED_JOURNAL;
  try {
    const s = localStorage.getItem(JOURNAL_KEY);
    return s ? JSON.parse(s) : SEED_JOURNAL;
  } catch { return SEED_JOURNAL; }
}

export function saveJournalEntry(je: JournalEntry): void {
  const all = getJournalEntries();
  const idx = all.findIndex(x => x.id === je.id);
  if (idx >= 0) all[idx] = je; else all.unshift(je);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(all));
}

export function deleteJournalEntry(id: string): void {
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(getJournalEntries().filter(j => j.id !== id)));
}

/* ─── Ledger computation helper ──────────────────────── */
export interface LedgerAccount extends ChartAccount {
  totalDebit: number;
  totalCredit: number;
  balance: number;
}

export function computeLedger(
  accounts: ChartAccount[],
  entries: JournalEntry[]
): LedgerAccount[] {
  const map: Record<string, { debit: number; credit: number }> = {};
  accounts.forEach(a => { map[a.id] = { debit: 0, credit: 0 }; });
  entries.forEach(je => {
    je.lines.forEach(l => {
      if (map[l.accountId]) {
        map[l.accountId].debit  += l.debit;
        map[l.accountId].credit += l.credit;
      }
    });
  });
  return accounts.map(a => {
    const { debit, credit } = map[a.id] ?? { debit: 0, credit: 0 };
    const balance = a.normalBalance === "debit" ? debit - credit : credit - debit;
    return { ...a, totalDebit: debit, totalCredit: credit, balance };
  });
}
