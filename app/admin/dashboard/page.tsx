"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Plus, Trash2, MessageSquare, Newspaper, Briefcase,
  ChevronDown, ChevronUp, LayoutDashboard, Eye, EyeOff,
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
  getChartAccounts, getJournalEntries, saveJournalEntry, deleteJournalEntry, computeLedger,
  FORM_LABELS, FORM_COLORS,
  type FormType, type FormSubmission, type AdminArticle, type AdminJob,
  type InvestorRecord, type InvestorType, type InvestorStatus,
  type FundEntry, type ChartAccount, type AccountType, type JournalEntry, type JournalLine,
  type LedgerAccount,
} from "@/lib/adminStore";
import { articles as staticArticles } from "@/lib/articles";

/* ─── style helpers ───────────────────────────────────── */
const inp: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 13,
  background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)",
  color: "#F2F5EF", outline: "none", fontFamily: "DM Sans, sans-serif", boxSizing: "border-box",
};
const textarea: React.CSSProperties = { ...inp, resize: "vertical" as const, lineHeight: 1.6 };
const label12: React.CSSProperties = { fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 6 };
const card: React.CSSProperties = {
  background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)",
  borderRadius: 12, padding: "18px 20px",
};

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
  disbursed: "#B8F53A", committed: "#60C4F8", pending: "#F8C660",
};
const INV_TYPE_COLOR: Record<InvestorType, string> = {
  angel: "#F8C660", vc: "#60C4F8", strategic: "#C060F8", government: "#5DD6A0",
};

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function hex(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}
function fmtM(m: number) {
  if (m >= 1000) return `Rp ${(m / 1000).toFixed(1)}M`;
  return `Rp ${m.toLocaleString("id-ID")} Jt`;
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
  asset: "#60C4F8", liability: "#F86060", equity: "#C060F8", revenue: "#B8F53A", expense: "#F8C660",
};
const ACC_TYPE_ORDER: AccountType[] = ["asset", "liability", "equity", "revenue", "expense"];
const HIDDEN_STATIC_NEWS_KEY = "renewa_hidden_static_news";
const HIDDEN_STATIC_JOBS_KEY = "renewa_hidden_static_jobs";

const ROUND_COLORS: Record<string, string> = {
  "Pre-Seed": "#B8F53A", "Seed": "#60C4F8", "Seed Ext.": "#C060F8",
  "Series A": "#F8C660", "Series B": "#5DD6A0", "Strategic": "#C060F8", "Government": "#5DD6A0",
  "EV Investor": "#22D3EE",
};

/* ─── view type ───────────────────────────────────────── */
type View = "sub:all" | `sub:${FormType}` | "news" | "careers" | "finance" | "investors"
  | "journal" | "ledger" | "trial-balance" | "profit-loss" | "balance-sheet";

