"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Plus, Trash2, MessageSquare, Newspaper, Briefcase,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, LayoutDashboard, Eye, EyeOff,
  TrendingUp, Users, DollarSign, Edit2,
  Mail, Calendar, Handshake, Package, CreditCard, Car, BarChart3,
  BookOpen, BookMarked, Calculator, PieChart, Landmark,
  AlertCircle, CheckCircle2, MinusCircle,
} from "lucide-react";
import {
  isLoggedIn, logout,
  getSubmissions, getAdminNews, saveAdminArticle, deleteAdminArticle,
  getAdminJobs, saveAdminJob, deleteAdminJob,
  getInvestors, saveInvestor, deleteInvestor,
  getFundEntries, saveFundEntry, deleteFundEntry,
  getChartAccounts, saveChartAccount, deleteChartAccount, getJournalEntries, saveJournalEntry, deleteJournalEntry, computeLedger,
  getVendors, saveVendor, deleteVendor,
  FORM_LABELS, FORM_COLORS,
  type FormType, type FormSubmission, type AdminArticle, type AdminJob,
  type InvestorRecord, type InvestorType, type InvestorStatus,
  type FundEntry, type ChartAccount, type AccountType, type JournalEntry, type JournalLine,
  type LedgerAccount, type VendorRecord, type ContactType,
} from "@/lib/adminStore";
import {
  apiGetSubmissions, apiDeleteSubmission,
  apiGetArticles, apiSaveArticle, apiDeleteArticle,
  apiGetJobs, apiSaveJob, apiDeleteJob,
  apiGetInvestors, apiSaveInvestor, apiDeleteInvestor,
  apiGetFundEntries, apiSaveFundEntry, apiDeleteFundEntry,
  apiGetChartAccounts, apiSaveChartAccount, apiDeleteChartAccount,
  apiGetJournalEntries, apiSaveJournalEntry, apiDeleteJournalEntry,
  apiGetVendors, apiSaveVendor, apiDeleteVendor,
} from "@/lib/api";
import { articles as staticArticles } from "@/lib/articles";

/* ─── style helpers ───────────────────────────────────── */
const inp: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 14,
  background: "#FFFFFF", border: "1px solid #D6DBE8",
  color: "#1A2232", outline: "none", fontFamily: "DM Sans, sans-serif", boxSizing: "border-box",
  fontWeight: 400,
};
const textarea: React.CSSProperties = { ...inp, resize: "vertical" as const, lineHeight: 1.6 };
const label12: React.CSSProperties = { fontSize: 13, color: "#697586", display: "block", marginBottom: 6, fontWeight: 500 };
const card: React.CSSProperties = {
  background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 12, padding: "18px 20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
};

