import type {
  FormSubmission, AdminArticle, AdminJob,
  InvestorRecord, FundEntry, ChartAccount, JournalEntry, VendorRecord,
} from "./adminStore";

async function req<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...opts, headers: { "Content-Type": "application/json", ...opts?.headers } });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ─── Submissions ──────────────────────────────────────── */
export async function apiGetSubmissions(): Promise<FormSubmission[]> {
  const rows = await req<Record<string, unknown>[]>("/api/submissions");
  return rows.map(r => ({
    id: r.id as string,
    formType: r.form_type as FormSubmission["formType"],
    refId: r.ref_id as string,
    date: r.date as string,
    primaryName: r.primary_name as string,
    primaryEmail: r.primary_email as string,
    data: r.data as Record<string, string>,
  }));
}

export async function apiSaveSubmission(s: FormSubmission): Promise<void> {
  await req("/api/submissions", { method: "POST", body: JSON.stringify(s) });
}

export async function apiDeleteSubmission(id: string): Promise<void> {
  await req("/api/submissions", { method: "DELETE", body: JSON.stringify({ id }) });
}

/* ─── Articles ─────────────────────────────────────────── */
export async function apiGetArticles(): Promise<AdminArticle[]> {
  return req<AdminArticle[]>("/api/articles");
}

export async function apiSaveArticle(a: AdminArticle): Promise<void> {
  await req("/api/articles", { method: "POST", body: JSON.stringify(a) });
}

export async function apiDeleteArticle(id: string): Promise<void> {
  await req("/api/articles", { method: "DELETE", body: JSON.stringify({ id }) });
}

/* ─── Jobs ─────────────────────────────────────────────── */
export async function apiGetJobs(): Promise<AdminJob[]> {
  return req<AdminJob[]>("/api/jobs");
}

export async function apiSaveJob(j: AdminJob): Promise<void> {
  await req("/api/jobs", { method: "POST", body: JSON.stringify(j) });
}

export async function apiDeleteJob(id: string): Promise<void> {
  await req("/api/jobs", { method: "DELETE", body: JSON.stringify({ id }) });
}

/* ─── Investors ────────────────────────────────────────── */
export async function apiGetInvestors(): Promise<InvestorRecord[]> {
  const rows = await req<Record<string, unknown>[]>("/api/investors");
  return rows.map(r => ({
    id: r.id as string,
    name: r.name as string,
    company: r.company as string,
    type: r.type as InvestorRecord["type"],
    round: r.round as string,
    amountM: r.amount_m as number,
    equity: r.equity as number,
    date: r.date as string,
    status: r.status as InvestorRecord["status"],
    notes: r.notes as string | undefined,
  }));
}

export async function apiSaveInvestor(inv: InvestorRecord): Promise<void> {
  await req("/api/investors", { method: "POST", body: JSON.stringify(inv) });
}

export async function apiDeleteInvestor(id: string): Promise<void> {
  await req("/api/investors", { method: "DELETE", body: JSON.stringify({ id }) });
}

/* ─── Fund Entries ─────────────────────────────────────── */
export async function apiGetFundEntries(): Promise<FundEntry[]> {
  const rows = await req<Record<string, unknown>[]>("/api/fund-entries");
  return rows.map(r => ({
    id: r.id as string,
    from: r.from_name as string,
    amountM: r.amount_m as number,
    date: r.date as string,
    round: r.round as string,
    notes: r.notes as string | undefined,
  }));
}

export async function apiSaveFundEntry(e: FundEntry): Promise<void> {
  await req("/api/fund-entries", { method: "POST", body: JSON.stringify(e) });
}

export async function apiDeleteFundEntry(id: string): Promise<void> {
  await req("/api/fund-entries", { method: "DELETE", body: JSON.stringify({ id }) });
}

/* ─── Chart of Accounts ────────────────────────────────── */
export async function apiGetChartAccounts(): Promise<ChartAccount[]> {
  const rows = await req<Record<string, unknown>[]>("/api/chart-accounts");
  return rows.map(r => ({
    id: r.id as string,
    code: r.code as string,
    name: r.name as string,
    type: r.type as ChartAccount["type"],
    normalBalance: r.normal_balance as ChartAccount["normalBalance"],
    parentId: r.parent_id as string | undefined ?? undefined,
  }));
}

export async function apiSaveChartAccount(a: ChartAccount): Promise<void> {
  await req("/api/chart-accounts", { method: "POST", body: JSON.stringify(a) });
}

export async function apiDeleteChartAccount(id: string): Promise<void> {
  await req("/api/chart-accounts", { method: "DELETE", body: JSON.stringify({ id }) });
}

/* ─── Journal Entries ──────────────────────────────────── */
export async function apiGetJournalEntries(): Promise<JournalEntry[]> {
  const rows = await req<Record<string, unknown>[]>("/api/journal-entries");
  return rows.map(r => ({
    id: r.id as string,
    ref: r.ref as string,
    date: r.date as string,
    description: r.description as string,
    lines: r.lines as JournalEntry["lines"],
    ...(r.contact_id ? { contactId: r.contact_id as string } : {}),
  }));
}

export async function apiSaveJournalEntry(je: JournalEntry): Promise<void> {
  await req("/api/journal-entries", { method: "POST", body: JSON.stringify(je) });
}

export async function apiDeleteJournalEntry(id: string): Promise<void> {
  await req("/api/journal-entries", { method: "DELETE", body: JSON.stringify({ id }) });
}

/* ─── Vendors / Customers ──────────────────────────────── */
export async function apiGetVendors(): Promise<VendorRecord[]> {
  const rows = await req<Record<string, unknown>[]>("/api/vendors");
  return rows.map(r => ({
    id: r.id as string,
    code: r.code as string,
    name: r.name as string,
    type: r.type as VendorRecord["type"],
    phone: r.phone as string | undefined,
    email: r.email as string | undefined,
    address: r.address as string | undefined,
    notes: r.notes as string | undefined,
  }));
}

export async function apiSaveVendor(v: VendorRecord): Promise<void> {
  await req("/api/vendors", { method: "POST", body: JSON.stringify(v) });
}

export async function apiDeleteVendor(id: string): Promise<void> {
  await req("/api/vendors", { method: "DELETE", body: JSON.stringify({ id }) });
}