/* ═══════════════════════════════════════════════════════ */
/* ─── Submissions ─────────────────────────────────────── */
function SubmissionsView({ formType }: { formType: FormType | "all" }) {
  const [subs, setSubs] = useState<FormSubmission[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { setSubs(getSubmissions()); }, []);

  const filtered = formType === "all" ? subs : subs.filter(s => s.formType === formType);
  const counts = ALL_FORM_TYPES.reduce<Record<FormType, number>>((acc, ft) => {
    acc[ft] = subs.filter(s => s.formType === ft).length;
    return acc;
  }, {} as Record<FormType, number>);

  return (
    <div>
      {/* Stats grid — show on "all" view only */}
      {formType === "all" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
          {ALL_FORM_TYPES.map(ft => (
            <div key={ft} style={{
              background: hex(FORM_COLORS[ft], 0.06),
              border: `0.5px solid ${hex(FORM_COLORS[ft], 0.2)}`,
              borderRadius: 10, padding: "14px 16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ color: FORM_COLORS[ft], display: "flex" }}>{FORM_ICONS[ft]}</span>
                <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>{FORM_LABELS[ft]}</p>
              </div>
              <p style={{ fontSize: 24, fontFamily: "Syne, sans-serif", fontWeight: 800, color: FORM_COLORS[ft] }}>
                {counts[ft]}
              </p>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 0", color: "#7A9E85" }}>
          <MessageSquare size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p style={{ fontSize: 15, fontWeight: 300 }}>Belum ada submission masuk.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontSize: 12, color: "#7A9E85", marginBottom: 4 }}>{filtered.length} submission</p>
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
                        fontSize: 10, padding: "2px 9px", borderRadius: 100,
                        background: hex(color, 0.1), border: `0.5px solid ${hex(color, 0.3)}`,
                        color, fontFamily: "JetBrains Mono, monospace",
                      }}>
                        {FORM_ICONS[s.formType]} {FORM_LABELS[s.formType]}
                      </span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono, monospace" }}>{s.refId}</span>
                    </div>
                    <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.primaryName}</p>
                    <p style={{ fontSize: 12, color: "#7A9E85" }}>{s.primaryEmail} · {s.date}</p>
                  </div>
                  <div style={{ marginLeft: 12, flexShrink: 0 }}>
                    {expanded === s.id ? <ChevronUp size={16} color="#7A9E85" /> : <ChevronDown size={16} color="#7A9E85" />}
                  </div>
                </div>
                {expanded === s.id && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                      {Object.entries(s.data).map(([k, v]) => (
                        <div key={k} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 6, padding: "8px 12px" }}>
                          <p style={{ fontSize: 10, color: "#7A9E85", marginBottom: 3, textTransform: "capitalize", fontFamily: "JetBrains Mono, monospace" }}>
                            {k.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim()}
                          </p>
                          <p style={{ fontSize: 13, color: "#F2F5EF", lineHeight: 1.5, wordBreak: "break-word" }}>{v || "—"}</p>
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
  const [investorNames, setInvestorNames] = useState<string[]>([]);
  const [showFundForm, setShowFundForm] = useState(false);
  useEffect(() => {
    if (showFundForm) setInvestorNames(getInvestors().map(i => i.name));
  }, [showFundForm]);
  useEffect(() => { setInvestorNames(getInvestors().map(i => i.name)); }, []);

  /* fund entries state */
  const [entries, setEntries] = useState<FundEntry[]>([]);
  const [editEntryId, setEditEntryId] = useState<string | null>(null);
  const blankEntry = { from: "", amountM: 0, date: "", round: ROUNDS[0], notes: "" };
  const [entryForm, setEntryForm] = useState(blankEntry);
  const [entryFromOther, setEntryFromOther] = useState(false);

  const refreshEntries = useCallback(() => setEntries(getFundEntries()), []);
  useEffect(() => { refreshEntries(); }, [refreshEntries]);

  const totalReceived = entries.reduce((s, e) => s + e.amountM, 0);

  const handleSaveEntry = () => {
    if (!entryForm.from.trim() || !entryForm.amountM) return;
    saveFundEntry({ ...entryForm, id: editEntryId || Date.now().toString() });
    setEntryForm(blankEntry); setEntryFromOther(false); setShowFundForm(false); setEditEntryId(null);
    refreshEntries();
  };
  const startEditEntry = (e: FundEntry) => {
    const isOther = !getInvestors().map(i => i.name).includes(e.from);
    setEntryForm({ from: e.from, amountM: e.amountM, date: e.date, round: e.round, notes: e.notes || "" });
    setEntryFromOther(isOther);
    setEditEntryId(e.id); setShowFundForm(true);
  };

  /* cumulative running total */
  let running = 0;
  const entriesWithRunning = [...entries].reverse().map(e => { running += e.amountM; return { ...e, running }; }).reverse();

  return (
    <div>
      {/* ── Investor Correlation ── */}
      {entries.length > 0 && totalReceived > 0 && (() => {
        const invList = getInvestors();
        const byName: Record<string, { inv: InvestorRecord | undefined; total: number; rounds: string[] }> = {};
        entries.forEach(e => {
          if (!byName[e.from]) byName[e.from] = { inv: invList.find(i => i.name === e.from), total: 0, rounds: [] };
          byName[e.from].total += e.amountM;
          if (!byName[e.from].rounds.includes(e.round)) byName[e.from].rounds.push(e.round);
        });
        const sorted = Object.entries(byName).sort((a, b) => b[1].total - a[1].total);
        return (
          <div style={{ ...card, marginBottom: 28 }}>
            <p style={{ fontSize: 12, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 20 }}>KORELASI INVESTOR — KONTRIBUSI DANA</p>
            {sorted.map(([name, data], idx) => {
              const pct = (data.total / totalReceived) * 100;
              const color = data.inv ? INV_TYPE_COLOR[data.inv.type] : "#7A9E85";
              const isLast = idx === sorted.length - 1;
              return (
                <div key={name} style={{ marginBottom: isLast ? 0 : 16, paddingBottom: isLast ? 0 : 16, borderBottom: isLast ? "none" : "0.5px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: hex(color, 0.12), border: `0.5px solid ${hex(color, 0.3)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color, fontFamily: "Syne, sans-serif" }}>
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 600, marginBottom: 3 }}>{name}</p>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          {data.inv ? (
                            <>
                              <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 100, background: hex(color, 0.1), color, border: `0.5px solid ${hex(color, 0.25)}`, fontFamily: "JetBrains Mono, monospace" }}>{INV_TYPE_LABEL[data.inv.type]}</span>
                              <span style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>{data.inv.round} · {data.inv.equity}% equity</span>
                              <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 100, background: hex(INV_STATUS_COLOR[data.inv.status], 0.08), color: INV_STATUS_COLOR[data.inv.status], border: `0.5px solid ${hex(INV_STATUS_COLOR[data.inv.status], 0.2)}`, fontFamily: "JetBrains Mono, monospace" }}>{data.inv.status}</span>
                            </>
                          ) : (
                            <span style={{ fontSize: 11, color: "#7A9E85" }}>Pihak eksternal</span>
                          )}
                          {data.rounds.map(r => (
                            <span key={r} style={{ fontSize: 10, padding: "1px 7px", borderRadius: 100, background: hex(ROUND_COLORS[r] || "#7A9E85", 0.08), color: ROUND_COLORS[r] || "#7A9E85", border: `0.5px solid ${hex(ROUND_COLORS[r] || "#7A9E85", 0.2)}`, fontFamily: "JetBrains Mono, monospace" }}>{r}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: 16, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#F2F5EF" }}>{fmtM(data.total)}</p>
                      <p style={{ fontSize: 11, color: "#7A9E85", marginTop: 2 }}>{pct.toFixed(1)}% dari total</p>
                    </div>
                  </div>
                  <div style={{ position: "relative", height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
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
            <p style={{ fontSize: 12, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 4 }}>DANA MASUK</p>
            <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, color: "#F2F5EF" }}>
                {fmtM(totalReceived)}
              </p>
              <p style={{ fontSize: 12, color: "#7A9E85" }}>{entries.length} transaksi tercatat</p>
            </div>
          </div>
          <button onClick={() => { setEntryForm(blankEntry); setEntryFromOther(false); setEditEntryId(null); setShowFundForm(!showFundForm); }} style={{
            display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 16px",
            borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#B8F53A",
            color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif",
          }}>
            <Plus size={14} /> Catat Dana Masuk
          </button>
        </div>

        {/* Add/Edit form */}
        {showFundForm && (
          <div style={{ ...card, marginBottom: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />
            <p style={{ fontSize: 12, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 18 }}>
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
                <input style={inp} value={entryForm.date} onChange={e => setEntryForm({ ...entryForm, date: e.target.value })} placeholder="15 Jan 2025" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={label12}>Jumlah (Rp Juta) *</label>
                <input type="number" style={inp} value={entryForm.amountM || ""} onChange={e => setEntryForm({ ...entryForm, amountM: +e.target.value })} placeholder="500 = Rp 500 Juta" />
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
                padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                background: entryForm.from.trim() && entryForm.amountM ? "#B8F53A" : "rgba(184,245,58,0.3)",
                color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif",
              }}>Simpan</button>
              <button onClick={() => { setShowFundForm(false); setEditEntryId(null); }} style={{ padding: "9px 18px", borderRadius: 8, fontSize: 13, background: "transparent", border: "0.5px solid rgba(255,255,255,0.1)", color: "#7A9E85", cursor: "pointer" }}>Batal</button>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {entriesWithRunning.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#7A9E85" }}>
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
                  background: "#B8F53A", border: "2px solid #0B0F0E",
                  boxShadow: "0 0 0 1px rgba(184,245,58,0.4)",
                }} />
                {idx < entriesWithRunning.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.07)", marginTop: 4 }} />
                )}
              </div>

              {/* Card */}
              <div style={{
                flex: 1, marginLeft: 12, marginBottom: 10,
                background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)",
                borderRadius: 10, padding: "14px 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{
                      fontSize: 10, padding: "1px 8px", borderRadius: 100,
                      background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.2)",
                      color: "#B8F53A", fontFamily: "JetBrains Mono, monospace",
                    }}>{e.round}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono, monospace" }}>{e.date}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 600, marginBottom: 2 }}>{e.from}</p>
                  {e.notes && <p style={{ fontSize: 12, color: "#7A9E85" }}>{e.notes}</p>}
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 16, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#B8F53A" }}>
                    +{fmtM(e.amountM)}
                  </p>
                  <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", marginTop: 2 }}>
                    kumulatif: {fmtM(e.running)}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                  <button onClick={() => startEditEntry(e)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 6 }}
                    onMouseOver={el => (el.currentTarget.style.color = "#B8F53A")} onMouseOut={el => (el.currentTarget.style.color = "#7A9E85")}>
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => { deleteFundEntry(e.id); refreshEntries(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 6 }}
                    onMouseOver={el => (el.currentTarget.style.color = "#ff6b6b")} onMouseOut={el => (el.currentTarget.style.color = "#7A9E85")}>
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
    setInvestors(getInvestors());
    setFundEntries(getFundEntries());
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
    saveInvestor({ ...form, amountM: existing?.amountM || 0, id: editId || Date.now().toString() });
    setForm(blankForm); setShowForm(false); setEditId(null);
    refresh();
  };

  const handleDelete = (id: string) => { deleteInvestor(id); refresh(); };

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
          { label: "Total Investor", value: investors.length.toString(), color: "#B8F53A", icon: <Users size={16} /> },
          { label: "Total Raised", value: fmtM(totalRaised), color: "#60C4F8", icon: <DollarSign size={16} /> },
          { label: "Total Equity Diluted", value: `${totalEquity.toFixed(1)}%`, color: "#F8C660", icon: <TrendingUp size={16} /> },
        ].map(k => (
          <div key={k.label} style={{ background: hex(k.color, 0.05), border: `0.5px solid ${hex(k.color, 0.2)}`, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ color: k.color }}>{k.icon}</span>
              <p style={{ fontSize: 11, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>{k.label.toUpperCase()}</p>
            </div>
            <p style={{ fontSize: 24, fontFamily: "Syne, sans-serif", fontWeight: 800, color: k.color }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { setForm(blankForm); setEditId(null); setShowForm(!showForm); }} style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px",
          borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#B8F53A",
          color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif",
        }}>
          <Plus size={15} /> Tambah Investor
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ ...card, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />
          <p style={{ fontSize: 13, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 20 }}>
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
            <div><label style={label12}>Tanggal</label><input style={inp} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Jan 2025" /></div>
          </div>
          <p style={{ fontSize: 11, color: "#7A9E85", marginBottom: 16 }}>
            Nominal investasi dicatat dari menu <b style={{ color: "#B8F53A" }}>Dashboard Keuangan</b> melalui Catat Dana Masuk.
          </p>
          <div style={{ marginBottom: 20 }}>
            <label style={label12}>Catatan</label>
            <input style={inp} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Catatan tambahan (opsional)" />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleSave} disabled={!form.name.trim()} style={{
              padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: form.name.trim() ? "#B8F53A" : "rgba(184,245,58,0.3)",
              color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif",
            }}>Simpan</button>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, background: "transparent", border: "0.5px solid rgba(255,255,255,0.1)", color: "#7A9E85", cursor: "pointer" }}>Batal</button>
          </div>
        </div>
      )}

      {/* Grouped by round */}
      {Object.entries(roundGroup).map(([round, invs]) => (
        <div key={round} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>{round}</p>
            <span style={{ fontSize: 11, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>
              {invs.length} investor · {fmtM(invs.reduce((s, i) => s + getInvestorAmount(i), 0))} · {invs.reduce((s, i) => s + i.equity, 0).toFixed(1)}% equity
            </span>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.07)" }} />
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
                    <span style={{ fontSize: 12, fontWeight: 700, color: INV_TYPE_COLOR[inv.type], fontFamily: "Syne, sans-serif" }}>
                      {inv.name.charAt(0)}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                      <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 600 }}>{inv.name}</p>
                      {inv.company && inv.company !== "—" && (
                        <span style={{ fontSize: 11, color: "#7A9E85" }}>· {inv.company}</span>
                      )}
                      <span style={{
                        fontSize: 10, padding: "1px 7px", borderRadius: 100,
                        background: hex(INV_TYPE_COLOR[inv.type], 0.1),
                        color: INV_TYPE_COLOR[inv.type],
                        border: `0.5px solid ${hex(INV_TYPE_COLOR[inv.type], 0.25)}`,
                        fontFamily: "JetBrains Mono, monospace",
                      }}>{INV_TYPE_LABEL[inv.type]}</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#7A9E85" }}>{inv.date}{inv.notes ? ` · ${inv.notes}` : ""}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 20, alignItems: "center", flexShrink: 0 }}>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 14, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#F2F5EF" }}>{fmtM(getInvestorAmount(inv))}</p>
                    <p style={{ fontSize: 11, color: "#7A9E85" }}>{inv.equity}% equity</p>
                  </div>
                  <span style={{
                    fontSize: 10, padding: "3px 10px", borderRadius: 100,
                    background: hex(INV_STATUS_COLOR[inv.status], 0.1),
                    color: INV_STATUS_COLOR[inv.status],
                    border: `0.5px solid ${hex(INV_STATUS_COLOR[inv.status], 0.3)}`,
                    fontFamily: "JetBrains Mono, monospace",
                  }}>{inv.status}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => startEdit(inv)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 6 }}
                      onMouseOver={e => (e.currentTarget.style.color = "#B8F53A")} onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => handleDelete(inv.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 6 }}
                      onMouseOver={e => (e.currentTarget.style.color = "#ff6b6b")} onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>
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
    setAdminNews(getAdminNews());
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
    saveAdminArticle({
      id: editArticleId || Date.now().toString(),
      slug: existing?.slug || staticOriginal?.slug || slugify(form.titleId),
      category: { id: form.category, en: form.category }, tag: form.tag,
      date: existing?.date || staticOriginal?.date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      readTime: existing?.readTime || staticOriginal?.readTime || "3 min",
      title: { id: form.titleId, en: form.titleEn || form.titleId },
      excerpt: { id: form.excerptId, en: form.excerptEn || form.excerptId },
      body: form.bodyId ? [{ type: "paragraph" as const, text: { id: form.bodyId, en: form.bodyEn || form.bodyId } }] : [],
      published: true, source: "admin",
    });
    if (editingStaticArticleId) hideStaticId(HIDDEN_STATIC_NEWS_KEY, editingStaticArticleId);
    resetForm();
    setShowForm(false); refresh();
  };

  const togglePublish = (a: AdminArticle) => { saveAdminArticle({ ...a, published: !a.published }); refresh(); };
  const handleDeleteArticle = (a: (typeof allArticles)[number]) => {
    if (a.source === "static") hideStaticId(HIDDEN_STATIC_NEWS_KEY, String(a.id));
    else deleteAdminArticle(a.id);
    refresh();
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#B8F53A", color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif" }}>
          <Plus size={15} /> Artikel Baru
        </button>
      </div>
      {showForm && (
        <div style={{ ...card, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />
          <p style={{ fontSize: 13, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 20 }}>{editArticleId ? "EDIT ARTIKEL" : "ARTIKEL BARU"}</p>
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
            <button onClick={handlePublish} disabled={!form.titleId.trim() || !form.excerptId.trim()} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: form.titleId.trim() && form.excerptId.trim() ? "#B8F53A" : "rgba(184,245,58,0.3)", color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif" }}>{editArticleId ? "Simpan Perubahan" : "Publish"}</button>
            <button onClick={() => { setShowForm(false); resetForm(); }} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, background: "transparent", border: "0.5px solid rgba(255,255,255,0.1)", color: "#7A9E85", cursor: "pointer" }}>Batal</button>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {allArticles.map(a => (
          <div key={a.id} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "#B8F53A", background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 100, padding: "1px 8px" }}>{a.category.id}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace" }}>{a.source === "static" ? "STATIC" : "ADMIN"} · {a.tag.toUpperCase()}</span>
              </div>
              <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title.id}</p>
              <p style={{ fontSize: 12, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>{a.date}</p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: a.published ? "rgba(184,245,58,0.1)" : "rgba(255,255,255,0.04)", color: a.published ? "#B8F53A" : "#7A9E85", border: `0.5px solid ${a.published ? "rgba(184,245,58,0.3)" : "rgba(255,255,255,0.1)"}` }}>{a.published ? "Published" : "Draft"}</span>
              <a href={`/news/${a.slug}`} target="_blank" rel="noreferrer" title="View artikel" style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 4 }}>
                <Eye size={15} />
              </a>
              <button onClick={() => startEditArticle(a)} title="Edit artikel" style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 4 }}><Edit2 size={15} /></button>
              {a.source === "admin" && (
                <button onClick={() => togglePublish(a)} title={a.published ? "Set draft" : "Publish"} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 4 }}>{a.published ? <EyeOff size={15} /> : <CheckCircle2 size={15} />}</button>
              )}
              <button onClick={() => handleDeleteArticle(a)} title="Delete artikel" style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 4 }} onMouseOver={e => (e.currentTarget.style.color = "#ff6b6b")} onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}><Trash2 size={15} /></button>
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
    setAdminJobs(getAdminJobs());
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
    saveAdminJob({ id: editJobId || Date.now().toString(), title: form.title, dept: { id: form.dept, en: form.dept }, type: { id: "Penuh Waktu", en: "Full-time" }, level: { id: form.level, en: form.level }, location: form.location, desc: { id: form.descId, en: form.descEn || form.descId }, skills: form.skills.split(",").map(s => s.trim()).filter(Boolean), active: existing?.active ?? true, source: "admin" });
    if (editingStaticJobId) hideStaticId(HIDDEN_STATIC_JOBS_KEY, editingStaticJobId);
    resetJobForm();
    setShowForm(false); refresh();
  };
  const toggleActive = (j: AdminJob) => { saveAdminJob({ ...j, active: !j.active }); refresh(); };
  const handleDeleteJob = (j: (typeof allJobs)[number]) => {
    if (j.source === "static") hideStaticId(HIDDEN_STATIC_JOBS_KEY, j.id);
    else deleteAdminJob(j.id);
    refresh();
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { resetJobForm(); setShowForm(!showForm); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#B8F53A", color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif" }}>
          <Plus size={15} /> Posisi Baru
        </button>
      </div>
      {showForm && (
        <div style={{ ...card, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />
          <p style={{ fontSize: 13, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 20 }}>{editJobId ? "EDIT POSISI" : "POSISI BARU"}</p>
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
            <button onClick={handleAdd} disabled={!form.title.trim()} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: form.title.trim() ? "#B8F53A" : "rgba(184,245,58,0.3)", color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif" }}>{editJobId ? "Simpan Perubahan" : "Tambah"}</button>
            <button onClick={() => { setShowForm(false); resetJobForm(); }} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, background: "transparent", border: "0.5px solid rgba(255,255,255,0.1)", color: "#7A9E85", cursor: "pointer" }}>Batal</button>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {allJobs.map(j => (
          <div key={j.id} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "#B8F53A", background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 100, padding: "1px 8px" }}>{j.dept.id}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace" }}>{j.source === "static" ? "STATIC" : "ADMIN"} · {j.level.id} · {j.location}</span>
              </div>
              <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{j.title}</p>
              {j.skills.length > 0 && (
                <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                  {j.skills.slice(0, 4).map(s => <span key={s} style={{ fontSize: 10, color: "#7A9E85", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "1px 7px", fontFamily: "JetBrains Mono, monospace" }}>{s}</span>)}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: j.active ? "rgba(184,245,58,0.1)" : "rgba(255,255,255,0.04)", color: j.active ? "#B8F53A" : "#7A9E85", border: `0.5px solid ${j.active ? "rgba(184,245,58,0.3)" : "rgba(255,255,255,0.1)"}` }}>{j.active ? "Active" : "Inactive"}</span>
              <a href="/careers" target="_blank" rel="noreferrer" title="View careers" style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 4 }}>
                <Eye size={15} />
              </a>
              <button onClick={() => startEditJob(j)} title="Edit posisi" style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 4 }}><Edit2 size={15} /></button>
              {j.source === "admin" && (
                <button onClick={() => toggleActive(j)} title={j.active ? "Nonaktifkan" : "Aktifkan"} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 4 }}>{j.active ? <EyeOff size={15} /> : <CheckCircle2 size={15} />}</button>
              )}
              <button onClick={() => handleDeleteJob(j)} title="Delete posisi" style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 4 }} onMouseOver={e => (e.currentTarget.style.color = "#ff6b6b")} onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}><Trash2 size={15} /></button>
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
  const [accounts, setAccounts] = useState<ChartAccount[]>(() => getChartAccounts());
  const [entries, setEntries] = useState<JournalEntry[]>(() => getJournalEntries());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  interface LineForm { accountId: string; debit: string; credit: string; }
  const blankLine: LineForm = { accountId: "", debit: "", credit: "" };
  const [form, setForm] = useState({ date: "", description: "" });
  const [lines, setLines] = useState<LineForm[]>([blankLine, blankLine]);

  const refresh = useCallback(() => {
    setAccounts(getChartAccounts());
    setEntries(getJournalEntries());
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
    saveJournalEntry({
      id: Date.now().toString(),
      ref: `JE-${new Date().getFullYear()}-${String(nextNum).padStart(3, "0")}`,
      date: form.date,
      description: form.description,
      lines: jeLines,
    });
    setForm({ date: "", description: "" });
    setLines([blankLine, blankLine]);
    setShowForm(false);
    refresh();
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { setForm({ date: "", description: "" }); setLines([blankLine, blankLine]); setShowForm(!showForm); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#B8F53A", color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif" }}>
          <Plus size={15} /> Jurnal Baru
        </button>
      </div>

      {showForm && (
        <div style={{ ...card, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />
          <p style={{ fontSize: 12, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 18 }}>JURNAL BARU</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 16 }}>
            <div><label style={label12}>Tanggal *</label><input style={inp} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="15 Jan 2026" /></div>
            <div><label style={label12}>Keterangan *</label><input style={inp} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi transaksi" /></div>
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px 32px", gap: 8, marginBottom: 6, padding: "0 4px" }}>
              <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>AKUN</p>
              <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", textAlign: "right" }}>DEBIT (Jt)</p>
              <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", textAlign: "right" }}>KREDIT (Jt)</p>
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
                  style={{ background: "none", border: "none", cursor: lines.length > 2 ? "pointer" : "default", color: lines.length > 2 ? "#7A9E85" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MinusCircle size={14} />
                </button>
              </div>
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px 32px", gap: 8, padding: "10px 4px 4px", borderTop: "0.5px solid rgba(255,255,255,0.07)", marginTop: 4 }}>
              <p style={{ fontSize: 12, color: "#7A9E85" }}>Total</p>
              <p style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: totalD > 0 ? "#F2F5EF" : "#7A9E85", textAlign: "right" }}>{totalD.toLocaleString("id-ID", { maximumFractionDigits: 1 })}</p>
              <p style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: totalC > 0 ? "#F2F5EF" : "#7A9E85", textAlign: "right" }}>{totalC.toLocaleString("id-ID", { maximumFractionDigits: 1 })}</p>
              <span />
            </div>
            <div style={{ padding: "6px 4px", display: "flex", alignItems: "center", gap: 8 }}>
              {totalD > 0 && (balanced
                ? <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#B8F53A" }}><CheckCircle2 size={13} /> Jurnal seimbang</span>
                : <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#F86060" }}><AlertCircle size={13} /> Selisih: {Math.abs(totalD - totalC).toFixed(1)} Jt</span>
              )}
            </div>
            <button onClick={() => setLines([...lines, blankLine])} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, fontSize: 12, background: "transparent", border: "0.5px dashed rgba(255,255,255,0.15)", color: "#7A9E85", cursor: "pointer", marginTop: 4 }}>
              <Plus size={11} /> Tambah Baris
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={handleSave} disabled={!balanced || !form.date || !form.description} style={{ padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: balanced && form.date && form.description ? "#B8F53A" : "rgba(184,245,58,0.25)", color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif" }}>Simpan Jurnal</button>
            <button onClick={() => setShowForm(false)} style={{ padding: "9px 18px", borderRadius: 8, fontSize: 13, background: "transparent", border: "0.5px solid rgba(255,255,255,0.1)", color: "#7A9E85", cursor: "pointer" }}>Batal</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ fontSize: 12, color: "#7A9E85", marginBottom: 4 }}>{entries.length} entri jurnal</p>
        {entries.map(je => (
          <div key={je.id} style={{ ...card, cursor: "pointer", borderLeft: "3px solid rgba(184,245,58,0.3)" }}
            onClick={() => setExpanded(expanded === je.id ? null : je.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 4, padding: "1px 8px" }}>{je.ref}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono, monospace" }}>{je.date}</span>
                </div>
                <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500 }}>{je.description}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 12, flexShrink: 0 }}>
                <p style={{ fontSize: 13, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>
                  {fmtM(je.lines.reduce((s, l) => s + l.debit, 0))}
                </p>
                <button onClick={ev => { ev.stopPropagation(); deleteJournalEntry(je.id); refresh(); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex", padding: 6 }}
                  onMouseOver={e => (e.currentTarget.style.color = "#ff6b6b")}
                  onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>
                  <Trash2 size={13} />
                </button>
                {expanded === je.id ? <ChevronUp size={15} color="#7A9E85" /> : <ChevronDown size={15} color="#7A9E85" />}
              </div>
            </div>
            {expanded === je.id && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {[["left","AKUN"], ["right","DEBIT (Jt)"], ["right","KREDIT (Jt)"]].map(([align, label]) => (
                        <th key={label} style={{ textAlign: align as "left" | "right", fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", padding: "4px 8px", fontWeight: 400 }}>{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {je.lines.map((l, i) => {
                      const acc = accounts.find(a => a.id === l.accountId);
                      return (
                        <tr key={i} style={{ borderTop: "0.5px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "6px 8px" }}>
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "JetBrains Mono, monospace", marginRight: 8 }}>{acc?.code}</span>
                            <span style={{ fontSize: 13, color: l.debit > 0 ? "#F2F5EF" : "#7A9E85", paddingLeft: l.debit === 0 ? 0 : 0 }}>{acc?.name || l.accountId}</span>
                          </td>
                          <td style={{ textAlign: "right", padding: "6px 8px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: l.debit > 0 ? "#F2F5EF" : "rgba(255,255,255,0.2)" }}>
                            {l.debit > 0 ? l.debit.toLocaleString("id-ID") : "—"}
                          </td>
                          <td style={{ textAlign: "right", padding: "6px 8px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: l.credit > 0 ? "#7A9E85" : "rgba(255,255,255,0.2)" }}>
                            {l.credit > 0 ? l.credit.toLocaleString("id-ID") : "—"}
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
  const [accounts, setAccounts] = useState<ChartAccount[]>(() => getChartAccounts());
  const [entries, setEntries] = useState<JournalEntry[]>(() => getJournalEntries());
  const [selType, setSelType] = useState<AccountType | "all">("all");
  const [selAccId, setSelAccId] = useState<string>(() => getChartAccounts()[0]?.id || "");

  const refresh = useCallback(() => {
    setAccounts(getChartAccounts());
    setEntries(getJournalEntries());
  }, []);
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
            padding: "5px 12px", borderRadius: 20, fontSize: 11, fontFamily: "JetBrains Mono, monospace",
            cursor: "pointer", border: "none",
            background: selType === type ? (type === "all" ? "#B8F53A" : hex(ACC_TYPE_COLOR[type], 0.18)) : "rgba(255,255,255,0.04)",
            color: selType === type ? (type === "all" ? "#0D2B1E" : ACC_TYPE_COLOR[type]) : "#7A9E85",
          }}>
            {type === "all" ? "SEMUA" : ACC_TYPE_LABEL[type].toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "#070D09", borderRadius: 10, padding: 8, maxHeight: "60vh", overflowY: "auto" }}>
          {filteredAccounts.map(a => {
            const active = selAccId === a.id;
            return (
              <button key={a.id} onClick={() => setSelAccId(a.id)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "9px 12px", borderRadius: 7, border: "none", cursor: "pointer", textAlign: "left",
                background: active ? "rgba(184,245,58,0.08)" : "transparent",
              }}
                onMouseOver={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseOut={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <div>
                  <p style={{ fontSize: 10, color: active ? ACC_TYPE_COLOR[a.type] : "#7A9E85", fontFamily: "JetBrains Mono, monospace", marginBottom: 2 }}>{a.code}</p>
                  <p style={{ fontSize: 12, color: active ? "#F2F5EF" : "#7A9E85", fontWeight: active ? 600 : 400 }}>{a.name}</p>
                </div>
                <p style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", color: a.balance !== 0 ? (active ? "#B8F53A" : "#F2F5EF") : "#7A9E85", marginLeft: 8 }}>
                  {a.balance !== 0 ? a.balance.toLocaleString("id-ID") : "—"}
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
                  <p style={{ fontSize: 10, color: ACC_TYPE_COLOR[selAcc.type], fontFamily: "JetBrains Mono, monospace", marginBottom: 4 }}>{selAcc.code} · {ACC_TYPE_LABEL[selAcc.type].toUpperCase()}</p>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: "#F2F5EF" }}>{selAcc.name}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 10, color: "#7A9E85", marginBottom: 4 }}>Saldo Normal: {selAcc.normalBalance === "debit" ? "Debit" : "Kredit"}</p>
                  <p style={{ fontSize: 22, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#B8F53A" }}>{fmtM(selAcc.balance)}</p>
                </div>
              </div>
            </div>
            {txWithBal.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#7A9E85" }}>
                <BookOpen size={28} style={{ marginBottom: 8, opacity: 0.3 }} />
                <p style={{ fontSize: 14, fontWeight: 300 }}>Belum ada transaksi.</p>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                    {[["left","TANGGAL"],["left","KETERANGAN"],["right","DEBIT"],["right","KREDIT"],["right","SALDO"]].map(([align, lbl]) => (
                      <th key={lbl} style={{ textAlign: align as "left"|"right", padding: "8px 12px", fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", fontWeight: 400 }}>{lbl}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {txWithBal.map((t, i) => (
                    <tr key={i} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "8px 12px", fontSize: 12, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap" }}>{t.je.date}</td>
                      <td style={{ padding: "8px 12px", fontSize: 13, color: "#F2F5EF" }}>{t.je.description}</td>
                      <td style={{ textAlign: "right", padding: "8px 12px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: t.line.debit > 0 ? "#F2F5EF" : "rgba(255,255,255,0.15)" }}>{t.line.debit > 0 ? t.line.debit.toLocaleString("id-ID") : "—"}</td>
                      <td style={{ textAlign: "right", padding: "8px 12px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: t.line.credit > 0 ? "#7A9E85" : "rgba(255,255,255,0.15)" }}>{t.line.credit > 0 ? t.line.credit.toLocaleString("id-ID") : "—"}</td>
                      <td style={{ textAlign: "right", padding: "8px 12px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: "#B8F53A", fontWeight: 600 }}>{t.balance.toLocaleString("id-ID")}</td>
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
  const [accounts, setAccounts] = useState<ChartAccount[]>(() => getChartAccounts());
  const [entries, setEntries] = useState<JournalEntry[]>(() => getJournalEntries());

  const refresh = useCallback(() => {
    setAccounts(getChartAccounts());
    setEntries(getJournalEntries());
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
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 8, background: balanced ? "rgba(184,245,58,0.08)" : "rgba(248,96,96,0.08)", border: `0.5px solid ${balanced ? "rgba(184,245,58,0.2)" : "rgba(248,96,96,0.2)"}` }}>
          {balanced ? <CheckCircle2 size={14} color="#B8F53A" /> : <AlertCircle size={14} color="#F86060" />}
          <p style={{ fontSize: 12, color: balanced ? "#B8F53A" : "#F86060", fontFamily: "JetBrains Mono, monospace" }}>
            {balanced ? "NERACA SALDO SEIMBANG" : `TIDAK SEIMBANG — SELISIH: ${fmtM(Math.abs(grandD - grandC))}`}
          </p>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
            {[["left","KODE"],["left","NAMA AKUN"],["right","DEBIT (Jt)"],["right","KREDIT (Jt)"]].map(([align, lbl]) => (
              <th key={lbl} style={{ textAlign: align as "left"|"right", padding: "10px 14px", fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", fontWeight: 400 }}>{lbl}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => row.kind === "header" ? (
            <tr key={`h-${row.type}`}>
              <td colSpan={4} style={{ padding: "12px 14px 6px", fontSize: 10, color: ACC_TYPE_COLOR[row.type], fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", fontWeight: 700 }}>
                {ACC_TYPE_LABEL[row.type].toUpperCase()}
              </td>
            </tr>
          ) : (
            <tr key={row.acc.id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.04)" }}>
              <td style={{ padding: "7px 14px", fontSize: 11, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>{row.acc.code}</td>
              <td style={{ padding: "7px 14px", fontSize: 13, color: "#F2F5EF" }}>{row.acc.name}</td>
              <td style={{ textAlign: "right", padding: "7px 14px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: row.acc.totalDebit > 0 ? "#F2F5EF" : "rgba(255,255,255,0.15)" }}>{row.acc.totalDebit > 0 ? row.acc.totalDebit.toLocaleString("id-ID") : "—"}</td>
              <td style={{ textAlign: "right", padding: "7px 14px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: row.acc.totalCredit > 0 ? "#F2F5EF" : "rgba(255,255,255,0.15)" }}>{row.acc.totalCredit > 0 ? row.acc.totalCredit.toLocaleString("id-ID") : "—"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <td colSpan={2} style={{ padding: "12px 14px", fontSize: 12, color: "#F2F5EF", fontWeight: 700, fontFamily: "Syne, sans-serif" }}>TOTAL</td>
            <td style={{ textAlign: "right", padding: "12px 14px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#F2F5EF" }}>{grandD.toLocaleString("id-ID")}</td>
            <td style={{ textAlign: "right", padding: "12px 14px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#F2F5EF" }}>{grandC.toLocaleString("id-ID")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Profit & Loss View ──────────────────────────────── */
function ProfitLossView() {
  const [accounts, setAccounts] = useState<ChartAccount[]>(() => getChartAccounts());
  const [entries, setEntries] = useState<JournalEntry[]>(() => getJournalEntries());

  const refresh = useCallback(() => {
    setAccounts(getChartAccounts());
    setEntries(getJournalEntries());
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const ledger = computeLedger(accounts, entries);
  const revenues = ledger.filter(a => a.type === "revenue" && a.balance !== 0);
  const expenses = ledger.filter(a => a.type === "expense" && a.balance !== 0);
  const totalRevenue = revenues.reduce((s, a) => s + a.balance, 0);
  const totalExpense = expenses.reduce((s, a) => s + a.balance, 0);
  const netIncome = totalRevenue - totalExpense;
  const profitable = netIncome >= 0;

  function AccSection({ title, items, total, color }: { title: string; items: LedgerAccount[]; total: number; color: string }) {
    return (
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, color, fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 10 }}>{title}</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {items.length === 0
              ? <tr><td colSpan={2} style={{ padding: "10px 14px", fontSize: 13, color: "#7A9E85", fontStyle: "italic" }}>Tidak ada transaksi.</td></tr>
              : items.map(a => (
                <tr key={a.id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "8px 14px", fontSize: 13, color: "#F2F5EF" }}>{a.name}</td>
                  <td style={{ textAlign: "right", padding: "8px 14px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color }}>{fmtM(a.balance)}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }}>
              <td style={{ padding: "10px 14px", fontSize: 12, color: "#F2F5EF", fontWeight: 700 }}>Total {title.split(" ")[0]}</td>
              <td style={{ textAlign: "right", padding: "10px 14px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color }}>{fmtM(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div style={{ ...card, marginBottom: 28, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: profitable ? "#B8F53A" : "#F86060" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>LABA / RUGI BERSIH</p>
            <p style={{ fontSize: 32, fontFamily: "Syne, sans-serif", fontWeight: 800, color: profitable ? "#B8F53A" : "#F86060" }}>
              {profitable ? "+" : ""}{fmtM(netIncome)}
            </p>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#7A9E85", marginBottom: 4 }}>Total Pendapatan</p>
              <p style={{ fontSize: 18, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#B8F53A" }}>{fmtM(totalRevenue)}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#7A9E85", marginBottom: 4 }}>Total Beban</p>
              <p style={{ fontSize: 18, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#F8C660" }}>{fmtM(totalExpense)}</p>
            </div>
          </div>
        </div>
      </div>

      <AccSection title="PENDAPATAN" items={revenues} total={totalRevenue} color="#B8F53A" />
      <AccSection title="BEBAN" items={expenses} total={totalExpense} color="#F8C660" />

      <div style={{ ...card, background: profitable ? "rgba(184,245,58,0.05)" : "rgba(248,96,96,0.05)", border: `0.5px solid ${profitable ? "rgba(184,245,58,0.2)" : "rgba(248,96,96,0.2)"}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 700 }}>{profitable ? "Laba Bersih" : "Rugi Bersih"}</p>
          <p style={{ fontSize: 20, fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: profitable ? "#B8F53A" : "#F86060" }}>{fmtM(Math.abs(netIncome))}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Balance Sheet View ──────────────────────────────── */
function BalanceSheetView() {
  const [accounts, setAccounts] = useState<ChartAccount[]>(() => getChartAccounts());
  const [entries, setEntries] = useState<JournalEntry[]>(() => getJournalEntries());

  const refresh = useCallback(() => {
    setAccounts(getChartAccounts());
    setEntries(getJournalEntries());
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const ledger = computeLedger(accounts, entries);
  const assets      = ledger.filter(a => a.type === "asset"     && a.balance !== 0);
  const liabilities = ledger.filter(a => a.type === "liability" && a.balance !== 0);
  const equities    = ledger.filter(a => a.type === "equity"    && a.balance !== 0);
  const netIncome   = ledger.filter(a => a.type === "revenue").reduce((s, a) => s + a.balance, 0)
                    - ledger.filter(a => a.type === "expense").reduce((s, a) => s + a.balance, 0);
  const totalAsset     = assets.reduce((s, a) => s + a.balance, 0);
  const totalLiability = liabilities.reduce((s, a) => s + a.balance, 0);
  const totalEquity    = equities.reduce((s, a) => s + a.balance, 0);
  const totalLiabEq    = totalLiability + totalEquity + netIncome;
  const balanced       = Math.abs(totalAsset - totalLiabEq) < 0.001;

  function BsSection({ title, items, total, color }: { title: string; items: LedgerAccount[]; total: number; color: string }) {
    return (
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 10, color, fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 8 }}>{title}</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {items.length === 0
              ? <tr><td colSpan={2} style={{ padding: "8px 14px", fontSize: 13, color: "#7A9E85", fontStyle: "italic" }}>Tidak ada saldo.</td></tr>
              : items.map(a => (
                <tr key={a.id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "7px 14px", fontSize: 13, color: "#F2F5EF" }}>{a.name}</td>
                  <td style={{ textAlign: "right", padding: "7px 14px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: "#F2F5EF" }}>{fmtM(a.balance)}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }}>
              <td style={{ padding: "8px 14px", fontSize: 12, color: "#F2F5EF", fontWeight: 700 }}>Total {title}</td>
              <td style={{ textAlign: "right", padding: "8px 14px", fontSize: 14, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color }}>{fmtM(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 8, marginBottom: 28, background: balanced ? "rgba(184,245,58,0.08)" : "rgba(248,96,96,0.08)", border: `0.5px solid ${balanced ? "rgba(184,245,58,0.2)" : "rgba(248,96,96,0.2)"}` }}>
        {balanced ? <CheckCircle2 size={14} color="#B8F53A" /> : <AlertCircle size={14} color="#F86060" />}
        <p style={{ fontSize: 12, color: balanced ? "#B8F53A" : "#F86060", fontFamily: "JetBrains Mono, monospace" }}>
          {balanced ? "NERACA SEIMBANG — AKTIVA = PASIVA" : `TIDAK SEIMBANG — SELISIH: ${fmtM(Math.abs(totalAsset - totalLiabEq))}`}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ ...card }}>
          <p style={{ fontSize: 13, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#F2F5EF", marginBottom: 18 }}>AKTIVA</p>
          <BsSection title="ASET" items={assets} total={totalAsset} color="#60C4F8" />
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 13, color: "#F2F5EF", fontWeight: 700 }}>TOTAL AKTIVA</p>
            <p style={{ fontSize: 18, fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: "#60C4F8" }}>{fmtM(totalAsset)}</p>
          </div>
        </div>

        <div style={{ ...card }}>
          <p style={{ fontSize: 13, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#F2F5EF", marginBottom: 18 }}>PASIVA</p>
          <BsSection title="KEWAJIBAN" items={liabilities} total={totalLiability} color="#F86060" />
          <BsSection title="EKUITAS" items={equities} total={totalEquity} color="#C060F8" />
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, color: netIncome >= 0 ? "#B8F53A" : "#F86060", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 8 }}>
              {netIncome >= 0 ? "LABA BERSIH PERIODE BERJALAN" : "RUGI BERSIH PERIODE BERJALAN"}
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "7px 14px", fontSize: 13, color: "#F2F5EF" }}>{netIncome >= 0 ? "Laba Bersih" : "Rugi Bersih"}</td>
                  <td style={{ textAlign: "right", padding: "7px 14px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", color: netIncome >= 0 ? "#B8F53A" : "#F86060", fontWeight: 600 }}>{fmtM(netIncome)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 13, color: "#F2F5EF", fontWeight: 700 }}>TOTAL PASIVA</p>
            <p style={{ fontSize: 18, fontFamily: "JetBrains Mono, monospace", fontWeight: 800, color: "#60C4F8" }}>{fmtM(totalLiabEq)}</p>
          </div>
        </div>
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
        width: "100%", padding: indent ? "7px 12px 7px 28px" : "9px 12px",
        borderRadius: 7, marginBottom: 1, border: "none", cursor: "pointer", textAlign: "left",
        background: active ? "rgba(184,245,58,0.1)" : "transparent",
      }}
        onMouseOver={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        onMouseOut={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          {icon && <span style={{ color: active ? "#B8F53A" : "#7A9E85", display: "flex", flexShrink: 0 }}>{icon}</span>}
          <span style={{ fontSize: indent ? 12 : 13, fontFamily: "DM Sans, sans-serif", fontWeight: active ? 600 : 400, color: active ? "#F2F5EF" : "#7A9E85", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {label}
          </span>
        </div>
        {count !== undefined && count > 0 && (
          <span style={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace", background: active ? "#B8F53A" : "rgba(184,245,58,0.12)", color: active ? "#0D2B1E" : "#B8F53A", borderRadius: 100, padding: "1px 6px", fontWeight: 700, flexShrink: 0 }}>{count}</span>
        )}
      </button>
    );
  }

  function SectionHeader({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
    return (
      <button onClick={onToggle} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "4px 12px", background: "transparent", border: "none", cursor: "pointer", marginBottom: 4 }}>
        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px", fontFamily: "JetBrains Mono, monospace" }}>{label}</p>
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
    <div style={{ minHeight: "100vh", background: "#0B0F0E", display: "flex" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 248, flexShrink: 0, background: "#070D09",
        borderRight: "0.5px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #1A5C35, #0D2B1E)", border: "0.5px solid rgba(184,245,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LayoutDashboard size={14} color="#B8F53A" />
            </div>
            <div>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 13, color: "#F2F5EF", lineHeight: 1.2 }}>RENEWA</p>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "#B8F53A", letterSpacing: "2px" }}>ADMIN</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 6 }}>

          {/* SUBMISSIONS section */}
          <div>
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
          <div style={{ marginTop: 8 }}>
            <SectionHeader label="KEUANGAN" open={finOpen} onToggle={() => setFinOpen(!finOpen)} />
            {finOpen && (
              <div>
                <NavBtn v="finance" label="Fund Investor" icon={<TrendingUp size={14} />} />
                <NavBtn v="investors" label="Data Investor" icon={<Users size={14} />} />
              </div>
            )}
          </div>

          {/* AKUNTANSI section */}
          <div style={{ marginTop: 8 }}>
            <SectionHeader label="AKUNTANSI" open={accOpen} onToggle={() => setAccOpen(!accOpen)} />
            {accOpen && (
              <div>
                <NavBtn v="journal" label="Jurnal Umum" icon={<BookOpen size={14} />} />
                <NavBtn v="ledger" label="Buku Besar" icon={<BookMarked size={14} />} />
                <NavBtn v="trial-balance" label="Neraca Saldo" icon={<Calculator size={14} />} />
                <NavBtn v="profit-loss" label="Laba Rugi" icon={<PieChart size={14} />} />
                <NavBtn v="balance-sheet" label="Neraca" icon={<Landmark size={14} />} />
              </div>
            )}
          </div>

          {/* KONTEN section */}
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px", fontFamily: "JetBrains Mono, monospace", padding: "4px 12px", marginBottom: 4 }}>KONTEN</p>
            <NavBtn v="news" label="News & Insights" icon={<Newspaper size={14} />} />
            <NavBtn v="careers" label="Careers" icon={<Briefcase size={14} />} />
          </div>
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 10px 20px", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", padding: "6px 12px", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>admin@renewa.asia</p>
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: 8, width: "100%",
            padding: "8px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer",
            background: "transparent", border: "0.5px solid rgba(255,107,107,0.15)",
            color: "#7A9E85", fontFamily: "DM Sans, sans-serif",
          }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(255,107,107,0.08)"; e.currentTarget.style.color = "#ff6b6b"; }}
            onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#7A9E85"; }}
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Content ── */}
      <main style={{ flex: 1, minWidth: 0, padding: "32px 40px", overflowY: "auto" }}>
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 6 }}>
            {viewMeta[view].breadcrumb}
          </p>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#F2F5EF", letterSpacing: -0.5, marginBottom: 8 }}>
            {viewMeta[view].label}
          </h1>
          <div style={{ width: 28, height: 2, background: "#B8F53A", borderRadius: 1 }} />
        </div>

        {isSubmissionView && <SubmissionsView formType={activeFormType} />}
        {view === "news" && <NewsView />}
        {view === "careers" && <CareersView />}
        {view === "finance" && <FinanceView />}
        {view === "investors" && <InvestorsView />}
        {view === "journal" && <JournalView />}
        {view === "ledger" && <LedgerView />}
        {view === "trial-balance" && <TrialBalanceView />}
        {view === "profit-loss" && <ProfitLossView />}
        {view === "balance-sheet" && <BalanceSheetView />}
      </main>
    </div>
  );
}