/* ─── DatePicker ───────────────────────────────────────── */
const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const DAYS_ID   = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function DatePicker({ value, onChange, placeholder, monthOnly = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  monthOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear]   = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }
  function pick(day: number) {
    onChange(`${day} ${MONTHS_ID[viewMonth]} ${viewYear}`);
    setOpen(false);
  }
  function pickMonth(mi: number) {
    onChange(`${MONTHS_ID[mi]} ${viewYear}`);
    setOpen(false);
  }

  const firstDow   = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMon  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayObj   = new Date();

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      {/* Input trigger */}
      <div style={{ position: "relative" }}>
        <input
          readOnly
          style={{ ...inp, paddingRight: 38, cursor: "pointer" }}
          value={value}
          placeholder={placeholder ?? (monthOnly ? "Jan 2026" : "15 Jan 2026")}
          onClick={() => setOpen(o => !o)}
        />
        <Calendar size={15} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#9AA5B4", pointerEvents: "none" }} />
      </div>

      {/* Floating calendar */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 9999,
          background: "#FFFFFF", borderRadius: 12,
          border: "1px solid #E4E8F2",
          boxShadow: "0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          width: monthOnly ? 240 : 276, padding: "14px 14px 12px",
        }}>
          {/* Month/Year header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <button onClick={prevMonth}
              style={{ background: "#F4F6FB", border: "none", borderRadius: 6, cursor: "pointer", display: "flex", padding: 5, color: "#697586" }}>
              <ChevronLeft size={14} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1A2232", fontFamily: "Geist, sans-serif" }}>
                {MONTHS_ID[viewMonth]} {viewYear}
              </span>
            </div>
            <button onClick={nextMonth}
              style={{ background: "#F4F6FB", border: "none", borderRadius: 6, cursor: "pointer", display: "flex", padding: 5, color: "#697586" }}>
              <ChevronRight size={14} />
            </button>
          </div>

          {monthOnly ? (
            /* Month grid */
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
              {MONTHS_ID.map((m, i) => {
                const sel = value.startsWith(`${m} `);
                return (
                  <button key={m} onClick={() => pickMonth(i)}
                    style={{ padding: "8px 0", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 13,
                      background: sel ? "#2D7A4F" : "transparent",
                      color: sel ? "#FFFFFF" : "#1A2232",
                      fontWeight: sel ? 600 : 400,
                      fontFamily: "DM Sans, sans-serif",
                    }}>
                    {m}
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              {/* Day-of-week headers */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
                {DAYS_ID.map(d => (
                  <p key={d} style={{ fontSize: 11, color: "#9AA5B4", textAlign: "center", fontWeight: 600, fontFamily: "DM Sans, sans-serif" }}>{d}</p>
                ))}
              </div>
              {/* Day cells */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                {Array.from({ length: firstDow }).map((_, i) => <span key={`e${i}`} />)}
                {Array.from({ length: daysInMon }).map((_, i) => {
                  const day = i + 1;
                  const sel = value === `${day} ${MONTHS_ID[viewMonth]} ${viewYear}`;
                  const isToday = day === todayObj.getDate() && viewMonth === todayObj.getMonth() && viewYear === todayObj.getFullYear();
                  return (
                    <button key={day} onClick={() => pick(day)}
                      style={{ padding: "6px 0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13,
                        background: sel ? "#2D7A4F" : isToday ? "#EBF5EE" : "transparent",
                        color: sel ? "#FFFFFF" : isToday ? "#2D7A4F" : "#1A2232",
                        fontWeight: sel ? 600 : 400,
                        textAlign: "center", fontFamily: "DM Sans, sans-serif",
                      }}>
                      {day}
                    </button>
                  );
                })}
              </div>
              {/* Today shortcut */}
              <div style={{ borderTop: "1px solid #E4E8F2", marginTop: 10, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => {
                  const t = new Date();
                  setViewMonth(t.getMonth()); setViewYear(t.getFullYear());
                  pick(t.getDate());
                }}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#2D7A4F", fontWeight: 500, fontFamily: "DM Sans, sans-serif" }}>
                  Hari ini
                </button>
                <button onClick={() => { onChange(""); setOpen(false); }}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#9AA5B4", fontFamily: "DM Sans, sans-serif" }}>
                  Hapus
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const CATEGORIES_ID = ["Ekosistem EV", "Carbon Market", "Energi Terbarukan", "Kemitraan"];
const DEPTS_ID = ["Teknologi", "Bisnis", "Operasional", "Energi"];
const ROUNDS = ["Pre-Seed", "Seed", "Seed Ext.", "Series A", "Series B", "Strategic", "Government", "EV Investor"];
const ALL_FORM_TYPES = Object.keys(FORM_LABELS) as FormType[];

const FORM_ICONS: Record<FormType, React.ReactNode> = {
  "contact": <Mail size={13} />,
  "schedule-meeting": <Calendar size={13} />,
  "apply-partnership": <Handshake size={13} />,
  "register-product": <Package size={13} />,
  "apply-ev-credit": <CreditCard size={13} />,
  "register-vehicle": <Car size={13} />,
  "buy-carbon-credit": <BarChart3 size={13} />,
};

const INV_TYPE_LABEL: Record<InvestorType, string> = {
  angel: "Angel", vc: "VC", strategic: "Strategic", government: "Government",
};
const INV_STATUS_COLOR: Record<InvestorStatus, string> = {
  disbursed: "#2D7A4F", committed: "#3E7CC8", pending: "#d97706",
};
const INV_TYPE_COLOR: Record<InvestorType, string> = {
  angel: "#B06820", vc: "#3E7CC8", strategic: "#7050C0", government: "#5DD6A0",
};

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function hex(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}
function fmtM(m: number) {
  return `Rp ${(m * 1_000_000).toLocaleString("id-ID")}`;
}
function getHiddenIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
}
function hideStaticId(key: string, id: string): void {
  const next = Array.from(new Set([...getHiddenIds(key), id]));
  localStorage.setItem(key, JSON.stringify(next));
}

const ACC_TYPE_LABEL: Record<AccountType, string> = {
  asset: "Aset", liability: "Kewajiban", equity: "Ekuitas", revenue: "Pendapatan", expense: "Beban",
};
const ACC_TYPE_COLOR: Record<AccountType, string> = {
  asset: "#3E7CC8", liability: "#C03C3C", equity: "#7050C0", revenue: "#2D7A4F", expense: "#B06820",
};
const ACC_TYPE_ORDER: AccountType[] = ["asset", "liability", "equity", "revenue", "expense"];
const HIDDEN_STATIC_NEWS_KEY = "renewa_hidden_static_news";
const HIDDEN_STATIC_JOBS_KEY = "renewa_hidden_static_jobs";

const ROUND_COLORS: Record<string, string> = {
  "Pre-Seed": "#2D7A4F", "Seed": "#3E7CC8", "Seed Ext.": "#7050C0",
  "Series A": "#B06820", "Series B": "#5DD6A0", "Strategic": "#7050C0", "Government": "#5DD6A0",
  "EV Investor": "#22D3EE",
};

/* ─── view type ───────────────────────────────────────── */
type View = "sub:all" | `sub:${FormType}` | "news" | "careers" | "finance" | "investors"
  | "journal" | "ledger" | "trial-balance" | "profit-loss" | "balance-sheet" | "coa" | "vendors";

/* ═══════════════════════════════════════════════════════ */
/* ─── Submissions ─────────────────────────────────────── */
function SubmissionsView({ formType }: { formType: FormType | "all" }) {
  const [subs, setSubs] = useState<FormSubmission[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { apiGetSubmissions().then(setSubs).catch(() => setSubs(getSubmissions())); }, []);

  const filtered = formType === "all" ? subs : subs.filter(s => s.formType === formType);
  const counts = ALL_FORM_TYPES.reduce<Record<FormType, number>>((acc, ft) => {
    acc[ft] = subs.filter(s => s.formType === ft).length;
    return acc;
  }, {} as Record<FormType, number>);

  return (
    <div>
      {/* Stats grid — show on "all" view only */}
      {formType === "all" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
          {ALL_FORM_TYPES.map(ft => (
            <div key={ft} style={{
              background: "#FFFFFF",
              border: `1px solid ${hex(FORM_COLORS[ft], 0.25)}`,
              borderTop: `3px solid ${FORM_COLORS[ft]}`,
              borderRadius: 10,
              padding: "16px 18px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ fontSize: 13, color: "#697586", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>{FORM_LABELS[ft]}</p>
                <span style={{ color: FORM_COLORS[ft], display: "flex", background: hex(FORM_COLORS[ft], 0.1), borderRadius: 6, padding: 5 }}>{FORM_ICONS[ft]}</span>
              </div>
              <p style={{ fontSize: 30, fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#1A2232", lineHeight: 1 }}>
                {counts[ft]}
              </p>
              <p style={{ fontSize: 13, color: "#9AA5B4", marginTop: 4 }}>submission</p>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#9AA5B4", background: "#FFFFFF", borderRadius: 12, border: "1px solid #E4E8F2" }}>
          <MessageSquare size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
          <p style={{ fontSize: 15, color: "#697586", fontWeight: 400 }}>Belum ada submission masuk.</p>
          <p style={{ fontSize: 13, color: "#9AA5B4", marginTop: 4 }}>Submission akan muncul di sini setelah pengguna mengisi form.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontSize: 13, color: "#697586", marginBottom: 4 }}>{filtered.length} submission</p>
          {filtered.map(s => {
            const color = FORM_COLORS[s.formType];
            return (
              <div key={s.id}
                style={{ ...card, cursor: "pointer", borderLeft: `3px solid ${hex(color, 0.6)}` }}
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        fontSize: 12, padding: "2px 9px", borderRadius: 100,
                        background: hex(color, 0.1), border: `0.5px solid ${hex(color, 0.3)}`,
                        color, fontFamily: "JetBrains Mono, monospace",
                      }}>
                        {FORM_ICONS[s.formType]} {FORM_LABELS[s.formType]}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.25)", fontFamily: "JetBrains Mono, monospace" }}>{s.refId}</span>
                    </div>
                    <p style={{ fontSize: 14, color: "#1A2232", fontWeight: 500, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.primaryName}</p>
                    <p style={{ fontSize: 13, color: "#697586" }}>{s.primaryEmail} · {s.date}</p>
                  </div>
                  <div style={{ marginLeft: 12, flexShrink: 0 }}>
                    {expanded === s.id ? <ChevronUp size={16} color="#9AA5B4" /> : <ChevronDown size={16} color="#9AA5B4" />}
                  </div>
                </div>
                {expanded === s.id && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #E4E8F2" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                      {Object.entries(s.data).map(([k, v]) => (
                        <div key={k} style={{ background: "#F4F6FB", borderRadius: 6, padding: "8px 12px" }}>
                          <p style={{ fontSize: 12, color: "#697586", marginBottom: 3, textTransform: "capitalize", fontFamily: "JetBrains Mono, monospace" }}>
                            {k.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim()}
                          </p>
                          <p style={{ fontSize: 14, color: "#1A2232", lineHeight: 1.5, wordBreak: "break-word" }}>{v || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Finance Dashboard ───────────────────────────────── */
function FinanceView() {
  /* investor names for dropdown — reload whenever form opens */
  const [allInvestors, setAllInvestors] = useState<InvestorRecord[]>([]);
  const investorNames = allInvestors.map(i => i.name);
  const [showFundForm, setShowFundForm] = useState(false);
  const refreshInvestors = useCallback(() => { apiGetInvestors().then(setAllInvestors).catch(() => setAllInvestors(getInvestors())); }, []);
  useEffect(() => { refreshInvestors(); }, [refreshInvestors]);

  /* fund entries state */
  const [entries, setEntries] = useState<FundEntry[]>([]);
  const [editEntryId, setEditEntryId] = useState<string | null>(null);
  const blankEntry = { from: "", amountM: 0, date: "", round: ROUNDS[0], notes: "" };
  const [entryForm, setEntryForm] = useState(blankEntry);
  const [entryFromOther, setEntryFromOther] = useState(false);

  const refreshEntries = useCallback(() => { apiGetFundEntries().then(setEntries).catch(() => setEntries(getFundEntries())); }, []);
  useEffect(() => { refreshEntries(); }, [refreshEntries]);

  const totalReceived = entries.reduce((s, e) => s + e.amountM, 0);

  const handleSaveEntry = () => {
    if (!entryForm.from.trim() || !entryForm.amountM) return;
    const entry: FundEntry = { ...entryForm, id: editEntryId || Date.now().toString() };
    apiSaveFundEntry(entry).catch(() => saveFundEntry(entry));
    setEntryForm(blankEntry); setEntryFromOther(false); setShowFundForm(false); setEditEntryId(null);
    refreshEntries();
  };
  const startEditEntry = (e: FundEntry) => {
    setEntryFromOther(!allInvestors.map(i => i.name).includes(e.from));
    setEntryForm({ from: e.from, amountM: e.amountM, date: e.date, round: e.round, notes: e.notes || "" });
    setEditEntryId(e.id); setShowFundForm(true);
  };

  /* cumulative running total */
  let running = 0;
  const entriesWithRunning = [...entries].reverse().map(e => { running += e.amountM; return { ...e, running }; }).reverse();

  return (
    <div>
      {/* ── Investor Correlation ── */}
      {entries.length > 0 && totalReceived > 0 && (() => {
        const invList = allInvestors;
        const byName: Record<string, { inv: InvestorRecord | undefined; total: number; rounds: string[] }> = {};
        entries.forEach(e => {
          if (!byName[e.from]) byName[e.from] = { inv: invList.find(i => i.name === e.from), total: 0, rounds: [] };
          byName[e.from].total += e.amountM;
          if (!byName[e.from].rounds.includes(e.round)) byName[e.from].rounds.push(e.round);
        });
        const sorted = Object.entries(byName).sort((a, b) => b[1].total - a[1].total);
        return (
          <div style={{ ...card, marginBottom: 28 }}>
            <p style={{ fontSize: 13, color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 20 }}>KORELASI INVESTOR — KONTRIBUSI DANA</p>
            {sorted.map(([name, data], idx) => {
              const pct = (data.total / totalReceived) * 100;
              const color = data.inv ? INV_TYPE_COLOR[data.inv.type] : "#9AA5B4";
              const isLast = idx === sorted.length - 1;
              return (
                <div key={name} style={{ marginBottom: isLast ? 0 : 16, paddingBottom: isLast ? 0 : 16, borderBottom: isLast ? "none" : "0.5px solid rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: hex(color, 0.12), border: `0.5px solid ${hex(color, 0.3)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color, fontFamily: "Geist, sans-serif" }}>
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, color: "#1A2232", fontWeight: 600, marginBottom: 3 }}>{name}</p>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          {data.inv ? (
                            <>
                              <span style={{ fontSize: 12, padding: "1px 7px", borderRadius: 100, background: hex(color, 0.1), color, border: `0.5px solid ${hex(color, 0.25)}`, fontFamily: "JetBrains Mono, monospace" }}>{INV_TYPE_LABEL[data.inv.type]}</span>
                              <span style={{ fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace" }}>{data.inv.round} · {data.inv.equity}% equity</span>
                              <span style={{ fontSize: 12, padding: "1px 7px", borderRadius: 100, background: hex(INV_STATUS_COLOR[data.inv.status], 0.08), color: INV_STATUS_COLOR[data.inv.status], border: `0.5px solid ${hex(INV_STATUS_COLOR[data.inv.status], 0.2)}`, fontFamily: "JetBrains Mono, monospace" }}>{data.inv.status}</span>
                            </>
                          ) : (
                            <span style={{ fontSize: 13, color: "#697586" }}>Pihak eksternal</span>
                          )}
                          {data.rounds.map(r => (
                            <span key={r} style={{ fontSize: 12, padding: "1px 7px", borderRadius: 100, background: hex(ROUND_COLORS[r] || "#9AA5B4", 0.08), color: ROUND_COLORS[r] || "#9AA5B4", border: `0.5px solid ${hex(ROUND_COLORS[r] || "#9AA5B4", 0.2)}`, fontFamily: "JetBrains Mono, monospace" }}>{r}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: 16, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#1A2232" }}>{fmtM(data.total)}</p>
                      <p style={{ fontSize: 13, color: "#697586", marginTop: 2 }}>{pct.toFixed(1)}% dari total</p>
                    </div>
                  </div>
                  <div style={{ position: "relative", height: 5, background: "rgba(0,0,0,0.04)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${hex(color, 0.6)}, ${color})`, borderRadius: 3 }} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* ── Dana Masuk ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 13, color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 4 }}>DANA MASUK</p>
            <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
              <p style={{ fontFamily: "Geist, sans-serif", fontWeight: 800, fontSize: 20, color: "#1A2232" }}>
                {fmtM(totalReceived)}
              </p>
              <p style={{ fontSize: 13, color: "#697586" }}>{entries.length} transaksi tercatat</p>
            </div>
          </div>
          <button onClick={() => { setEntryForm(blankEntry); setEntryFromOther(false); setEditEntryId(null); setShowFundForm(!showFundForm); }} style={{
            display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 16px",
            borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#2D7A4F",
            color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif",
          }}>
            <Plus size={14} /> Catat Dana Masuk
          </button>
        </div>

        {/* Add/Edit form */}
        {showFundForm && (
          <div style={{ ...card, marginBottom: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#2D7A4F" }} />
            <p style={{ fontSize: 13, color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 18 }}>
              {editEntryId ? "EDIT DANA MASUK" : "CATAT DANA MASUK BARU"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={label12}>Dari (Investor / Pihak) *</label>
                <select
                  style={{ ...inp, appearance: "none" as const }}
                  value={entryFromOther ? "__other__" : (entryForm.from || "")}
                  onChange={e => {
                    if (e.target.value === "__other__") {
                      setEntryFromOther(true);
                      setEntryForm({ ...entryForm, from: "" });
                    } else {
                      setEntryFromOther(false);
                      setEntryForm({ ...entryForm, from: e.target.value });
                    }
                  }}
                >
                  <option value="" disabled>Pilih investor...</option>
                  {investorNames.map(n => <option key={n} value={n}>{n}</option>)}
                  <option value="__other__">— Lainnya (isi manual) —</option>
                </select>
                {entryFromOther && (
                  <input
                    style={{ ...inp, marginTop: 8 }}
                    value={entryForm.from}
                    onChange={e => setEntryForm({ ...entryForm, from: e.target.value })}
                    placeholder="Nama pihak pengirim"
                    autoFocus
                  />
                )}
              </div>
              <div>
                <label style={label12}>Tanggal Masuk *</label>
                <DatePicker value={entryForm.date} onChange={v => setEntryForm({ ...entryForm, date: v })} placeholder="15 Jan 2025" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={label12}>Jumlah (Rp Juta) *</label>
                <input type="number" style={inp} value={entryForm.amountM || ""} onChange={e => setEntryForm({ ...entryForm, amountM: +e.target.value })} placeholder="500 = Rp 500.000.000" />
              </div>
              <div>
                <label style={label12}>Round / Kategori</label>
                <select style={{ ...inp, appearance: "none" as const }} value={entryForm.round} onChange={e => setEntryForm({ ...entryForm, round: e.target.value })}>
                  {ROUNDS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={label12}>Catatan</label>
                <input style={inp} value={entryForm.notes} onChange={e => setEntryForm({ ...entryForm, notes: e.target.value })} placeholder="Opsional" />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleSaveEntry} disabled={!entryForm.from.trim() || !entryForm.amountM} style={{
                padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                background: entryForm.from.trim() && entryForm.amountM ? "#2D7A4F" : "rgba(45,122,79,0.25)",
                color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif",
              }}>Simpan</button>
              <button onClick={() => { setShowFundForm(false); setEditEntryId(null); }} style={{ padding: "9px 18px", borderRadius: 8, fontSize: 14, background: "transparent", border: "0.5px solid rgba(0,0,0,0.08)", color: "#697586", cursor: "pointer" }}>Batal</button>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {entriesWithRunning.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#697586" }}>
              <DollarSign size={28} style={{ marginBottom: 10, opacity: 0.3 }} />
              <p style={{ fontSize: 14, fontWeight: 300 }}>Belum ada dana masuk dicatat.</p>
            </div>
          )}
          {entriesWithRunning.map((e, idx) => (
            <div key={e.id} style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
              {/* Timeline line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32, flexShrink: 0 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%", flexShrink: 0, marginTop: 20,
                  background: "#2D7A4F", border: "2px solid #E4E8F2",
                  boxShadow: "0 0 0 1px rgba(184,245,58,0.4)",
                }} />
                {idx < entriesWithRunning.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: "rgba(0,0,0,0.06)", marginTop: 4 }} />
                )}
              </div>

              {/* Card */}
              <div style={{
                flex: 1, marginLeft: 12, marginBottom: 10,
                background: "#FFFFFF", border: "0.5px solid rgba(0,0,0,0.06)",
                borderRadius: 10, padding: "14px 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{
                      fontSize: 12, padding: "1px 8px", borderRadius: 100,
                      background: "rgba(45,122,79,0.07)", border: "0.5px solid rgba(45,122,79,0.2)",
                      color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace",
                    }}>{e.round}</span>
                    <span style={{ fontSize: 13, color: "rgba(0,0,0,0.25)", fontFamily: "JetBrains Mono, monospace" }}>{e.date}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#1A2232", fontWeight: 600, marginBottom: 2 }}>{e.from}</p>
                  {e.notes && <p style={{ fontSize: 13, color: "#697586" }}>{e.notes}</p>}
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 16, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#2D7A4F" }}>
                    +{fmtM(e.amountM)}
                  </p>
                  <p style={{ fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace", marginTop: 2 }}>
                    kumulatif: {fmtM(e.running)}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                  <button onClick={() => startEditEntry(e)} style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 6 }}
                    onMouseOver={el => (el.currentTarget.style.color = "#2D7A4F")} onMouseOut={el => (el.currentTarget.style.color = "#697586")}>
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => { apiDeleteFundEntry(e.id).catch(() => deleteFundEntry(e.id)); refreshEntries(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 6 }}
                    onMouseOver={el => (el.currentTarget.style.color = "#ff6b6b")} onMouseOut={el => (el.currentTarget.style.color = "#697586")}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Investors View ──────────────────────────────────── */
function InvestorsView() {
  const [investors, setInvestors] = useState<InvestorRecord[]>([]);
  const [fundEntries, setFundEntries] = useState<FundEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const blankForm = { name: "", company: "", type: "angel" as InvestorType, round: ROUNDS[0], amountM: 0, equity: 0, date: "", status: "committed" as InvestorStatus, notes: "" };
  const [form, setForm] = useState(blankForm);

  const refresh = useCallback(() => {
    apiGetInvestors().then(setInvestors).catch(() => setInvestors(getInvestors()));
    apiGetFundEntries().then(setFundEntries).catch(() => setFundEntries(getFundEntries()));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const amountByInvestor = fundEntries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.from] = (acc[entry.from] || 0) + entry.amountM;
    return acc;
  }, {});
  const getInvestorAmount = (inv: InvestorRecord) => amountByInvestor[inv.name] || 0;
  const totalRaised = investors.reduce((s, i) => s + getInvestorAmount(i), 0);
  const totalEquity = investors.reduce((s, i) => s + i.equity, 0);

  const startEdit = (inv: InvestorRecord) => {
    setForm({ name: inv.name, company: inv.company, type: inv.type, round: inv.round, amountM: inv.amountM, equity: inv.equity, date: inv.date, status: inv.status, notes: inv.notes || "" });
    setEditId(inv.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    const existing = editId ? investors.find(i => i.id === editId) : null;
    const inv: InvestorRecord = { ...form, amountM: existing?.amountM || 0, id: editId || Date.now().toString() };
    apiSaveInvestor(inv).catch(() => saveInvestor(inv));
    setForm(blankForm); setShowForm(false); setEditId(null);
    refresh();
  };

  const handleDelete = (id: string) => { apiDeleteInvestor(id).catch(() => deleteInvestor(id)); refresh(); };

  const roundGroup = investors.reduce<Record<string, InvestorRecord[]>>((acc, inv) => {
    if (!acc[inv.round]) acc[inv.round] = [];
    acc[inv.round].push(inv);
    return acc;
  }, {});

  return (
    <div>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Total Investor", value: investors.length.toString(), color: "#2D7A4F", icon: <Users size={16} /> },
          { label: "Total Raised", value: fmtM(totalRaised), color: "#3E7CC8", icon: <DollarSign size={16} /> },
          { label: "Total Equity Diluted", value: `${totalEquity.toFixed(1)}%`, color: "#B06820", icon: <TrendingUp size={16} /> },
        ].map(k => (
          <div key={k.label} style={{ background: hex(k.color, 0.05), border: `0.5px solid ${hex(k.color, 0.2)}`, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ color: k.color }}>{k.icon}</span>
              <p style={{ fontSize: 13, color: "#697586", fontFamily: "JetBrains Mono, monospace" }}>{k.label.toUpperCase()}</p>
            </div>
            <p style={{ fontSize: 24, fontFamily: "Geist, sans-serif", fontWeight: 800, color: k.color }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { setForm(blankForm); setEditId(null); setShowForm(!showForm); }} style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px",
          borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#2D7A4F",
          color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif",
        }}>
          <Plus size={15} /> Tambah Investor
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ ...card, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#2D7A4F" }} />
          <p style={{ fontSize: 14, color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 20 }}>
            {editId ? "EDIT INVESTOR" : "INVESTOR BARU"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={label12}>Nama *</label><input style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama investor" /></div>
            <div><label style={label12}>Perusahaan</label><input style={inp} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Nama perusahaan / fund" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={label12}>Tipe</label>
              <select style={{ ...inp, appearance: "none" as const }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value as InvestorType })}>
                {(Object.keys(INV_TYPE_LABEL) as InvestorType[]).map(t => <option key={t} value={t}>{INV_TYPE_LABEL[t]}</option>)}
              </select>
            </div>
            <div>
              <label style={label12}>Round</label>
              <select style={{ ...inp, appearance: "none" as const }} value={form.round} onChange={e => setForm({ ...form, round: e.target.value })}>
                {ROUNDS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={label12}>Status</label>
              <select style={{ ...inp, appearance: "none" as const }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value as InvestorStatus })}>
                <option value="disbursed">Disbursed</option>
                <option value="committed">Committed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={label12}>Equity (%)</label><input type="number" step="0.1" style={inp} value={form.equity || ""} onChange={e => setForm({ ...form, equity: +e.target.value })} placeholder="5" /></div>
            <div><label style={label12}>Tanggal</label><DatePicker value={form.date} onChange={v => setForm({ ...form, date: v })} placeholder="Jan 2025" monthOnly /></div>
          </div>
          <p style={{ fontSize: 13, color: "#697586", marginBottom: 16 }}>
            Nominal investasi dicatat dari menu <b style={{ color: "#2D7A4F" }}>Dashboard Keuangan</b> melalui Catat Dana Masuk.
          </p>
          <div style={{ marginBottom: 20 }}>
            <label style={label12}>Catatan</label>
            <input style={inp} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Catatan tambahan (opsional)" />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleSave} disabled={!form.name.trim()} style={{
              padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600,
              background: form.name.trim() ? "#2D7A4F" : "rgba(45,122,79,0.25)",
              color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif",
            }}>Simpan</button>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 14, background: "transparent", border: "0.5px solid rgba(0,0,0,0.08)", color: "#697586", cursor: "pointer" }}>Batal</button>
          </div>
        </div>
      )}

      {/* Grouped by round */}
      {Object.entries(roundGroup).map(([round, invs]) => (
        <div key={round} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <p style={{ fontFamily: "Geist, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>{round}</p>
            <span style={{ fontSize: 13, color: "#697586", fontFamily: "JetBrains Mono, monospace" }}>
              {invs.length} investor · {fmtM(invs.reduce((s, i) => s + getInvestorAmount(i), 0))} · {invs.reduce((s, i) => s + i.equity, 0).toFixed(1)}% equity
            </span>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.06)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {invs.map(inv => (
              <div key={inv.id} style={{ ...card, display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: hex(INV_TYPE_COLOR[inv.type], 0.12),
                    border: `0.5px solid ${hex(INV_TYPE_COLOR[inv.type], 0.3)}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: INV_TYPE_COLOR[inv.type], fontFamily: "Geist, sans-serif" }}>
                      {inv.name.charAt(0)}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                      <p style={{ fontSize: 14, color: "#1A2232", fontWeight: 600 }}>{inv.name}</p>
                      {inv.company && inv.company !== "—" && (
                        <span style={{ fontSize: 13, color: "#697586" }}>· {inv.company}</span>
                      )}
                      <span style={{
                        fontSize: 12, padding: "1px 7px", borderRadius: 100,
                        background: hex(INV_TYPE_COLOR[inv.type], 0.1),
                        color: INV_TYPE_COLOR[inv.type],
                        border: `0.5px solid ${hex(INV_TYPE_COLOR[inv.type], 0.25)}`,
                        fontFamily: "JetBrains Mono, monospace",
                      }}>{INV_TYPE_LABEL[inv.type]}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#697586" }}>{inv.date}{inv.notes ? ` · ${inv.notes}` : ""}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 20, alignItems: "center", flexShrink: 0 }}>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 14, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#1A2232" }}>{fmtM(getInvestorAmount(inv))}</p>
                    <p style={{ fontSize: 13, color: "#697586" }}>{inv.equity}% equity</p>
                  </div>
                  <span style={{
                    fontSize: 12, padding: "3px 10px", borderRadius: 100,
                    background: hex(INV_STATUS_COLOR[inv.status], 0.1),
                    color: INV_STATUS_COLOR[inv.status],
                    border: `0.5px solid ${hex(INV_STATUS_COLOR[inv.status], 0.3)}`,
                    fontFamily: "JetBrains Mono, monospace",
                  }}>{inv.status}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => startEdit(inv)} style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 6 }}
                      onMouseOver={e => (e.currentTarget.style.color = "#2D7A4F")} onMouseOut={e => (e.currentTarget.style.color = "#697586")}>
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => handleDelete(inv.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 6 }}
                      onMouseOver={e => (e.currentTarget.style.color = "#ff6b6b")} onMouseOut={e => (e.currentTarget.style.color = "#697586")}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── News View ───────────────────────────────────────── */
function NewsView() {
  const [adminNews, setAdminNews] = useState<AdminArticle[]>([]);
  const [hiddenStaticNews, setHiddenStaticNews] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editArticleId, setEditArticleId] = useState<string | null>(null);
  const [editingStaticArticleId, setEditingStaticArticleId] = useState<string | null>(null);
  const [form, setForm] = useState({ titleId: "", titleEn: "", excerptId: "", excerptEn: "", bodyId: "", bodyEn: "", category: CATEGORIES_ID[0], tag: "news" as "news" | "insight" | "featured" });

  const refresh = useCallback(() => {
    apiGetArticles().then(setAdminNews).catch(() => setAdminNews(getAdminNews()));
    setHiddenStaticNews(getHiddenIds(HIDDEN_STATIC_NEWS_KEY));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const allArticles = [
    ...staticArticles.filter(a => !hiddenStaticNews.includes(String(a.id))).map(a => ({ ...a, source: "static" as const, published: true })),
    ...adminNews,
  ];

  const resetForm = () => {
    setForm({ titleId: "", titleEn: "", excerptId: "", excerptEn: "", bodyId: "", bodyEn: "", category: CATEGORIES_ID[0], tag: "news" });
    setEditArticleId(null);
    setEditingStaticArticleId(null);
  };

  const startEditArticle = (a: (typeof allArticles)[number]) => {
    setForm({
      titleId: a.title.id,
      titleEn: a.title.en,
      excerptId: a.excerpt.id,
      excerptEn: a.excerpt.en,
      bodyId: a.body[0]?.text?.id || "",
      bodyEn: a.body[0]?.text?.en || "",
      category: a.category.id,
      tag: a.tag,
    });
    setEditArticleId(a.source === "admin" ? a.id : `static-news-${a.id}`);
    setEditingStaticArticleId(a.source === "static" ? String(a.id) : null);
    setShowForm(true);
  };

  const handlePublish = () => {
    if (!form.titleId.trim()) return;
    const existing = editArticleId ? adminNews.find(a => a.id === editArticleId) : null;
    const staticOriginal = editingStaticArticleId
      ? staticArticles.find(a => String(a.id) === editingStaticArticleId)
      : null;
    const article: AdminArticle = {
      id: editArticleId || Date.now().toString(),
      slug: existing?.slug || staticOriginal?.slug || slugify(form.titleId),
      category: { id: form.category, en: form.category }, tag: form.tag,
      date: existing?.date || staticOriginal?.date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      readTime: existing?.readTime || staticOriginal?.readTime || "3 min",
      title: { id: form.titleId, en: form.titleEn || form.titleId },
      excerpt: { id: form.excerptId, en: form.excerptEn || form.excerptId },
      body: form.bodyId ? [{ type: "paragraph" as const, text: { id: form.bodyId, en: form.bodyEn || form.bodyId } }] : [],
      published: true, source: "admin",
    };
    apiSaveArticle(article).catch(() => saveAdminArticle(article));
    if (editingStaticArticleId) hideStaticId(HIDDEN_STATIC_NEWS_KEY, editingStaticArticleId);
    resetForm();
    setShowForm(false); refresh();
  };

  const togglePublish = (a: AdminArticle) => {
    const updated = { ...a, published: !a.published };
    apiSaveArticle(updated).catch(() => saveAdminArticle(updated));
    refresh();
  };
  const handleDeleteArticle = (a: (typeof allArticles)[number]) => {
    if (a.source === "static") hideStaticId(HIDDEN_STATIC_NEWS_KEY, String(a.id));
    else { apiDeleteArticle(a.id).catch(() => deleteAdminArticle(a.id)); }
    refresh();
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#2D7A4F", color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif" }}>
          <Plus size={15} /> Artikel Baru
        </button>
      </div>
      {showForm && (
        <div style={{ ...card, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#2D7A4F" }} />
          <p style={{ fontSize: 14, color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 20 }}>{editArticleId ? "EDIT ARTIKEL" : "ARTIKEL BARU"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={label12}>Judul (ID) *</label><input style={inp} value={form.titleId} onChange={e => setForm({ ...form, titleId: e.target.value })} placeholder="Judul dalam Bahasa Indonesia" /></div>
            <div><label style={label12}>Title (EN)</label><input style={inp} value={form.titleEn} onChange={e => setForm({ ...form, titleEn: e.target.value })} placeholder="English title (optional)" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={label12}>Kategori</label>
              <select style={{ ...inp, appearance: "none" as const }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES_ID.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={label12}>Tipe</label>
              <select style={{ ...inp, appearance: "none" as const }} value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value as "news" | "insight" | "featured" })}>
                <option value="news">Berita</option><option value="insight">Insight</option><option value="featured">Featured</option>
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={label12}>Ringkasan (ID) *</label><textarea rows={3} style={textarea} value={form.excerptId} onChange={e => setForm({ ...form, excerptId: e.target.value })} /></div>
            <div><label style={label12}>Excerpt (EN)</label><textarea rows={3} style={textarea} value={form.excerptEn} onChange={e => setForm({ ...form, excerptEn: e.target.value })} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div><label style={label12}>Isi Artikel (ID)</label><textarea rows={6} style={textarea} value={form.bodyId} onChange={e => setForm({ ...form, bodyId: e.target.value })} /></div>
            <div><label style={label12}>Article Body (EN)</label><textarea rows={6} style={textarea} value={form.bodyEn} onChange={e => setForm({ ...form, bodyEn: e.target.value })} /></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handlePublish} disabled={!form.titleId.trim() || !form.excerptId.trim()} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: form.titleId.trim() && form.excerptId.trim() ? "#2D7A4F" : "rgba(45,122,79,0.25)", color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif" }}>{editArticleId ? "Simpan Perubahan" : "Publish"}</button>
            <button onClick={() => { setShowForm(false); resetForm(); }} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 14, background: "transparent", border: "0.5px solid rgba(0,0,0,0.08)", color: "#697586", cursor: "pointer" }}>Batal</button>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {allArticles.map(a => (
          <div key={a.id} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#2D7A4F", background: "rgba(45,122,79,0.07)", border: "0.5px solid rgba(45,122,79,0.2)", borderRadius: 100, padding: "1px 8px" }}>{a.category.id}</span>
                <span style={{ fontSize: 12, color: "rgba(0,0,0,0.2)", fontFamily: "JetBrains Mono, monospace" }}>{a.source === "static" ? "STATIC" : "ADMIN"} · {a.tag.toUpperCase()}</span>
              </div>
              <p style={{ fontSize: 14, color: "#1A2232", fontWeight: 500, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title.id}</p>
              <p style={{ fontSize: 13, color: "#697586", fontFamily: "JetBrains Mono, monospace" }}>{a.date}</p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 13, padding: "3px 10px", borderRadius: 100, background: a.published ? "rgba(45,122,79,0.08)" : "rgba(0,0,0,0.03)", color: a.published ? "#2D7A4F" : "#9AA5B4", border: `0.5px solid ${a.published ? "rgba(45,122,79,0.25)" : "rgba(0,0,0,0.08)"}` }}>{a.published ? "Published" : "Draft"}</span>
              <a href={`/news/${a.slug}`} target="_blank" rel="noreferrer" title="View artikel" style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 4 }}>
                <Eye size={15} />
              </a>
              <button onClick={() => startEditArticle(a)} title="Edit artikel" style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 4 }}><Edit2 size={15} /></button>
              {a.source === "admin" && (
                <button onClick={() => togglePublish(a)} title={a.published ? "Set draft" : "Publish"} style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 4 }}>{a.published ? <EyeOff size={15} /> : <CheckCircle2 size={15} />}</button>
              )}
              <button onClick={() => handleDeleteArticle(a)} title="Delete artikel" style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 4 }} onMouseOver={e => (e.currentTarget.style.color = "#ff6b6b")} onMouseOut={e => (e.currentTarget.style.color = "#697586")}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Careers View ────────────────────────────────────── */
const staticJobs = [
  { id: "s1", title: "Full-Stack Engineer (EV Credit Platform)", dept: { id: "Teknologi", en: "Technology" }, level: { id: "Mid–Senior", en: "Mid–Senior" }, type: { id: "Penuh Waktu", en: "Full-time" }, location: "Jakarta, Indonesia", desc: { id: "Membangun platform Credit Connect — sistem pembiayaan EV.", en: "Build the Credit Connect EV financing platform." }, skills: ["Next.js", "Node.js", "PostgreSQL", "TypeScript"], active: true, source: "static" as const },
  { id: "s2", title: "Carbon Credit Data Engineer", dept: { id: "Teknologi", en: "Technology" }, level: { id: "Mid", en: "Mid" }, type: { id: "Penuh Waktu", en: "Full-time" }, location: "Jakarta, Indonesia", desc: { id: "Merancang pipeline data untuk carbon credit.", en: "Design data pipelines for carbon credit tracking." }, skills: ["Python", "dbt", "Airflow", "BigQuery"], active: true, source: "static" as const },
  { id: "s3", title: "Business Development Manager – EV Financing", dept: { id: "Bisnis", en: "Business" }, level: { id: "Senior", en: "Senior" }, type: { id: "Penuh Waktu", en: "Full-time" }, location: "Jakarta, Indonesia", desc: { id: "Membangun kemitraan dengan lembaga pembiayaan.", en: "Build partnerships with financing institutions." }, skills: ["B2B Sales", "Financial Products", "Negotiation"], active: true, source: "static" as const },
  { id: "s4", title: "EV Fleet Operations Coordinator", dept: { id: "Operasional", en: "Operations" }, level: { id: "Junior–Mid", en: "Junior–Mid" }, type: { id: "Penuh Waktu", en: "Full-time" }, location: "Jabodetabek", desc: { id: "Mengelola operasional armada motor EV pilot.", en: "Manage EV motorcycle pilot fleet operations." }, skills: ["Fleet Management", "Logistics", "Reporting"], active: true, source: "static" as const },
  { id: "s5", title: "Solar Energy Project Engineer", dept: { id: "Energi", en: "Energy" }, level: { id: "Mid–Senior", en: "Mid–Senior" }, type: { id: "Penuh Waktu", en: "Full-time" }, location: "Jakarta / Jawa Tengah", desc: { id: "Mengelola konstruksi PLTS pertama Renewa.", en: "Manage construction of Renewa's first PLTS." }, skills: ["Solar PV Design", "Grid Integration", "AutoCAD"], active: true, source: "static" as const },
  { id: "s6", title: "ESG & Carbon Market Analyst", dept: { id: "Bisnis", en: "Business" }, level: { id: "Mid", en: "Mid" }, type: { id: "Penuh Waktu", en: "Full-time" }, location: "Jakarta, Indonesia", desc: { id: "Mengembangkan strategi ESG dan carbon credit.", en: "Develop ESG strategy and carbon credit documentation." }, skills: ["ESG Reporting", "Carbon Markets", "Verra/VCS"], active: true, source: "static" as const },
];

function CareersView() {
  const [adminJobs, setAdminJobs] = useState<AdminJob[]>([]);
  const [hiddenStaticJobs, setHiddenStaticJobs] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [editingStaticJobId, setEditingStaticJobId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", dept: DEPTS_ID[0], level: "Mid", location: "Jakarta, Indonesia", descId: "", descEn: "", skills: "" });

  const refresh = useCallback(() => {
    apiGetJobs().then(setAdminJobs).catch(() => setAdminJobs(getAdminJobs()));
    setHiddenStaticJobs(getHiddenIds(HIDDEN_STATIC_JOBS_KEY));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const allJobs = [...staticJobs.filter(j => !hiddenStaticJobs.includes(j.id)), ...adminJobs];
  const resetJobForm = () => {
    setForm({ title: "", dept: DEPTS_ID[0], level: "Mid", location: "Jakarta, Indonesia", descId: "", descEn: "", skills: "" });
    setEditJobId(null);
    setEditingStaticJobId(null);
  };

  const startEditJob = (j: (typeof allJobs)[number]) => {
    setForm({
      title: j.title,
      dept: j.dept.id,
      level: j.level.id,
      location: j.location,
      descId: j.desc.id,
      descEn: j.desc.en,
      skills: j.skills.join(", "),
    });
    setEditJobId(j.source === "admin" ? j.id : `static-job-${j.id}`);
    setEditingStaticJobId(j.source === "static" ? j.id : null);
    setShowForm(true);
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const existing = editJobId ? adminJobs.find(j => j.id === editJobId) : null;
    const job: AdminJob = { id: editJobId || Date.now().toString(), title: form.title, dept: { id: form.dept, en: form.dept }, type: { id: "Penuh Waktu", en: "Full-time" }, level: { id: form.level, en: form.level }, location: form.location, desc: { id: form.descId, en: form.descEn || form.descId }, skills: form.skills.split(",").map(s => s.trim()).filter(Boolean), active: existing?.active ?? true, source: "admin" };
    apiSaveJob(job).catch(() => saveAdminJob(job));
    if (editingStaticJobId) hideStaticId(HIDDEN_STATIC_JOBS_KEY, editingStaticJobId);
    resetJobForm();
    setShowForm(false); refresh();
  };
  const toggleActive = (j: AdminJob) => {
    const updated = { ...j, active: !j.active };
    apiSaveJob(updated).catch(() => saveAdminJob(updated));
    refresh();
  };
  const handleDeleteJob = (j: (typeof allJobs)[number]) => {
    if (j.source === "static") hideStaticId(HIDDEN_STATIC_JOBS_KEY, j.id);
    else { apiDeleteJob(j.id).catch(() => deleteAdminJob(j.id)); }
    refresh();
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { resetJobForm(); setShowForm(!showForm); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#2D7A4F", color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif" }}>
          <Plus size={15} /> Posisi Baru
        </button>
      </div>
      {showForm && (
        <div style={{ ...card, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#2D7A4F" }} />
          <p style={{ fontSize: 14, color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 20 }}>{editJobId ? "EDIT POSISI" : "POSISI BARU"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={label12}>Judul Posisi *</label><input style={inp} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Senior Backend Engineer" /></div>
            <div><label style={label12}>Departemen</label><select style={{ ...inp, appearance: "none" as const }} value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })}>{DEPTS_ID.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
            <div><label style={label12}>Level</label><input style={inp} value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} placeholder="Mid, Senior..." /></div>
          </div>
          <div style={{ marginBottom: 12 }}><label style={label12}>Lokasi</label><input style={inp} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={label12}>Deskripsi (ID) *</label><textarea rows={4} style={textarea} value={form.descId} onChange={e => setForm({ ...form, descId: e.target.value })} /></div>
            <div><label style={label12}>Description (EN)</label><textarea rows={4} style={textarea} value={form.descEn} onChange={e => setForm({ ...form, descEn: e.target.value })} /></div>
          </div>
          <div style={{ marginBottom: 20 }}><label style={label12}>Skills (pisahkan koma)</label><input style={inp} value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} placeholder="React, Node.js, ..." /></div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleAdd} disabled={!form.title.trim()} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: form.title.trim() ? "#2D7A4F" : "rgba(45,122,79,0.25)", color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif" }}>{editJobId ? "Simpan Perubahan" : "Tambah"}</button>
            <button onClick={() => { setShowForm(false); resetJobForm(); }} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 14, background: "transparent", border: "0.5px solid rgba(0,0,0,0.08)", color: "#697586", cursor: "pointer" }}>Batal</button>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {allJobs.map(j => (
          <div key={j.id} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#2D7A4F", background: "rgba(45,122,79,0.07)", border: "0.5px solid rgba(45,122,79,0.2)", borderRadius: 100, padding: "1px 8px" }}>{j.dept.id}</span>
                <span style={{ fontSize: 12, color: "rgba(0,0,0,0.2)", fontFamily: "JetBrains Mono, monospace" }}>{j.source === "static" ? "STATIC" : "ADMIN"} · {j.level.id} · {j.location}</span>
              </div>
              <p style={{ fontSize: 14, color: "#1A2232", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{j.title}</p>
              {j.skills.length > 0 && (
                <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                  {j.skills.slice(0, 4).map(s => <span key={s} style={{ fontSize: 12, color: "#697586", background: "rgba(0,0,0,0.03)", border: "0.5px solid rgba(0,0,0,0.06)", borderRadius: 4, padding: "1px 7px", fontFamily: "JetBrains Mono, monospace" }}>{s}</span>)}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 13, padding: "3px 10px", borderRadius: 100, background: j.active ? "rgba(45,122,79,0.08)" : "rgba(0,0,0,0.03)", color: j.active ? "#2D7A4F" : "#9AA5B4", border: `0.5px solid ${j.active ? "rgba(45,122,79,0.25)" : "rgba(0,0,0,0.08)"}` }}>{j.active ? "Active" : "Inactive"}</span>
              <a href="/careers" target="_blank" rel="noreferrer" title="View careers" style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 4 }}>
                <Eye size={15} />
              </a>
              <button onClick={() => startEditJob(j)} title="Edit posisi" style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 4 }}><Edit2 size={15} /></button>
              {j.source === "admin" && (
                <button onClick={() => toggleActive(j)} title={j.active ? "Nonaktifkan" : "Aktifkan"} style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 4 }}>{j.active ? <EyeOff size={15} /> : <CheckCircle2 size={15} />}</button>
              )}
              <button onClick={() => handleDeleteJob(j)} title="Delete posisi" style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 4 }} onMouseOver={e => (e.currentTarget.style.color = "#ff6b6b")} onMouseOut={e => (e.currentTarget.style.color = "#697586")}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Journal View ────────────────────────────────────── */
function JournalView() {
  const [accounts, setAccounts] = useState<ChartAccount[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  interface LineForm { accountId: string; debit: string; credit: string; }
  const blankLine: LineForm = { accountId: "", debit: "", credit: "" };
  const [form, setForm] = useState({ date: "", description: "", contactId: "" });
  const [lines, setLines] = useState<LineForm[]>([blankLine, blankLine]);
  const [vendors, setVendors] = useState<VendorRecord[]>([]);

  const refresh = useCallback(() => {
    apiGetChartAccounts().then(setAccounts).catch(() => setAccounts(getChartAccounts()));
    apiGetJournalEntries().then(setEntries).catch(() => setEntries(getJournalEntries()));
    apiGetVendors().then(setVendors).catch(() => setVendors(getVendors()));
  }, []);

  const totalD = lines.reduce((s, l) => s + (parseFloat(l.debit) || 0), 0);
  const totalC = lines.reduce((s, l) => s + (parseFloat(l.credit) || 0), 0);
  const balanced = Math.abs(totalD - totalC) < 0.001 && totalD > 0;

  const handleSave = () => {
    if (!balanced || !form.date || !form.description) return;
    const jeLines: JournalLine[] = lines
      .filter(l => l.accountId && (parseFloat(l.debit) > 0 || parseFloat(l.credit) > 0))
      .map(l => ({ accountId: l.accountId, debit: parseFloat(l.debit) || 0, credit: parseFloat(l.credit) || 0 }));
    const nextNum = entries.length + 1;
    const je: JournalEntry = {
      id: Date.now().toString(),
      ref: `JE-${new Date().getFullYear()}-${String(nextNum).padStart(3, "0")}`,
      date: form.date,
      description: form.description,
      lines: jeLines,
      ...(form.contactId ? { contactId: form.contactId } : {}),
    };
    apiSaveJournalEntry(je).catch(() => saveJournalEntry(je));
    setForm({ date: "", description: "", contactId: "" });
    setLines([blankLine, blankLine]);
    setShowForm(false);
    refresh();
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { setForm({ date: "", description: "", contactId: "" }); setLines([blankLine, blankLine]); setShowForm(!showForm); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#2D7A4F", color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif" }}>
          <Plus size={15} /> Jurnal Baru
        </button>
      </div>

      {showForm && (
        <div style={{ ...card, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#2D7A4F" }} />
          <p style={{ fontSize: 13, color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 18 }}>JURNAL BARU</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 12, marginBottom: 16 }}>
            <div><label style={label12}>Tanggal *</label><DatePicker value={form.date} onChange={v => setForm({ ...form, date: v })} placeholder="15 Jan 2026" /></div>
            <div><label style={label12}>Keterangan *</label><input style={inp} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi transaksi" /></div>
            <div>
              <label style={label12}>Vendor / Customer</label>
              <select style={{ ...inp, appearance: "none" as const }} value={form.contactId}
                onChange={e => setForm({ ...form, contactId: e.target.value })}>
                <option value="">— Pilih (opsional) —</option>
                {["vendor","customer","both"].map(t => {
                  const group = vendors.filter(v => v.type === t);
                  if (group.length === 0) return null;
                  return (
                    <optgroup key={t} label={CONTACT_TYPE_LABEL[t as ContactType]}>
                      {group.map(v => <option key={v.id} value={v.id}>{v.code ? `${v.code} — ` : ""}{v.name}</option>)}
                    </optgroup>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px 32px", gap: 8, marginBottom: 6, padding: "0 4px" }}>
              <p style={{ fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace" }}>AKUN</p>
              <p style={{ fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace", textAlign: "right" }}>DEBIT (Rp)</p>
              <p style={{ fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace", textAlign: "right" }}>KREDIT (Rp)</p>
              <span />
            </div>
            {lines.map((l, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px 32px", gap: 8, marginBottom: 6 }}>
                <select style={{ ...inp, appearance: "none" as const, padding: "8px 12px" }} value={l.accountId}
                  onChange={e => setLines(lines.map((x, j) => j === i ? { ...x, accountId: e.target.value } : x))}>
                  <option value="">— Pilih akun —</option>
                  {ACC_TYPE_ORDER.map(type => (
                    <optgroup key={type} label={ACC_TYPE_LABEL[type]}>
                      {accounts.filter(a => a.type === type).map(a => (
                        <option key={a.id} value={a.id}>{a.code} — {a.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <input type="number" style={{ ...inp, padding: "8px 12px", textAlign: "right" }} value={l.debit}
                  onChange={e => setLines(lines.map((x, j) => j === i ? { ...x, debit: e.target.value, credit: "" } : x))}
                  placeholder="0" min="0" />
                <input type="number" style={{ ...inp, padding: "8px 12px", textAlign: "right" }} value={l.credit}
                  onChange={e => setLines(lines.map((x, j) => j === i ? { ...x, credit: e.target.value, debit: "" } : x))}
                  placeholder="0" min="0" />
                <button onClick={() => lines.length > 2 && setLines(lines.filter((_, j) => j !== i))}
                  style={{ background: "none", border: "none", cursor: lines.length > 2 ? "pointer" : "default", color: lines.length > 2 ? "#9AA5B4" : "rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MinusCircle size={14} />
                </button>
              </div>
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px 32px", gap: 8, padding: "10px 4px 4px", borderTop: "0.5px solid rgba(0,0,0,0.06)", marginTop: 4 }}>
              <p style={{ fontSize: 13, color: "#697586" }}>Total</p>
              <p style={{ fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: totalD > 0 ? "#1A2232" : "#9AA5B4", textAlign: "right" }}>{(totalD * 1_000_000).toLocaleString("id-ID")}</p>
              <p style={{ fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: totalC > 0 ? "#1A2232" : "#9AA5B4", textAlign: "right" }}>{(totalC * 1_000_000).toLocaleString("id-ID")}</p>
              <span />
            </div>
            <div style={{ padding: "6px 4px", display: "flex", alignItems: "center", gap: 8 }}>
              {totalD > 0 && (balanced
                ? <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#2D7A4F" }}><CheckCircle2 size={13} /> Jurnal seimbang</span>
                : <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#C03C3C" }}><AlertCircle size={13} /> Selisih: Rp {(Math.abs(totalD - totalC) * 1_000_000).toLocaleString("id-ID")}</span>
              )}
            </div>
            <button onClick={() => setLines([...lines, blankLine])} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, fontSize: 13, background: "transparent", border: "0.5px dashed rgba(0,0,0,0.1)", color: "#697586", cursor: "pointer", marginTop: 4 }}>
              <Plus size={11} /> Tambah Baris
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={handleSave} disabled={!balanced || !form.date || !form.description} style={{ padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: balanced && form.date && form.description ? "#2D7A4F" : "rgba(45,122,79,0.25)", color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif" }}>Simpan Jurnal</button>
            <button onClick={() => setShowForm(false)} style={{ padding: "9px 18px", borderRadius: 8, fontSize: 14, background: "transparent", border: "0.5px solid rgba(0,0,0,0.08)", color: "#697586", cursor: "pointer" }}>Batal</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ fontSize: 13, color: "#697586", marginBottom: 4 }}>{entries.length} entri jurnal</p>
        {entries.map(je => (
          <div key={je.id} style={{ ...card, cursor: "pointer", borderLeft: "3px solid rgba(45,122,79,0.25)" }}
            onClick={() => setExpanded(expanded === je.id ? null : je.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: "#2D7A4F", fontFamily: "JetBrains Mono, monospace", background: "rgba(45,122,79,0.07)", border: "0.5px solid rgba(45,122,79,0.2)", borderRadius: 4, padding: "1px 8px" }}>{je.ref}</span>
                  <span style={{ fontSize: 13, color: "rgba(0,0,0,0.25)", fontFamily: "JetBrains Mono, monospace" }}>{je.date}</span>
                </div>
                <p style={{ fontSize: 14, color: "#1A2232", fontWeight: 500 }}>{je.description}</p>
                {je.contactId && (() => {
                  const c = vendors.find(v => v.id === je.contactId);
                  return c ? <span style={{ fontSize: 12, color: CONTACT_TYPE_COLOR[c.type], background: hex(CONTACT_TYPE_COLOR[c.type], 0.08), borderRadius: 4, padding: "1px 7px", marginTop: 3, display: "inline-block" }}>{c.name}</span> : null;
                })()}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 12, flexShrink: 0 }}>
                <p style={{ fontSize: 14, color: "#697586", fontFamily: "JetBrains Mono, monospace" }}>
                  {fmtM(je.lines.reduce((s, l) => s + l.debit, 0))}
                </p>
                <button onClick={ev => { ev.stopPropagation(); apiDeleteJournalEntry(je.id).catch(() => deleteJournalEntry(je.id)); refresh(); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#697586", display: "flex", padding: 6 }}
                  onMouseOver={e => (e.currentTarget.style.color = "#ff6b6b")}
                  onMouseOut={e => (e.currentTarget.style.color = "#697586")}>
                  <Trash2 size={13} />
                </button>
                {expanded === je.id ? <ChevronUp size={15} color="#9AA5B4" /> : <ChevronDown size={15} color="#9AA5B4" />}
              </div>
            </div>
            {expanded === je.id && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "0.5px solid rgba(0,0,0,0.05)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {[["left","AKUN"], ["right","DEBIT (Rp)"], ["right","KREDIT (Rp)"]].map(([align, label]) => (
                        <th key={label} style={{ textAlign: align as "left" | "right", fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace", padding: "4px 8px", fontWeight: 400 }}>{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {je.lines.map((l, i) => {
                      const acc = accounts.find(a => a.id === l.accountId);
                      return (
                        <tr key={i} style={{ borderTop: "0.5px solid rgba(0,0,0,0.03)" }}>
                          <td style={{ padding: "6px 8px" }}>
                            <span style={{ fontSize: 13, color: "rgba(0,0,0,0.3)", fontFamily: "JetBrains Mono, monospace", marginRight: 8 }}>{acc?.code}</span>
                            <span style={{ fontSize: 14, color: l.debit > 0 ? "#1A2232" : "#9AA5B4", paddingLeft: l.debit === 0 ? 0 : 0 }}>{acc?.name || l.accountId}</span>
                          </td>
                          <td style={{ textAlign: "right", padding: "6px 8px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: l.debit > 0 ? "#1A2232" : "rgba(0,0,0,0.12)" }}>
                            {l.debit > 0 ? (l.debit * 1_000_000).toLocaleString("id-ID") : "—"}
                          </td>
                          <td style={{ textAlign: "right", padding: "6px 8px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: l.credit > 0 ? "#9AA5B4" : "rgba(0,0,0,0.12)" }}>
                            {l.credit > 0 ? (l.credit * 1_000_000).toLocaleString("id-ID") : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Ledger View ─────────────────────────────────────── */
function LedgerView() {
  const [accounts, setAccounts] = useState<ChartAccount[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selType, setSelType] = useState<AccountType | "all">("all");
  const [selAccId, setSelAccId] = useState<string>("");

  const refresh = useCallback(() => {
    apiGetChartAccounts().then(accs => { setAccounts(accs); if (!selAccId && accs.length) setSelAccId(accs[0].id); }).catch(() => { const accs = getChartAccounts(); setAccounts(accs); if (!selAccId && accs.length) setSelAccId(accs[0].id); });
    apiGetJournalEntries().then(setEntries).catch(() => setEntries(getJournalEntries()));
  }, [selAccId]);
  useEffect(() => { refresh(); }, [refresh]);

  const ledger = computeLedger(accounts, entries);
  const filteredAccounts = selType === "all" ? ledger : ledger.filter(a => a.type === selType);
  const selAcc = ledger.find(a => a.id === selAccId);

  const transactions: { je: JournalEntry; line: JournalLine }[] = [];
  entries.forEach(je => je.lines.forEach(l => { if (l.accountId === selAccId) transactions.push({ je, line: l }); }));

  let running = 0;
  const txWithBal = transactions.map(t => {
    running += selAcc?.normalBalance === "debit" ? (t.line.debit - t.line.credit) : (t.line.credit - t.line.debit);
    return { ...t, balance: running };
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {(["all", ...ACC_TYPE_ORDER] as (AccountType | "all")[]).map(type => (
          <button key={type} onClick={() => setSelType(type)} style={{
            padding: "5px 12px", borderRadius: 20, fontSize: 13, fontFamily: "JetBrains Mono, monospace",
            cursor: "pointer", border: "none",
            background: selType === type ? (type === "all" ? "#2D7A4F" : hex(ACC_TYPE_COLOR[type], 0.18)) : "rgba(0,0,0,0.03)",
            color: selType === type ? (type === "all" ? "#ffffff" : ACC_TYPE_COLOR[type]) : "#9AA5B4",
          }}>
            {type === "all" ? "SEMUA" : ACC_TYPE_LABEL[type].toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "#F4F6FB", borderRadius: 10, padding: 8, maxHeight: "60vh", overflowY: "auto", border: "1px solid #E4E8F2" }}>
          {filteredAccounts.map(a => {
            const active = selAccId === a.id;
            return (
              <button key={a.id} onClick={() => setSelAccId(a.id)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "9px 12px", borderRadius: 7, border: "none", cursor: "pointer", textAlign: "left",
                background: active ? "rgba(45,122,79,0.07)" : "transparent",
              }}
                onMouseOver={e => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.02)"; }}
                onMouseOut={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <div>
                  <p style={{ fontSize: 12, color: active ? ACC_TYPE_COLOR[a.type] : "#9AA5B4", fontFamily: "JetBrains Mono, monospace", marginBottom: 2 }}>{a.code}</p>
                  <p style={{ fontSize: 13, color: active ? "#1A2232" : "#9AA5B4", fontWeight: active ? 600 : 400 }}>{a.name}</p>
                </div>
                <p style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: a.balance !== 0 ? (active ? "#2D7A4F" : "#1A2232") : "#9AA5B4", marginLeft: 8 }}>
                  {a.balance !== 0 ? (a.balance * 1_000_000).toLocaleString("id-ID") : "—"}
                </p>
              </button>
            );
          })}
        </div>

        {selAcc && (
          <div>
            <div style={{ ...card, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 12, color: ACC_TYPE_COLOR[selAcc.type], fontFamily: "JetBrains Mono, monospace", marginBottom: 4 }}>{selAcc.code} · {ACC_TYPE_LABEL[selAcc.type].toUpperCase()}</p>
                  <p style={{ fontFamily: "Geist, sans-serif", fontWeight: 700, fontSize: 17, color: "#1A2232" }}>{selAcc.name}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 12, color: "#697586", marginBottom: 4 }}>Saldo Normal: {selAcc.normalBalance === "debit" ? "Debit" : "Kredit"}</p>
                  <p style={{ fontSize: 22, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#2D7A4F" }}>{fmtM(selAcc.balance)}</p>
                </div>
              </div>
            </div>
            {txWithBal.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#697586" }}>
                <BookOpen size={28} style={{ marginBottom: 8, opacity: 0.3 }} />
                <p style={{ fontSize: 14, fontWeight: 300 }}>Belum ada transaksi.</p>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}>
                    {[["left","TANGGAL"],["left","KETERANGAN"],["right","DEBIT"],["right","KREDIT"],["right","SALDO"]].map(([align, lbl]) => (
                      <th key={lbl} style={{ textAlign: align as "left"|"right", padding: "8px 12px", fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace", fontWeight: 400 }}>{lbl}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {txWithBal.map((t, i) => (
                    <tr key={i} style={{ borderBottom: "0.5px solid rgba(0,0,0,0.03)" }}>
                      <td style={{ padding: "8px 12px", fontSize: 13, color: "#697586", fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap" }}>{t.je.date}</td>
                      <td style={{ padding: "8px 12px", fontSize: 14, color: "#1A2232" }}>{t.je.description}</td>
                      <td style={{ textAlign: "right", padding: "8px 12px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: t.line.debit > 0 ? "#1A2232" : "rgba(0,0,0,0.1)" }}>{t.line.debit > 0 ? (t.line.debit * 1_000_000).toLocaleString("id-ID") : "—"}</td>
                      <td style={{ textAlign: "right", padding: "8px 12px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: t.line.credit > 0 ? "#9AA5B4" : "rgba(0,0,0,0.1)" }}>{t.line.credit > 0 ? (t.line.credit * 1_000_000).toLocaleString("id-ID") : "—"}</td>
                      <td style={{ textAlign: "right", padding: "8px 12px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: "#2D7A4F", fontWeight: 600 }}>{(t.balance * 1_000_000).toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Trial Balance View ──────────────────────────────── */
function TrialBalanceView() {
  const [accounts, setAccounts] = useState<ChartAccount[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const refresh = useCallback(() => {
    apiGetChartAccounts().then(setAccounts).catch(() => setAccounts(getChartAccounts()));
    apiGetJournalEntries().then(setEntries).catch(() => setEntries(getJournalEntries()));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const ledger = computeLedger(accounts, entries);
  const active = ledger.filter(a => a.totalDebit > 0 || a.totalCredit > 0);
  const grandD = active.reduce((s, a) => s + a.totalDebit, 0);
  const grandC = active.reduce((s, a) => s + a.totalCredit, 0);
  const balanced = Math.abs(grandD - grandC) < 0.001;

  type FlatRow = { kind: "header"; type: AccountType } | { kind: "row"; acc: LedgerAccount };
  const rows: FlatRow[] = [];
  ACC_TYPE_ORDER.forEach(type => {
    const typeAccs = active.filter(a => a.type === type);
    if (!typeAccs.length) return;
    rows.push({ kind: "header", type });
    typeAccs.forEach(acc => rows.push({ kind: "row", acc }));
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 8, background: balanced ? "rgba(45,122,79,0.07)" : "rgba(248,96,96,0.08)", border: `0.5px solid ${balanced ? "rgba(45,122,79,0.2)" : "rgba(248,96,96,0.2)"}` }}>
          {balanced ? <CheckCircle2 size={14} color="#2D7A4F" /> : <AlertCircle size={14} color="#C03C3C" />}
          <p style={{ fontSize: 13, color: balanced ? "#2D7A4F" : "#C03C3C", fontFamily: "JetBrains Mono, monospace" }}>
            {balanced ? "NERACA SALDO SEIMBANG" : `TIDAK SEIMBANG — SELISIH: ${fmtM(Math.abs(grandD - grandC))}`}
          </p>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
            {[["left","KODE"],["left","NAMA AKUN"],["right","DEBIT (Rp)"],["right","KREDIT (Rp)"]].map(([align, lbl]) => (
              <th key={lbl} style={{ textAlign: align as "left"|"right", padding: "10px 14px", fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace", fontWeight: 400 }}>{lbl}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => row.kind === "header" ? (
            <tr key={`h-${row.type}`}>
              <td colSpan={4} style={{ padding: "12px 14px 6px", fontSize: 12, color: ACC_TYPE_COLOR[row.type], fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", fontWeight: 700 }}>
                {ACC_TYPE_LABEL[row.type].toUpperCase()}
              </td>
            </tr>
          ) : (
            <tr key={row.acc.id} style={{ borderBottom: "0.5px solid rgba(0,0,0,0.03)" }}>
              <td style={{ padding: "7px 14px", fontSize: 13, color: "#697586", fontFamily: "JetBrains Mono, monospace" }}>{row.acc.code}</td>
              <td style={{ padding: "7px 14px", fontSize: 14, color: "#1A2232" }}>{row.acc.name}</td>
              <td style={{ textAlign: "right", padding: "7px 14px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: row.acc.totalDebit > 0 ? "#1A2232" : "rgba(0,0,0,0.1)" }}>{row.acc.totalDebit > 0 ? (row.acc.totalDebit * 1_000_000).toLocaleString("id-ID") : "—"}</td>
              <td style={{ textAlign: "right", padding: "7px 14px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", color: row.acc.totalCredit > 0 ? "#1A2232" : "rgba(0,0,0,0.1)" }}>{row.acc.totalCredit > 0 ? (row.acc.totalCredit * 1_000_000).toLocaleString("id-ID") : "—"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <td colSpan={2} style={{ padding: "12px 14px", fontSize: 13, color: "#1A2232", fontWeight: 700, fontFamily: "Geist, sans-serif" }}>TOTAL</td>
            <td style={{ textAlign: "right", padding: "12px 14px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#1A2232" }}>{(grandD * 1_000_000).toLocaleString("id-ID")}</td>
            <td style={{ textAlign: "right", padding: "12px 14px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#1A2232" }}>{(grandC * 1_000_000).toLocaleString("id-ID")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Period utilities ─────────────────────────────────── */
const MON_MAP: Record<string, number> = {
  Jan:0, Feb:1, Mar:2, Apr:3, Mei:4, Jun:5, Jul:6, Agu:7, Sep:8, Okt:9, Nov:10, Des:11,
};
const MON_ABBR = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

function parseDate(s: string): Date | null {
  const p = s.trim().split(/\s+/);
  if (p.length === 3) return new Date(+p[2], MON_MAP[p[1]] ?? 0, +p[0]);
  if (p.length === 2) return new Date(+p[1], MON_MAP[p[0]] ?? 0, 1);
  return null;
}

interface ReportPeriod {
  id: string;
  fromMonth: number; fromYear: number;
  toMonth: number;   toYear: number;
}

function periodLabel(p: ReportPeriod): string {
  if (p.fromMonth === p.toMonth && p.fromYear === p.toYear)
    return `${MON_ABBR[p.fromMonth]} ${p.fromYear}`;
  if (p.fromYear === p.toYear)
    return `${MON_ABBR[p.fromMonth]}–${MON_ABBR[p.toMonth]} ${p.fromYear}`;
  return `${MON_ABBR[p.fromMonth]} ${p.fromYear} – ${MON_ABBR[p.toMonth]} ${p.toYear}`;
}

function filterPL(entries: JournalEntry[], p: ReportPeriod): JournalEntry[] {
  const from = new Date(p.fromYear, p.fromMonth, 1);
  const to   = new Date(p.toYear, p.toMonth + 1, 0, 23, 59, 59);
  return entries.filter(e => { const d = parseDate(e.date); return d && d >= from && d <= to; });
}

function filterBS(entries: JournalEntry[], p: ReportPeriod): JournalEntry[] {
  const to = new Date(p.toYear, p.toMonth + 1, 0, 23, 59, 59);
  return entries.filter(e => { const d = parseDate(e.date); return d && d <= to; });
}

function defaultPeriod(): ReportPeriod {
  const y = new Date().getFullYear();
  return { id: "1", fromMonth: 0, fromYear: y, toMonth: 11, toYear: y };
}

function getMonthsInPeriod(p: ReportPeriod): {month: number; year: number}[] {
  const res: {month: number; year: number}[] = [];
  let m = p.fromMonth, y = p.fromYear;
  while (y < p.toYear || (y === p.toYear && m <= p.toMonth)) {
    res.push({ month: m, year: y });
    if (m === 11) { m = 0; y++; } else m++;
  }
  return res;
}

const PRESETS = [
  { label: "Tahun Ini",   fn: () => { const y = new Date().getFullYear(); return { fromMonth: 0, fromYear: y, toMonth: 11, toYear: y }; } },
  { label: "Tahun Lalu",  fn: () => { const y = new Date().getFullYear()-1; return { fromMonth: 0, fromYear: y, toMonth: 11, toYear: y }; } },
  { label: "Kuartal Ini", fn: () => { const now = new Date(); const q = Math.floor(now.getMonth()/3); return { fromMonth: q*3, fromYear: now.getFullYear(), toMonth: q*3+2, toYear: now.getFullYear() }; } },
  { label: "Kuartal Lalu",fn: () => { const now = new Date(); let q = Math.floor(now.getMonth()/3)-1; let y = now.getFullYear(); if (q<0){q=3;y--;} return { fromMonth: q*3, fromYear: y, toMonth: q*3+2, toYear: y }; } },
  { label: "Bulan Ini",   fn: () => { const now = new Date(); return { fromMonth: now.getMonth(), fromYear: now.getFullYear(), toMonth: now.getMonth(), toYear: now.getFullYear() }; } },
  { label: "Bulan Lalu",  fn: () => { let m = new Date().getMonth()-1, y = new Date().getFullYear(); if(m<0){m=11;y--;} return { fromMonth: m, fromYear: y, toMonth: m, toYear: y }; } },
];

const PERIOD_COLORS = ["#2D7A4F", "#3E7CC8", "#7050C0"];

function PeriodBar({ periods, onChange }: { periods: ReportPeriod[]; onChange: (p: ReportPeriod[]) => void }) {
  const years = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() - 4 + i);

  function update(id: string, patch: Partial<ReportPeriod>) {
    onChange(periods.map(p => p.id === id ? { ...p, ...patch } : p));
  }
  function addPeriod() {
    const prev = periods[periods.length - 1];
    const newYear = prev.fromYear - 1;
    onChange([...periods, { id: Date.now().toString(), fromMonth: prev.fromMonth, fromYear: newYear, toMonth: prev.toMonth, toYear: newYear }]);
  }
  function removePeriod(id: string) { onChange(periods.filter(p => p.id !== id)); }
  function applyPreset(id: string, preset: typeof PRESETS[0]) {
    const vals = preset.fn();
    onChange(periods.map(p => p.id === id ? { ...p, ...vals } : p));
  }

  const selStyle = (color: string): React.CSSProperties => ({
    padding: "6px 8px", borderRadius: 6, border: `1px solid ${color}20`,
    background: `${color}08`, color: "#1A2232", fontSize: 13,
    fontFamily: "DM Sans, sans-serif", cursor: "pointer", appearance: "none" as const,
  });

  return (
    <div style={{ ...card, marginBottom: 20, padding: "14px 18px" }}>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10, alignItems: "flex-start" }}>
        {periods.map((p, idx) => {
          const color = PERIOD_COLORS[idx] ?? "#697586";
          return (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const, flex: 1, minWidth: 320 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color, fontFamily: "DM Sans, sans-serif", minWidth: 64 }}>
                {periods.length > 1 ? `Periode ${idx + 1}` : "Periode"}
              </span>
              <select value={p.fromMonth} onChange={e => update(p.id, { fromMonth: +e.target.value })} style={selStyle(color)}>
                {MON_ABBR.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <select value={p.fromYear} onChange={e => update(p.id, { fromYear: +e.target.value })} style={selStyle(color)}>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <span style={{ fontSize: 12, color: "#9AA5B4" }}>s/d</span>
              <select value={p.toMonth} onChange={e => update(p.id, { toMonth: +e.target.value })} style={selStyle(color)}>
                {MON_ABBR.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <select value={p.toYear} onChange={e => update(p.id, { toYear: +e.target.value })} style={selStyle(color)}>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              {/* Presets */}
              <select defaultValue="" onChange={e => { if (e.target.value) { applyPreset(p.id, PRESETS[+e.target.value]); e.target.value = ""; } }} style={{ ...selStyle(color), color: "#697586", fontSize: 12, minWidth: 90 }}>
                <option value="">Preset...</option>
                {PRESETS.map((pr, i) => <option key={pr.label} value={i}>{pr.label}</option>)}
              </select>
              {idx > 0 && (
                <button onClick={() => removePeriod(p.id)}
                  style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(192,60,60,0.2)", background: "transparent", color: "#C03C3C", cursor: "pointer", fontSize: 12 }}>
                  ×
                </button>
              )}
            </div>
          );
        })}
        {periods.length < 3 && (
          <button onClick={addPeriod}
            style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid #D6DBE8", background: "transparent", color: "#697586", cursor: "pointer", fontSize: 13, whiteSpace: "nowrap" as const, alignSelf: "center" }}>
            + Bandingkan
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Multiperiod table helpers ──────────────────────────── */
function rpCell(v: number, color?: string): React.ReactNode {
  return (
    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: color ?? "#1A2232" }}>
      {v === 0 ? "—" : (v * 1_000_000).toLocaleString("id-ID")}
    </span>
  );
}

function changeCell(base: number, compare: number): React.ReactNode {
  if (base === 0 && compare === 0) return <span style={{ color: "#9AA5B4", fontSize: 13 }}>—</span>;
  const diff = compare - base;
  const pct  = base !== 0 ? (diff / Math.abs(base)) * 100 : null;
  const pos  = diff >= 0;
  return (
    <div style={{ textAlign: "right" as const }}>
      <div style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: pos ? "#2D7A4F" : "#C03C3C", fontWeight: 600 }}>
        {pos ? "+" : ""}{(diff * 1_000_000).toLocaleString("id-ID")}
      </div>
      {pct !== null && (
        <div style={{ fontSize: 11, color: pos ? "#2D7A4F" : "#C03C3C", opacity: 0.8 }}>
          {pos ? "+" : ""}{pct.toFixed(1)}%
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Profit & Loss View ──────────────────────────────── */
function ProfitLossView() {
  const [accounts, setAccounts] = useState<ChartAccount[]>([]);
  const [allEntries, setAllEntries] = useState<JournalEntry[]>([]);
  const [periods, setPeriods] = useState<ReportPeriod[]>([defaultPeriod()]);
  const [showMonthly, setShowMonthly] = useState(false);
  const [pdfOrientation, setPdfOrientation] = useState<"portrait" | "landscape">("portrait");

  const refresh = useCallback(() => {
    apiGetChartAccounts().then(setAccounts).catch(() => setAccounts(getChartAccounts()));
    apiGetJournalEntries().then(setAllEntries).catch(() => setAllEntries(getJournalEntries()));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const multi = periods.length > 1;

  // Compute data per period
  const perPeriod = periods.map(p => {
    const ledger = computeLedger(accounts, filterPL(allEntries, p));
    const revenues = ledger.filter(a => a.type === "revenue");
    const expenses = ledger.filter(a => a.type === "expense");
    const totalRev = revenues.reduce((s, a) => s + a.balance, 0);
    const totalExp = expenses.reduce((s, a) => s + a.balance, 0);
    return { ledger, revenues, expenses, totalRev, totalExp, net: totalRev - totalExp };
  });

  // Collect all unique account ids across periods
  const allRevIds = [...new Set(perPeriod.flatMap(d => d.revenues.map(a => a.id)))];
  const allExpIds = [...new Set(perPeriod.flatMap(d => d.expenses.map(a => a.id)))];

  // Monthly data per period (only computed when showMonthly)
  const monthlyPL = showMonthly ? periods.map(p =>
    getMonthsInPeriod(p).map(({month, year}) => {
      const mp: ReportPeriod = { id: "", fromMonth: month, fromYear: year, toMonth: month, toYear: year };
      const ldg = computeLedger(accounts, filterPL(allEntries, mp));
      return { month, year, label: multi ? `${MON_ABBR[month]}'${String(year).slice(-2)}` : MON_ABBR[month], ledger: ldg };
    })
  ) : null;

  const thStyle: React.CSSProperties = { padding: "8px 10px", fontSize: 11, color: "#697586", fontWeight: 600, fontFamily: "DM Sans, sans-serif", textAlign: "right" as const, whiteSpace: "nowrap" as const, borderBottom: "1px solid #E4E8F2" };
  const tdName: React.CSSProperties = { padding: "9px 14px", fontSize: 14, color: "#1A2232" };
  const tdVal: React.CSSProperties = { padding: "7px 10px", textAlign: "right" as const };
  const tdTotal: React.CSSProperties = { padding: "10px 10px", textAlign: "right" as const, borderTop: "1px solid #E4E8F2", fontWeight: 700 };

  function MultiSection({ title, color, ids, type }: { title: string; color: string; ids: string[]; type: "revenue"|"expense" }) {
    const periodTotals = perPeriod.map(d => type === "revenue" ? d.totalRev : d.totalExp);
    return (
      <div style={{ ...card, marginBottom: 20, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px 8px", borderBottom: "1px solid #E4E8F2", background: "#FAFBFD" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: "0.8px", fontFamily: "DM Sans, sans-serif" }}>{title}</span>
        </div>
        <div style={{ overflowX: "auto" as const }}>
        <table style={{ width: showMonthly ? "max-content" : "100%", minWidth: "100%", borderCollapse: "collapse" }}>
          <thead>
            {showMonthly && monthlyPL ? (
              <>
                {/* Row 1: period group headers */}
                <tr>
                  <th style={{ ...thStyle, textAlign: "left" as const, position: "sticky" as const, left: 0, background: "#FAFBFD", minWidth: 160, zIndex: 1 }} rowSpan={2}>Akun</th>
                  {periods.map((p, i) => {
                    const mths = monthlyPL[i];
                    return (
                      <th key={p.id} colSpan={mths.length + 1}
                        style={{ ...thStyle, textAlign: "center" as const, color: PERIOD_COLORS[i], borderLeft: i > 0 ? "2px solid #E4E8F2" : undefined, background: `${PERIOD_COLORS[i]}08` }}>
                        {periodLabel(p)}
                      </th>
                    );
                  })}
                  {multi && <th style={{ ...thStyle, borderLeft: "2px solid #E4E8F2" }} rowSpan={2}>Δ Total</th>}
                </tr>
                {/* Row 2: month sub-headers + Total per period */}
                <tr>
                  {periods.map((p, i) => {
                    const mths = monthlyPL[i];
                    return (
                      <React.Fragment key={p.id}>
                        {mths.map(m => (
                          <th key={`${m.month}-${m.year}`} style={{ ...thStyle, color: PERIOD_COLORS[i], borderLeft: m.month === mths[0].month && i > 0 ? "2px solid #E4E8F2" : undefined, background: `${PERIOD_COLORS[i]}06` }}>
                            {m.label}
                          </th>
                        ))}
                        <th style={{ ...thStyle, color: PERIOD_COLORS[i], fontWeight: 700, background: `${PERIOD_COLORS[i]}10` }}>Total</th>
                      </React.Fragment>
                    );
                  })}
                </tr>
              </>
            ) : (
              <tr>
                <th style={{ ...thStyle, textAlign: "left" as const, width: "40%" }}>Akun</th>
                {periods.map((p, i) => <th key={p.id} style={{ ...thStyle, color: PERIOD_COLORS[i] }}>{periodLabel(p)}</th>)}
                {multi && <th style={{ ...thStyle }}>Perubahan</th>}
              </tr>
            )}
          </thead>
          <tbody>
            {ids.length === 0 ? (
              <tr><td colSpan={100} style={{ padding: "12px 14px", color: "#9AA5B4", fontStyle: "italic", fontSize: 14 }}>Tidak ada transaksi.</td></tr>
            ) : ids.map(id => {
              const name = perPeriod.flatMap(d => [...d.revenues, ...d.expenses]).find(a => a.id === id)?.name ?? id;
              const periodVals = perPeriod.map(d => (type === "revenue" ? d.revenues : d.expenses).find(a => a.id === id)?.balance ?? 0);
              return (
                <tr key={id} style={{ borderBottom: "0.5px solid rgba(0,0,0,0.04)" }}>
                  <td style={{ ...tdName, position: showMonthly ? "sticky" as const : undefined, left: 0, background: "#FFFFFF", zIndex: showMonthly ? 1 : undefined }}>{name}</td>
                  {showMonthly && monthlyPL ? (
                    periods.map((p, pi) => {
                      const mths = monthlyPL[pi];
                      return (
                        <React.Fragment key={p.id}>
                          {mths.map(m => {
                            const accs = m.ledger.filter(a => a.type === type);
                            const v = accs.find(a => a.id === id)?.balance ?? 0;
                            return <td key={`${m.month}-${m.year}`} style={{ ...tdVal, borderLeft: m.month === mths[0].month && pi > 0 ? "2px solid #E4E8F2" : undefined }}>{v !== 0 ? rpCell(v, color) : <span style={{ color: "#D6DBE8", fontSize: 12 }}>—</span>}</td>;
                          })}
                          <td style={{ ...tdVal, background: `${PERIOD_COLORS[pi]}06`, fontWeight: 600 }}>{rpCell(periodVals[pi], color)}</td>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    periodVals.map((v, i) => <td key={i} style={tdVal}>{rpCell(v, color)}</td>)
                  )}
                  {multi && !showMonthly && <td style={tdVal}>{changeCell(periodVals[0], periodVals[1])}</td>}
                  {multi && showMonthly && <td style={{ ...tdVal, borderLeft: "2px solid #E4E8F2" }}>{changeCell(periodVals[0], periodVals[1])}</td>}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ ...tdTotal, textAlign: "left" as const, fontSize: 13, position: showMonthly ? "sticky" as const : undefined, left: 0, background: "#FFFFFF" }}>Total {title.split(" ")[0]}</td>
              {showMonthly && monthlyPL ? (
                periods.map((p, pi) => {
                  const mths = monthlyPL[pi];
                  return (
                    <React.Fragment key={p.id}>
                      {mths.map(m => {
                        const t = m.ledger.filter(a => a.type === type).reduce((s,a) => s+a.balance, 0);
                        return <td key={`${m.month}-${m.year}`} style={{ ...tdTotal, borderLeft: m.month === mths[0].month && pi > 0 ? "2px solid #E4E8F2" : undefined }}>
                          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color, fontWeight: 700 }}>{t > 0 ? (t*1_000_000).toLocaleString("id-ID") : "—"}</span>
                        </td>;
                      })}
                      <td style={{ ...tdTotal, background: `${PERIOD_COLORS[pi]}06` }}>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color, fontWeight: 700 }}>{(periodTotals[pi]*1_000_000).toLocaleString("id-ID")}</span>
                      </td>
                    </React.Fragment>
                  );
                })
              ) : (
                perPeriod.map((d, i) => (
                  <td key={i} style={tdTotal}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color, fontWeight: 700 }}>
                      {((type === "revenue" ? d.totalRev : d.totalExp) * 1_000_000).toLocaleString("id-ID")}
                    </span>
                  </td>
                ))
              )}
              {multi && <td style={{ ...tdTotal, borderLeft: showMonthly ? "2px solid #E4E8F2" : undefined }}>{changeCell(periodTotals[0], periodTotals[1])}</td>}
            </tr>
          </tfoot>
        </table>
        </div>{/* /overflowX */}
      </div>
    );
  }

  return (
    <div>
      {/* Period bar + toolbar */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 4 }}>
        <div style={{ flex: 1 }}><PeriodBar periods={periods} onChange={setPeriods} /></div>
        <div style={{ display: "flex", gap: 6, alignSelf: "center" }}>
          {/* Per Bulan toggle */}
          <button onClick={() => setShowMonthly(m => !m)}
            style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, border: `1px solid ${showMonthly ? "#2D7A4F" : "#D6DBE8"}`, background: showMonthly ? "rgba(45,122,79,0.07)" : "transparent", color: showMonthly ? "#2D7A4F" : "#697586", cursor: "pointer", whiteSpace: "nowrap" as const }}>
            Per Bulan
          </button>
          {/* Orientation toggle */}
          <button onClick={() => setPdfOrientation(o => o === "portrait" ? "landscape" : "portrait")}
            title={`Mode: ${pdfOrientation}`}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #D6DBE8", background: "transparent", color: "#697586", cursor: "pointer", fontSize: 12 }}>
            {pdfOrientation === "portrait" ? "↕ Portrait" : "↔ Landscape"}
          </button>
          {/* Export */}
          <button onClick={() => import("@/lib/pdfExport").then(m => m.exportProfitLoss(perPeriod[0].revenues, perPeriod[0].expenses, perPeriod[0].net, periodLabel(periods[0]), pdfOrientation))}
            style={{ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#2D7A4F", color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" as const }}>
            <BookOpen size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${periods.length}, 1fr)`, gap: 12, marginBottom: 20 }}>
        {perPeriod.map((d, i) => {
          const profitable = d.net >= 0;
          const color = PERIOD_COLORS[i];
          return (
            <div key={periods[i].id} style={{ ...card, position: "relative", overflow: "hidden", borderTop: `3px solid ${color}` }}>
              <p style={{ fontSize: 12, color: "#697586", marginBottom: 4 }}>{periodLabel(periods[i])}</p>
              <p style={{ fontSize: 22, fontFamily: "Geist, sans-serif", fontWeight: 800, color: profitable ? "#2D7A4F" : "#C03C3C", marginBottom: 8 }}>
                {profitable ? "+" : ""}{fmtM(d.net)}
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <div><p style={{ fontSize: 11, color: "#9AA5B4" }}>Pendapatan</p><p style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: "#2D7A4F", fontWeight: 600 }}>{fmtM(d.totalRev)}</p></div>
                <div><p style={{ fontSize: 11, color: "#9AA5B4" }}>Beban</p><p style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: "#B06820", fontWeight: 600 }}>{fmtM(d.totalExp)}</p></div>
              </div>
            </div>
          );
        })}
      </div>

      <MultiSection title="PENDAPATAN" color="#2D7A4F" ids={allRevIds} type="revenue" />
      <MultiSection title="BEBAN OPERASIONAL" color="#B06820" ids={allExpIds} type="expense" />

      {/* Net income row */}
      <div style={{ ...card, padding: "14px 18px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ fontSize: 14, fontWeight: 700, color: "#1A2232", width: "40%" }}>Laba / Rugi Bersih</td>
              {perPeriod.map((d, i) => (
                <td key={i} style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 16, fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: d.net >= 0 ? "#2D7A4F" : "#C03C3C" }}>
                    {d.net >= 0 ? "+" : ""}{fmtM(d.net)}
                  </span>
                </td>
              ))}
              {multi && <td style={{ textAlign: "right" }}>{changeCell(perPeriod[0].net, perPeriod[1].net)}</td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Balance Sheet View ──────────────────────────────── */
function BalanceSheetView() {
  const [accounts, setAccounts] = useState<ChartAccount[]>([]);
  const [allEntries, setAllEntries] = useState<JournalEntry[]>([]);
  const [periods, setPeriods] = useState<ReportPeriod[]>([defaultPeriod()]);
  const [showMonthly, setShowMonthly] = useState(false);
  const [pdfOrientation, setPdfOrientation] = useState<"portrait" | "landscape">("portrait");

  const refresh = useCallback(() => {
    apiGetChartAccounts().then(setAccounts).catch(() => setAccounts(getChartAccounts()));
    apiGetJournalEntries().then(setAllEntries).catch(() => setAllEntries(getJournalEntries()));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const multi = periods.length > 1;

  // Balance Sheet uses cumulative up-to-period filter
  const perPeriod = periods.map(p => {
    const ledger = computeLedger(accounts, filterBS(allEntries, p));
    const assets      = ledger.filter(a => a.type === "asset");
    const liabilities = ledger.filter(a => a.type === "liability");
    const equities    = ledger.filter(a => a.type === "equity");
    const net         = ledger.filter(a => a.type === "revenue").reduce((s, a) => s + a.balance, 0)
                      - ledger.filter(a => a.type === "expense").reduce((s, a) => s + a.balance, 0);
    const totalAsset  = assets.reduce((s, a) => s + a.balance, 0);
    const totalLiab   = liabilities.reduce((s, a) => s + a.balance, 0);
    const totalEq     = equities.reduce((s, a) => s + a.balance, 0);
    const totalPassiva = totalLiab + totalEq + net;
    const balanced    = Math.abs(totalAsset - totalPassiva) < 0.001;
    return { assets, liabilities, equities, net, totalAsset, totalLiab, totalEq, totalPassiva, balanced };
  });

  const allAssetIds = [...new Set(perPeriod.flatMap(d => d.assets.filter(a => a.balance !== 0).map(a => a.id)))];
  const allLiabIds  = [...new Set(perPeriod.flatMap(d => d.liabilities.filter(a => a.balance !== 0).map(a => a.id)))];
  const allEqIds    = [...new Set(perPeriod.flatMap(d => d.equities.filter(a => a.balance !== 0).map(a => a.id)))];

  // Monthly BS data (cumulative up to each month)
  const monthlyBS = showMonthly ? periods.map(p =>
    getMonthsInPeriod(p).map(({month, year}) => {
      const mp: ReportPeriod = { id: "", fromMonth: 0, fromYear: 2000, toMonth: month, toYear: year };
      const ldg = computeLedger(accounts, filterBS(allEntries, mp));
      return { month, year, label: multi ? `${MON_ABBR[month]}'${String(year).slice(-2)}` : MON_ABBR[month], ledger: ldg };
    })
  ) : null;

  const thStyle: React.CSSProperties = { padding: "8px 10px", fontSize: 11, color: "#697586", fontWeight: 600, fontFamily: "DM Sans, sans-serif", textAlign: "right" as const, whiteSpace: "nowrap" as const, borderBottom: "1px solid #E4E8F2" };
  const tdName: React.CSSProperties = { padding: "9px 14px", fontSize: 14, color: "#1A2232" };
  const tdVal: React.CSSProperties  = { padding: "7px 10px", textAlign: "right" as const };
  const tdTotal: React.CSSProperties = { padding: "10px 10px", textAlign: "right" as const, borderTop: "1px solid #E4E8F2", fontWeight: 700 };

  function BsTable({ title, color, ids, getter }: {
    title: string; color: string; ids: string[];
    getter: (d: typeof perPeriod[0]) => LedgerAccount[];
  }) {
    const totals = perPeriod.map(d => getter(d).reduce((s, a) => s + a.balance, 0));
    return (
      <div style={{ ...card, marginBottom: 16, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "11px 16px 8px", background: "#FAFBFD", borderBottom: "1px solid #E4E8F2" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: "0.8px" }}>{title}</span>
        </div>
        <div style={{ overflowX: "auto" as const }}>
        <table style={{ width: showMonthly ? "max-content" : "100%", minWidth: "100%", borderCollapse: "collapse" }}>
          <thead>
            {showMonthly && monthlyBS ? (
              <>
                <tr>
                  <th style={{ ...thStyle, textAlign: "left" as const, position: "sticky" as const, left: 0, background: "#FAFBFD", minWidth: 160, zIndex: 1 }} rowSpan={2}>Akun</th>
                  {periods.map((p, i) => {
                    const mths = monthlyBS[i];
                    return (
                      <th key={p.id} colSpan={mths.length + 1}
                        style={{ ...thStyle, textAlign: "center" as const, color: PERIOD_COLORS[i], borderLeft: i > 0 ? "2px solid #E4E8F2" : undefined, background: `${PERIOD_COLORS[i]}08` }}>
                        {periodLabel(p)}
                      </th>
                    );
                  })}
                  {multi && <th style={{ ...thStyle, borderLeft: "2px solid #E4E8F2" }} rowSpan={2}>Δ</th>}
                </tr>
                <tr>
                  {periods.map((p, i) => {
                    const mths = monthlyBS[i];
                    return (
                      <React.Fragment key={p.id}>
                        {mths.map(m => (
                          <th key={`${m.month}-${m.year}`} style={{ ...thStyle, color: PERIOD_COLORS[i], borderLeft: m.month === mths[0].month && i > 0 ? "2px solid #E4E8F2" : undefined }}>
                            {m.label}
                          </th>
                        ))}
                        <th style={{ ...thStyle, color: PERIOD_COLORS[i], fontWeight: 700, background: `${PERIOD_COLORS[i]}10` }}>Total</th>
                      </React.Fragment>
                    );
                  })}
                </tr>
              </>
            ) : (
              <tr>
                <th style={{ ...thStyle, textAlign: "left" as const, width: "40%" }}>Akun</th>
                {periods.map((p, i) => <th key={p.id} style={{ ...thStyle, color: PERIOD_COLORS[i] }}>Per {MON_ABBR[p.toMonth]} {p.toYear}</th>)}
                {multi && <th style={thStyle}>Perubahan</th>}
              </tr>
            )}
          </thead>
          <tbody>
            {ids.length === 0 ? (
              <tr><td colSpan={100} style={{ padding: "12px 14px", color: "#9AA5B4", fontStyle: "italic", fontSize: 14 }}>Tidak ada saldo.</td></tr>
            ) : ids.map(id => {
              const name = perPeriod.flatMap(d => getter(d)).find(a => a.id === id)?.name ?? id;
              const vals = perPeriod.map(d => getter(d).find(a => a.id === id)?.balance ?? 0);
              return (
                <tr key={id} style={{ borderBottom: "0.5px solid rgba(0,0,0,0.04)" }}>
                  <td style={{ ...tdName, position: showMonthly ? "sticky" as const : undefined, left: 0, background: "#FFFFFF", zIndex: showMonthly ? 1 : undefined }}>{name}</td>
                  {showMonthly && monthlyBS ? (
                    periods.map((p, pi) => {
                      const mths = monthlyBS[pi];
                      return (
                        <React.Fragment key={p.id}>
                          {mths.map(m => {
                            const v = getter({ assets: m.ledger.filter(a => a.type === "asset"), liabilities: m.ledger.filter(a => a.type === "liability"), equities: m.ledger.filter(a => a.type === "equity"), net: 0, totalAsset: 0, totalLiab: 0, totalEq: 0, totalPassiva: 0, balanced: true }).find(a => a.id === id)?.balance ?? 0;
                            return <td key={`${m.month}-${m.year}`} style={{ ...tdVal, borderLeft: m.month === mths[0].month && pi > 0 ? "2px solid #E4E8F2" : undefined }}>{v !== 0 ? rpCell(v, color) : <span style={{ color: "#D6DBE8", fontSize: 12 }}>—</span>}</td>;
                          })}
                          <td style={{ ...tdVal, background: `${PERIOD_COLORS[pi]}06`, fontWeight: 600 }}>{rpCell(vals[pi], color)}</td>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    vals.map((v, i) => <td key={i} style={tdVal}>{rpCell(v, v !== 0 ? color : undefined)}</td>)
                  )}
                  {multi && <td style={{ ...tdVal, borderLeft: showMonthly ? "2px solid #E4E8F2" : undefined }}>{changeCell(vals[0], vals[1])}</td>}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ ...tdTotal, textAlign: "left" as const, fontSize: 13, position: showMonthly ? "sticky" as const : undefined, left: 0, background: "#FFFFFF" }}>Total {title}</td>
              {showMonthly && monthlyBS ? (
                periods.map((p, pi) => {
                  const mths = monthlyBS[pi];
                  return (
                    <React.Fragment key={p.id}>
                      {mths.map(m => {
                        const t = getter({ assets: m.ledger.filter(a => a.type === "asset"), liabilities: m.ledger.filter(a => a.type === "liability"), equities: m.ledger.filter(a => a.type === "equity"), net: 0, totalAsset: 0, totalLiab: 0, totalEq: 0, totalPassiva: 0, balanced: true }).reduce((s, a) => s + a.balance, 0);
                        return <td key={`${m.month}-${m.year}`} style={{ ...tdTotal, borderLeft: m.month === mths[0].month && pi > 0 ? "2px solid #E4E8F2" : undefined }}>
                          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color, fontWeight: 700 }}>{t !== 0 ? (t*1_000_000).toLocaleString("id-ID") : "—"}</span>
                        </td>;
                      })}
                      <td style={{ ...tdTotal, background: `${PERIOD_COLORS[pi]}06` }}>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color, fontWeight: 700 }}>{(totals[pi]*1_000_000).toLocaleString("id-ID")}</span>
                      </td>
                    </React.Fragment>
                  );
                })
              ) : (
                totals.map((t, i) => (
                  <td key={i} style={tdTotal}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color, fontWeight: 700 }}>
                      {(t * 1_000_000).toLocaleString("id-ID")}
                    </span>
                  </td>
                ))
              )}
              {multi && <td style={{ ...tdTotal, borderLeft: showMonthly ? "2px solid #E4E8F2" : undefined }}>{changeCell(totals[0], totals[1])}</td>}
            </tr>
          </tfoot>
        </table>
        </div>{/* /overflowX */}
      </div>
    );
  }

  return (
    <div>
      {/* Period bar + toolbar */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 4 }}>
        <div style={{ flex: 1 }}><PeriodBar periods={periods} onChange={setPeriods} /></div>
        <div style={{ display: "flex", gap: 6, alignSelf: "center" }}>
          <button onClick={() => setShowMonthly(m => !m)}
            style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, border: `1px solid ${showMonthly ? "#3E7CC8" : "#D6DBE8"}`, background: showMonthly ? "rgba(62,124,200,0.07)" : "transparent", color: showMonthly ? "#3E7CC8" : "#697586", cursor: "pointer", whiteSpace: "nowrap" as const }}>
            Per Bulan
          </button>
          <button onClick={() => setPdfOrientation(o => o === "portrait" ? "landscape" : "portrait")}
            title={`Mode: ${pdfOrientation}`}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #D6DBE8", background: "transparent", color: "#697586", cursor: "pointer", fontSize: 12 }}>
            {pdfOrientation === "portrait" ? "↕ Portrait" : "↔ Landscape"}
          </button>
          <button onClick={() => import("@/lib/pdfExport").then(m => m.exportBalanceSheet(perPeriod[0].assets, perPeriod[0].liabilities, perPeriod[0].equities, perPeriod[0].net, `${MON_ABBR[periods[0].toMonth]} ${periods[0].toYear}`, pdfOrientation))}
            style={{ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#3E7CC8", color: "#ffffff", border: "none", cursor: "pointer", fontFamily: "Geist, sans-serif", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" as const }}>
            <BookOpen size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Balance status chips */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" as const }}>
        {perPeriod.map((d, i) => (
          <div key={periods[i].id} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 8, background: d.balanced ? "rgba(45,122,79,0.07)" : "rgba(192,60,60,0.08)", border: `1px solid ${d.balanced ? "rgba(45,122,79,0.2)" : "rgba(192,60,60,0.2)"}` }}>
            {d.balanced ? <CheckCircle2 size={13} color="#2D7A4F" /> : <AlertCircle size={13} color="#C03C3C" />}
            <span style={{ fontSize: 12, color: d.balanced ? "#2D7A4F" : "#C03C3C", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>
              {periodLabel(periods[i])}: {d.balanced ? "Seimbang" : `Selisih ${fmtM(Math.abs(d.totalAsset - d.totalPassiva))}`}
            </span>
          </div>
        ))}
      </div>

      {/* AKTIVA */}
      <BsTable title="AKTIVA" color="#3E7CC8" ids={allAssetIds} getter={d => d.assets} />

      {/* Total Aktiva row */}
      <div style={{ ...card, padding: "12px 18px", marginBottom: 24, borderLeft: "3px solid #3E7CC8" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody><tr>
            <td style={{ fontSize: 14, fontWeight: 700, color: "#1A2232", width: "40%" }}>TOTAL AKTIVA</td>
            {perPeriod.map((d, i) => (
              <td key={i} style={{ textAlign: "right" }}>
                <span style={{ fontSize: 16, fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: "#3E7CC8" }}>{fmtM(d.totalAsset)}</span>
              </td>
            ))}
            {multi && <td style={{ textAlign: "right" }}>{changeCell(perPeriod[0].totalAsset, perPeriod[1].totalAsset)}</td>}
          </tr></tbody>
        </table>
      </div>

      {/* KEWAJIBAN + EKUITAS */}
      <BsTable title="KEWAJIBAN" color="#C03C3C" ids={allLiabIds} getter={d => d.liabilities} />
      <BsTable title="EKUITAS" color="#7050C0" ids={allEqIds} getter={d => d.equities} />

      {/* Laba/Rugi Berjalan */}
      <div style={{ ...card, marginBottom: 16, padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody><tr style={{ background: "#FAFBFD" }}>
            <td style={{ padding: "11px 16px", fontSize: 13, color: "#697586", width: "40%" }}>Laba/(Rugi) Berjalan</td>
            {perPeriod.map((d, i) => (
              <td key={i} style={{ padding: "11px 16px", textAlign: "right" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: 600, color: d.net >= 0 ? "#2D7A4F" : "#C03C3C" }}>{fmtM(d.net)}</span>
              </td>
            ))}
            {multi && <td style={{ padding: "11px 16px", textAlign: "right" }}>{changeCell(perPeriod[0].net, perPeriod[1].net)}</td>}
          </tr></tbody>
        </table>
      </div>

      {/* Total Pasiva row */}
      <div style={{ ...card, padding: "12px 18px", borderLeft: "3px solid #7050C0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody><tr>
            <td style={{ fontSize: 14, fontWeight: 700, color: "#1A2232", width: "40%" }}>TOTAL KEWAJIBAN + EKUITAS</td>
            {perPeriod.map((d, i) => (
              <td key={i} style={{ textAlign: "right" }}>
                <span style={{ fontSize: 16, fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: "#7050C0" }}>{fmtM(d.totalPassiva)}</span>
              </td>
            ))}
            {multi && <td style={{ textAlign: "right" }}>{changeCell(perPeriod[0].totalPassiva, perPeriod[1].totalPassiva)}</td>}
          </tr></tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Vendor & Customer View ──────────────────────────── */
const CONTACT_TYPE_LABEL: Record<ContactType, string> = {
  vendor: "Vendor", customer: "Customer", both: "Vendor & Customer",
};
const CONTACT_TYPE_COLOR: Record<ContactType, string> = {
  vendor: "#3E7CC8", customer: "#2D7A4F", both: "#7050C0",
};

function VendorView() {
  const blank: Omit<VendorRecord, "id"> = { code: "", name: "", type: "vendor", phone: "", email: "", address: "", notes: "" };
  const [vendors, setVendors] = useState<VendorRecord[]>([]);
  const [form, setForm] = useState<Omit<VendorRecord, "id">>(blank);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<ContactType | "all">("all");

  const refresh = useCallback(() => { apiGetVendors().then(setVendors).catch(() => setVendors(getVendors())); }, []);
  useEffect(() => { refresh(); }, [refresh]);

  function handleSave() {
    if (!form.name.trim()) return;
    const rec: VendorRecord = { ...form, id: editId || Date.now().toString() };
    apiSaveVendor(rec).catch(() => saveVendor(rec));
    setForm(blank); setEditId(null); refresh();
  }

  function handleEdit(v: VendorRecord) {
    setForm({ code: v.code, name: v.name, type: v.type, phone: v.phone || "", email: v.email || "", address: v.address || "", notes: v.notes || "" });
    setEditId(v.id);
  }

  function handleDelete(id: string) {
    apiDeleteVendor(id).catch(() => deleteVendor(id));
    if (editId === id) { setForm(blank); setEditId(null); }
    refresh();
  }

  function autoCode() {
    const prefix = form.type === "vendor" ? "V" : form.type === "customer" ? "C" : "VC";
    const existing = vendors.filter(v => v.code.startsWith(prefix));
    const nums = existing.map(v => parseInt(v.code.replace(prefix, ""))).filter(n => !isNaN(n));
    const next = nums.length === 0 ? 1 : Math.max(...nums) + 1;
    setForm(f => ({ ...f, code: `${prefix}-${String(next).padStart(4, "0")}` }));
  }

  const filtered = vendors
    .filter(v => filterType === "all" || v.type === filterType)
    .filter(v => !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, alignItems: "start" }}>
      {/* ── Form ── */}
      <div style={{ ...card, position: "sticky" as const, top: 0 }}>
        <p style={{ fontFamily: "Geist, sans-serif", fontWeight: 700, fontSize: 15, color: "#1A2232", marginBottom: 18 }}>
          {editId ? "Edit Kontak" : "Tambah Kontak"}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <div>
            <label style={label12}>Tipe</label>
            <select style={{ ...inp, appearance: "none" as const }} value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value as ContactType, code: "" })}>
              {(["vendor", "customer", "both"] as ContactType[]).map(t => (
                <option key={t} value={t}>{CONTACT_TYPE_LABEL[t]}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={label12}>Kode</label>
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...inp, flex: 1 }} value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="V-0001" />
              <button onClick={autoCode}
                style={{ padding: "0 12px", borderRadius: 8, border: "1px solid rgba(45,122,79,0.25)", background: "rgba(45,122,79,0.06)", color: "#2D7A4F", fontSize: 12, cursor: "pointer", fontFamily: "JetBrains Mono, monospace" }}>
                Auto
              </button>
            </div>
          </div>
          <div>
            <label style={label12}>Nama *</label>
            <input style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="PT. Mitra Sejati" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={label12}>Telepon</label>
              <input style={inp} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+62 21 xxx" />
            </div>
            <div>
              <label style={label12}>Email</label>
              <input style={inp} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="kontak@..." />
            </div>
          </div>
          <div>
            <label style={label12}>Alamat</label>
            <input style={inp} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Jl. ..." />
          </div>
          <div>
            <label style={label12}>Catatan</label>
            <input style={inp} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Opsional" />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button onClick={handleSave} disabled={!form.name.trim()}
              style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: form.name.trim() ? "pointer" : "default",
                background: form.name.trim() ? "#2D7A4F" : "rgba(45,122,79,0.25)",
                color: "#ffffff", fontWeight: 700, fontSize: 14, fontFamily: "Geist, sans-serif" }}>
              {editId ? "Simpan" : "Tambah"}
            </button>
            {editId && (
              <button onClick={() => { setForm(blank); setEditId(null); }}
                style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid #E4E8F2", background: "transparent", color: "#697586", fontSize: 14, cursor: "pointer" }}>
                Batal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── List ── */}
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" as const }}>
          <input style={{ ...inp, maxWidth: 220, padding: "8px 12px" }} value={search}
            onChange={e => setSearch(e.target.value)} placeholder="Cari nama / kode..." />
          {(["all", "vendor", "customer", "both"] as (ContactType | "all")[]).map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              style={{ padding: "7px 14px", borderRadius: 20, fontSize: 13, border: "none", cursor: "pointer",
                background: filterType === t ? (t === "all" ? "#2D7A4F" : hex(CONTACT_TYPE_COLOR[t as ContactType], 0.12)) : "rgba(0,0,0,0.04)",
                color: filterType === t ? (t === "all" ? "#ffffff" : CONTACT_TYPE_COLOR[t as ContactType]) : "#697586" }}>
              {t === "all" ? "Semua" : CONTACT_TYPE_LABEL[t as ContactType]}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ ...card, textAlign: "center", padding: "48px 0", color: "#9AA5B4" }}>
            <Users size={32} style={{ marginBottom: 10, opacity: 0.3 }} />
            <p style={{ fontSize: 14, color: "#697586" }}>Belum ada vendor / customer.</p>
          </div>
        ) : (
          <div style={{ ...card, padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E4E8F2", background: "#FAFBFD" }}>
                  {[["left","KODE"],["left","NAMA"],["left","TIPE"],["left","KONTAK"],["right",""]].map(([a, l]) => (
                    <th key={l} style={{ textAlign: a as "left"|"right", padding: "12px 16px", fontSize: 11, color: "#697586", fontFamily: "DM Sans, sans-serif", fontWeight: 600, letterSpacing: "0.5px" }}>{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => (
                  <tr key={v.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: editId === v.id ? "rgba(45,122,79,0.03)" : "transparent" }}>
                    <td style={{ padding: "11px 16px", fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace" }}>{v.code || "—"}</td>
                    <td style={{ padding: "11px 16px" }}>
                      <p style={{ fontSize: 14, color: "#1A2232", fontWeight: 500 }}>{v.name}</p>
                      {v.address && <p style={{ fontSize: 12, color: "#9AA5B4", marginTop: 2 }}>{v.address}</p>}
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <span style={{ fontSize: 12, padding: "3px 9px", borderRadius: 5,
                        background: hex(CONTACT_TYPE_COLOR[v.type], 0.1),
                        color: CONTACT_TYPE_COLOR[v.type], fontWeight: 500 }}>
                        {CONTACT_TYPE_LABEL[v.type]}
                      </span>
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      {v.email && <p style={{ fontSize: 13, color: "#697586" }}>{v.email}</p>}
                      {v.phone && <p style={{ fontSize: 12, color: "#9AA5B4" }}>{v.phone}</p>}
                    </td>
                    <td style={{ padding: "11px 16px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                        <button onClick={() => handleEdit(v)}
                          style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #E4E8F2", background: "transparent", color: "#697586", cursor: "pointer" }}>
                          <Edit2 size={12} />
                        </button>
                        <button onClick={() => handleDelete(v.id)}
                          style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid rgba(192,60,60,0.2)", background: "transparent", color: "#C03C3C", cursor: "pointer" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{ fontSize: 12, color: "#9AA5B4", marginTop: 10 }}>{filtered.length} kontak · {vendors.length} total</p>
      </div>
    </div>
  );
}

/* ─── Chart of Accounts View ──────────────────────────── */
const NB_DEFAULT: Record<AccountType, "debit" | "credit"> = {
  asset: "debit", expense: "debit", liability: "credit", equity: "credit", revenue: "credit",
};
const TYPE_PREFIX: Record<AccountType, string> = {
  asset: "1", liability: "2", equity: "3", revenue: "4", expense: "5",
};

function suggestCode(type: AccountType, parentId: string | undefined, accounts: ChartAccount[]): string {
  const pfx = TYPE_PREFIX[type];
  if (parentId) {
    const parent = accounts.find(a => a.id === parentId);
    if (!parent) return "";
    const groupPrefix = parent.code.slice(0, 4); // e.g. "1-11"
    const subs = accounts.filter(a => a.parentId === parentId);
    if (subs.length === 0) return `${groupPrefix}10`;
    const maxSeq = Math.max(...subs.map(a => parseInt(a.code.slice(-2)) || 0));
    return `${groupPrefix}${String(maxSeq + 10).padStart(2, "0")}`;
  }
  // Main account: find max code of same type with no parent, add 100
  const mains = accounts.filter(a => a.type === type && !a.parentId);
  if (mains.length === 0) return `${pfx}-1100`;
  const nums = mains.map(a => parseInt(a.code.replace("-", ""))).filter(n => !isNaN(n));
  if (nums.length === 0) return `${pfx}-1100`;
  const next = Math.max(...nums) + 100;
  const s = String(next); // e.g. "11200"
  return `${s[0]}-${s.slice(1)}`;
}

function COAView() {
  const blank: Omit<ChartAccount, "id"> = { code: "", name: "", type: "asset", normalBalance: "debit", parentId: undefined };
  const [accounts, setAccounts] = useState<ChartAccount[]>([]);
  const [form, setForm] = useState<Omit<ChartAccount, "id">>(blank);
  const [editId, setEditId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<AccountType | "all">("all");
  const [search, setSearch] = useState("");

  const refresh = useCallback(() => { apiGetChartAccounts().then(setAccounts).catch(() => setAccounts(getChartAccounts())); }, []);
  useEffect(() => { refresh(); }, [refresh]);

  function handleAutoCode() {
    setForm(f => ({ ...f, code: suggestCode(f.type, f.parentId, accounts) }));
  }

  function handleSave() {
    if (!form.code.trim() || !form.name.trim()) return;
    const acc: ChartAccount = { ...form, id: editId || Date.now().toString() };
    apiSaveChartAccount(acc).catch(() => saveChartAccount(acc));
    setForm(blank);
    setEditId(null);
    refresh();
  }

  function handleEdit(a: ChartAccount) {
    setForm({ code: a.code, name: a.name, type: a.type, normalBalance: a.normalBalance, parentId: a.parentId });
    setEditId(a.id);
  }

  function handleAddSub(parent: ChartAccount) {
    const suggested = suggestCode(parent.type, parent.id, accounts);
    setForm({ code: suggested, name: "", type: parent.type, normalBalance: parent.normalBalance, parentId: parent.id });
    setEditId(null);
  }

  function handleDelete(id: string) {
    apiDeleteChartAccount(id).catch(() => deleteChartAccount(id));
    if (editId === id) { setForm(blank); setEditId(null); }
    refresh();
  }

  const selectedParent = accounts.find(a => a.id === form.parentId);

  // Build tree: main → subs, filtered and searched
  const matchSearch = (a: ChartAccount) =>
    !search || a.code.toLowerCase().includes(search.toLowerCase()) || a.name.toLowerCase().includes(search.toLowerCase());

  const typesToShow = filterType === "all" ? ACC_TYPE_ORDER : [filterType];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24, alignItems: "start" }}>
      {/* ── Form ── */}
      <div style={{ ...card, position: "sticky" as const, top: 0 }}>
        <p style={{ fontFamily: "Geist, sans-serif", fontWeight: 700, fontSize: 15, color: "#1A2232", marginBottom: 18 }}>
          {editId ? "Edit Akun" : "Tambah Akun"}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Tipe */}
          <div>
            <label style={label12}>Tipe Akun</label>
            <select style={{ ...inp, appearance: "none" as const, opacity: selectedParent ? 0.5 : 1 }}
              value={form.type} disabled={!!selectedParent}
              onChange={e => {
                const t = e.target.value as AccountType;
                setForm({ ...form, type: t, normalBalance: NB_DEFAULT[t], parentId: undefined, code: "" });
              }}>
              {ACC_TYPE_ORDER.map(t => <option key={t} value={t}>{ACC_TYPE_LABEL[t]}</option>)}
            </select>
          </div>

          {/* Induk Akun */}
          <div>
            <label style={label12}>Induk Akun <span style={{ color: "#697586" }}>(opsional — kosongkan untuk akun utama)</span></label>
            <select style={{ ...inp, appearance: "none" as const }} value={form.parentId || ""}
              onChange={e => {
                const pid = e.target.value || undefined;
                const parent = accounts.find(a => a.id === pid);
                setForm(f => ({
                  ...f,
                  parentId: pid,
                  type: parent ? parent.type : f.type,
                  normalBalance: parent ? parent.normalBalance : NB_DEFAULT[f.type],
                  code: "",
                }));
              }}>
              <option value="">— Akun Utama (tidak ada induk) —</option>
              {accounts.filter(a => !a.parentId).map(a => (
                <option key={a.id} value={a.id}>{a.code} — {a.name}</option>
              ))}
            </select>
          </div>

          {/* Kode Akun + Auto */}
          <div>
            <label style={label12}>Kode Akun *</label>
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...inp, flex: 1 }} value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value })}
                placeholder={form.parentId ? (selectedParent ? `${selectedParent.code.slice(0,4)}10` : "1-1110") : "1-1100"} />
              <button onClick={handleAutoCode}
                title="Generate kode otomatis"
                style={{ padding: "0 12px", borderRadius: 8, border: "0.5px solid rgba(45,122,79,0.25)", background: "rgba(45,122,79,0.06)", color: "#2D7A4F", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" as const, fontFamily: "JetBrains Mono, monospace" }}>
                Auto
              </button>
            </div>
            {/* guidance */}
            <p style={{ fontSize: 12, color: "#697586", marginTop: 5, fontFamily: "JetBrains Mono, monospace", lineHeight: 1.6 }}>
              {form.parentId
                ? `Sub-akun dari ${selectedParent?.code} · format: ${selectedParent?.code.slice(0,4) || "X-XX"}10, ${selectedParent?.code.slice(0,4) || "X-XX"}20, …`
                : `Akun utama ${ACC_TYPE_LABEL[form.type]} · format: ${TYPE_PREFIX[form.type]}-XX00 · contoh: ${TYPE_PREFIX[form.type]}-1100`
              }
            </p>
          </div>

          {/* Nama */}
          <div>
            <label style={label12}>Nama Akun *</label>
            <input style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Kas" />
          </div>

          {/* Saldo Normal */}
          <div>
            <label style={label12}>Saldo Normal</label>
            <select style={{ ...inp, appearance: "none" as const }} value={form.normalBalance}
              onChange={e => setForm({ ...form, normalBalance: e.target.value as "debit" | "credit" })}>
              <option value="debit">Debit</option>
              <option value="credit">Kredit</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button onClick={handleSave} disabled={!form.code.trim() || !form.name.trim()}
              style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none",
                cursor: form.code.trim() && form.name.trim() ? "pointer" : "default",
                background: form.code.trim() && form.name.trim() ? "#2D7A4F" : "rgba(45,122,79,0.25)",
                color: "#ffffff", fontWeight: 700, fontSize: 14, fontFamily: "DM Sans, sans-serif" }}>
              {editId ? "Simpan Perubahan" : "Tambah Akun"}
            </button>
            {(editId || form.parentId || form.code || form.name) && (
              <button onClick={() => { setForm(blank); setEditId(null); }}
                style={{ padding: "10px 16px", borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.08)", background: "transparent", color: "#697586", fontSize: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Tree List ── */}
      <div>
        {/* Filter + Search */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" as const }}>
          <input style={{ ...inp, maxWidth: 200, padding: "8px 12px" }} value={search}
            onChange={e => setSearch(e.target.value)} placeholder="Cari kode / nama..." />
          {(["all", ...ACC_TYPE_ORDER] as (AccountType | "all")[]).map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              style={{ padding: "7px 14px", borderRadius: 20, fontSize: 13, border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif",
                background: filterType === t ? (t === "all" ? "#2D7A4F" : hex(ACC_TYPE_COLOR[t], 0.18)) : "rgba(0,0,0,0.03)",
                color: filterType === t ? (t === "all" ? "#ffffff" : ACC_TYPE_COLOR[t]) : "#9AA5B4" }}>
              {t === "all" ? "SEMUA" : ACC_TYPE_LABEL[t]}
            </button>
          ))}
        </div>

        {typesToShow.map(type => {
          const mains = accounts
            .filter(a => a.type === type && !a.parentId)
            .filter(a => search ? matchSearch(a) || accounts.some(s => s.parentId === a.id && matchSearch(s)) : true)
            .sort((a, b) => a.code.localeCompare(b.code));
          if (mains.length === 0) return null;

          return (
            <div key={type} style={{ marginBottom: 20 }}>
              {/* Type header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: ACC_TYPE_COLOR[type], fontFamily: "JetBrains Mono, monospace", letterSpacing: "1.5px", fontWeight: 700 }}>
                  {ACC_TYPE_LABEL[type].toUpperCase()}
                </span>
                <div style={{ flex: 1, height: "0.5px", background: hex(ACC_TYPE_COLOR[type], 0.2) }} />
                <span style={{ fontSize: 12, color: ACC_TYPE_COLOR[type], fontFamily: "JetBrains Mono, monospace" }}>
                  {accounts.filter(a => a.type === type).length} akun
                </span>
              </div>

              <div style={{ ...card, padding: 0, overflow: "hidden" }}>
                {mains.map((main, mi) => {
                  const subs = accounts
                    .filter(a => a.parentId === main.id)
                    .filter(a => !search || matchSearch(a))
                    .sort((a, b) => a.code.localeCompare(b.code));
                  const isLast = mi === mains.length - 1;

                  return (
                    <div key={main.id}>
                      {/* Main account row */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "11px 16px",
                        borderBottom: (!isLast || subs.length > 0) ? "0.5px solid rgba(0,0,0,0.04)" : "none",
                        background: editId === main.id ? "rgba(184,245,58,0.04)" : "transparent",
                      }}>
                        <span style={{ fontSize: 13, color: ACC_TYPE_COLOR[type], fontFamily: "JetBrains Mono, monospace", minWidth: 68, fontWeight: 600 }}>{main.code}</span>
                        <span style={{ fontSize: 14, color: "#1A2232", flex: 1, fontWeight: 500 }}>{main.name}</span>
                        {subs.length > 0 && (
                          <span style={{ fontSize: 12, padding: "2px 7px", borderRadius: 4, background: hex(ACC_TYPE_COLOR[type], 0.1), color: ACC_TYPE_COLOR[type], fontFamily: "JetBrains Mono, monospace" }}>
                            {subs.length} sub
                          </span>
                        )}
                        <span style={{ fontSize: 13, color: main.normalBalance === "debit" ? "#3E7CC8" : "#2D7A4F", fontFamily: "JetBrains Mono, monospace", minWidth: 44 }}>
                          {main.normalBalance === "debit" ? "Dr" : "Cr"}
                        </span>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => handleAddSub(main)} title="Tambah sub-akun"
                            style={{ padding: "4px 8px", borderRadius: 5, fontSize: 12, border: `0.5px solid ${hex(ACC_TYPE_COLOR[type], 0.3)}`, background: hex(ACC_TYPE_COLOR[type], 0.06), color: ACC_TYPE_COLOR[type], cursor: "pointer", fontFamily: "JetBrains Mono, monospace" }}>
                            + Sub
                          </button>
                          <button onClick={() => handleEdit(main)}
                            style={{ padding: "4px 8px", borderRadius: 5, border: "0.5px solid rgba(0,0,0,0.06)", background: "transparent", color: "#697586", cursor: "pointer" }}>
                            <Edit2 size={11} />
                          </button>
                          <button onClick={() => handleDelete(main.id)}
                            style={{ padding: "4px 8px", borderRadius: 5, border: "0.5px solid rgba(248,96,96,0.15)", background: "transparent", color: "#C03C3C", cursor: "pointer" }}>
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>

                      {/* Sub-account rows */}
                      {subs.map((sub, si) => (
                        <div key={sub.id} style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "9px 16px 9px 36px",
                          borderBottom: (si < subs.length - 1 || !isLast) ? "0.5px solid rgba(0,0,0,0.03)" : "none",
                          background: editId === sub.id ? "rgba(45,122,79,0.04)" : "#FAFBFD",
                        }}>
                          <span style={{ fontSize: 12, color: "#697586", fontFamily: "JetBrains Mono, monospace", marginRight: 2 }}>↳</span>
                          <span style={{ fontSize: 13, color: "#697586", fontFamily: "JetBrains Mono, monospace", minWidth: 68 }}>{sub.code}</span>
                          <span style={{ fontSize: 13, color: "rgba(242,245,239,0.75)", flex: 1 }}>{sub.name}</span>
                          <span style={{ fontSize: 13, color: sub.normalBalance === "debit" ? "#3E7CC8" : "#2D7A4F", fontFamily: "JetBrains Mono, monospace", minWidth: 44 }}>
                            {sub.normalBalance === "debit" ? "Dr" : "Cr"}
                          </span>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button onClick={() => handleEdit(sub)}
                              style={{ padding: "4px 8px", borderRadius: 5, border: "0.5px solid rgba(0,0,0,0.06)", background: "transparent", color: "#697586", cursor: "pointer" }}>
                              <Edit2 size={11} />
                            </button>
                            <button onClick={() => handleDelete(sub.id)}
                              style={{ padding: "4px 8px", borderRadius: 5, border: "0.5px solid rgba(248,96,96,0.15)", background: "transparent", color: "#C03C3C", cursor: "pointer" }}>
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <p style={{ fontSize: 13, color: "#697586", marginTop: 8 }}>
          {accounts.filter(a => !a.parentId).length} akun utama · {accounts.filter(a => !!a.parentId).length} sub-akun · {accounts.length} total
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Main Dashboard ───────────────────────────────────── */
export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>("sub:all");
  const [subOpen, setSubOpen] = useState(true);
  const [finOpen, setFinOpen] = useState(true);
  const [kontOpen, setKontOpen] = useState(true);
  const [accOpen, setAccOpen] = useState(true);
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/admin/login"); return; }
    setSubCount(getSubmissions().length);
    setReady(true);
  }, [router]);

  if (!ready) return null;

  const handleLogout = () => { logout(); router.push("/admin/login"); };

  const viewMeta: Record<View, { label: string; breadcrumb: string }> = {
    "sub:all": { label: "Semua Submission", breadcrumb: "SUBMISSIONS / SEMUA" },
    "sub:contact": { label: FORM_LABELS["contact"], breadcrumb: "SUBMISSIONS / CONTACT" },
    "sub:schedule-meeting": { label: FORM_LABELS["schedule-meeting"], breadcrumb: "SUBMISSIONS / MEETING" },
    "sub:apply-partnership": { label: FORM_LABELS["apply-partnership"], breadcrumb: "SUBMISSIONS / KEMITRAAN" },
    "sub:register-product": { label: FORM_LABELS["register-product"], breadcrumb: "SUBMISSIONS / PRODUK" },
    "sub:apply-ev-credit": { label: FORM_LABELS["apply-ev-credit"], breadcrumb: "SUBMISSIONS / KREDIT EV" },
    "sub:register-vehicle": { label: FORM_LABELS["register-vehicle"], breadcrumb: "SUBMISSIONS / KENDARAAN" },
    "sub:buy-carbon-credit": { label: FORM_LABELS["buy-carbon-credit"], breadcrumb: "SUBMISSIONS / CARBON" },
    "news": { label: "News & Insights", breadcrumb: "KONTEN / NEWS" },
    "careers": { label: "Careers", breadcrumb: "KONTEN / CAREERS" },
    "finance": { label: "Fund Investor", breadcrumb: "KEUANGAN / FUND INVESTOR" },
    "investors": { label: "Data Investor", breadcrumb: "KEUANGAN / INVESTOR" },
    "journal": { label: "Jurnal Umum", breadcrumb: "AKUNTANSI / JURNAL" },
    "ledger": { label: "Buku Besar", breadcrumb: "AKUNTANSI / BUKU BESAR" },
    "trial-balance": { label: "Neraca Saldo", breadcrumb: "AKUNTANSI / NERACA SALDO" },
    "profit-loss": { label: "Laporan Laba Rugi", breadcrumb: "AKUNTANSI / LABA RUGI" },
    "balance-sheet": { label: "Neraca Keuangan", breadcrumb: "AKUNTANSI / NERACA" },
    "coa": { label: "Chart of Accounts", breadcrumb: "AKUNTANSI / COA" },
    "vendors": { label: "Vendor & Customer", breadcrumb: "AKUNTANSI / VENDOR & CUSTOMER" },
  };

  const isSubmissionView = view.startsWith("sub:");
  const activeFormType: FormType | "all" = isSubmissionView
    ? (view === "sub:all" ? "all" : view.replace("sub:", "") as FormType)
    : "all";

  function NavBtn({ v, label, icon, count, indent = false }: { v: View; label: string; icon?: React.ReactNode; count?: number; indent?: boolean }) {
    const active = view === v;
    return (
      <button onClick={() => setView(v)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: indent ? "6px 12px 6px 32px" : "8px 12px",
        borderRadius: 6, marginBottom: 1, border: "none", cursor: "pointer", textAlign: "left",
        background: active ? "rgba(255,255,255,0.1)" : "transparent",
        borderLeft: active ? "3px solid #6FCF97" : "3px solid transparent",
        transition: "background 0.15s",
      }}
        onMouseOver={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
        onMouseOut={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          {icon && <span style={{ color: active ? "#6FCF97" : "rgba(255,255,255,0.4)", display: "flex", flexShrink: 0 }}>{icon}</span>}
          <span style={{ fontSize: indent ? 13 : 14, fontFamily: "DM Sans, sans-serif", fontWeight: active ? 600 : 500, color: active ? "#FFFFFF" : "rgba(255,255,255,0.78)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {label}
          </span>
        </div>
        {count !== undefined && count > 0 && (
          <span style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", background: active ? "#6FCF97" : "rgba(111,207,151,0.2)", color: active ? "#1A2C24" : "#6FCF97", borderRadius: 100, padding: "1px 7px", fontWeight: 700, flexShrink: 0 }}>{count}</span>
        )}
      </button>
    );
  }

  function SectionHeader({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
    return (
      <button onClick={onToggle} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "4px 12px", background: "transparent", border: "none", cursor: "pointer", marginBottom: 2 }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1.4px", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>{label}</p>
        {open ? <ChevronUp size={10} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={10} color="rgba(255,255,255,0.3)" />}
      </button>
    );
  }

  const subs = getSubmissions();
  const perFormCount = ALL_FORM_TYPES.reduce<Record<FormType, number>>((acc, ft) => {
    acc[ft] = subs.filter(s => s.formType === ft).length;
    return acc;
  }, {} as Record<FormType, number>);

  return (
    <div style={{ minHeight: "100vh", background: "#F0F2F7", display: "flex" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 252, flexShrink: 0,
        background: "linear-gradient(180deg, #1B2F22 0%, #162618 100%)",
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #4CAF7A, #2D7A4F)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(45,122,79,0.4)" }}>
              <LayoutDashboard size={16} color="#ffffff" />
            </div>
            <div>
              <p style={{ fontFamily: "Geist, sans-serif", fontWeight: 800, fontSize: 15, color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "0.5px" }}>RENEWA</p>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#6FCF97", letterSpacing: "2px", fontWeight: 600, marginTop: 2 }}>ADMIN PANEL</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>

          {/* SUBMISSIONS section */}
          <div style={{ marginBottom: 4 }}>
            <SectionHeader label="SUBMISSIONS" open={subOpen} onToggle={() => setSubOpen(!subOpen)} />
            {subOpen && (
              <div>
                <NavBtn v="sub:all" label="Semua" icon={<MessageSquare size={14} />} count={subCount} />
                {ALL_FORM_TYPES.map(ft => (
                  <NavBtn key={ft} v={`sub:${ft}` as View} label={FORM_LABELS[ft]}
                    icon={<span style={{ color: FORM_COLORS[ft], display: "flex" }}>{FORM_ICONS[ft]}</span>}
                    count={perFormCount[ft]} indent />
                ))}
              </div>
            )}
          </div>

          {/* KEUANGAN section */}
          <div style={{ marginBottom: 4 }}>
            <SectionHeader label="KEUANGAN" open={finOpen} onToggle={() => setFinOpen(!finOpen)} />
            {finOpen && (
              <div>
                <NavBtn v="finance" label="Fund Investor" icon={<TrendingUp size={14} />} />
                <NavBtn v="investors" label="Data Investor" icon={<Users size={14} />} />
              </div>
            )}
          </div>

          {/* AKUNTANSI section */}
          <div style={{ marginBottom: 4 }}>
            <SectionHeader label="AKUNTANSI" open={accOpen} onToggle={() => setAccOpen(!accOpen)} />
            {accOpen && (
              <div>
                <NavBtn v="vendors" label="Vendor & Customer" icon={<Users size={14} />} />
                <NavBtn v="coa" label="Chart of Accounts" icon={<BookOpen size={14} />} />
                <NavBtn v="journal" label="Jurnal Umum" icon={<BookOpen size={14} />} />
                <NavBtn v="ledger" label="Buku Besar" icon={<BookMarked size={14} />} />
                <NavBtn v="trial-balance" label="Neraca Saldo" icon={<Calculator size={14} />} />
                <NavBtn v="profit-loss" label="Laba Rugi" icon={<PieChart size={14} />} />
                <NavBtn v="balance-sheet" label="Neraca" icon={<Landmark size={14} />} />
              </div>
            )}
          </div>

          {/* KONTEN section */}
          <div style={{ marginBottom: 4 }}>
            <SectionHeader label="KONTEN" open={kontOpen} onToggle={() => setKontOpen(!kontOpen)} />
            {kontOpen && (
              <div>
                <NavBtn v="news" label="News & Insights" icon={<Newspaper size={14} />} />
                <NavBtn v="careers" label="Careers" icon={<Briefcase size={14} />} />
              </div>
            )}
          </div>
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(111,207,151,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 13, color: "#6FCF97", fontWeight: 700 }}>A</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>Admin</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>admin@renewa.asia</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: 8, width: "100%",
            padding: "8px 12px", borderRadius: 6, fontSize: 13, cursor: "pointer",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif",
          }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#FCA5A5"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            <LogOut size={13} /> Keluar
          </button>
        </div>
      </aside>

      {/* ── Content ── */}
      <main style={{ flex: 1, minWidth: 0, padding: "32px 40px", overflowY: "auto" }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: "#9AA5B4", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.3px", marginBottom: 6 }}>
            {viewMeta[view].breadcrumb}
          </p>
          <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 800, fontSize: 26, color: "#1A2232", letterSpacing: -0.5, marginBottom: 0 }}>
            {viewMeta[view].label}
          </h1>
        </div>

        {isSubmissionView && <SubmissionsView formType={activeFormType} />}
        {view === "news" && <NewsView />}
        {view === "careers" && <CareersView />}
        {view === "finance" && <FinanceView />}
        {view === "investors" && <InvestorsView />}
        {view === "vendors" && <VendorView />}
        {view === "coa" && <COAView />}
        {view === "journal" && <JournalView />}
        {view === "ledger" && <LedgerView />}
        {view === "trial-balance" && <TrialBalanceView />}
        {view === "profit-loss" && <ProfitLossView />}
        {view === "balance-sheet" && <BalanceSheetView />}
      </main>
    </div>
  );
}
