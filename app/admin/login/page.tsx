"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { login, isLoggedIn } from "@/lib/adminStore";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) router.replace("/admin/dashboard");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Email atau password salah.");
        setLoading(false);
      }
    }, 400);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8, fontSize: 14,
    background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.12)",
    color: "#F2F5EF", outline: "none", fontFamily: "DM Sans, sans-serif",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0B0F0E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>RENEWA</span>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: 22, color: "#B8F53A", textTransform: "uppercase" }}>ASIA</span>
          </div>
          <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.4)", letterSpacing: "3px" }}>ADMIN PANEL</p>
        </div>

        {/* Card */}
        <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#B8F53A,rgba(184,245,58,0.15))" }} />

          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, color: "#F2F5EF", marginBottom: 6, letterSpacing: -0.5 }}>Sign In</h1>
          <p style={{ fontSize: 14, color: "#7A9E85", fontWeight: 300, marginBottom: 28 }}>Masuk ke panel admin Renewa</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 }}>Email</label>
              <input
                required type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@renewa.asia"
                style={inp}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  required type={showPw ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inp, paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#7A9E85", display: "flex" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p style={{ fontSize: 13, color: "#ff6b6b", background: "rgba(255,107,107,0.08)", border: "0.5px solid rgba(255,107,107,0.2)", borderRadius: 8, padding: "10px 14px" }}>
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600,
              background: loading ? "rgba(184,245,58,0.5)" : "#B8F53A",
              color: "#0D2B1E", border: "none", cursor: loading ? "wait" : "pointer",
              fontFamily: "Syne, sans-serif", marginTop: 4, transition: "background 0.15s",
            }}>
              <LogIn size={15} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
          © {new Date().getFullYear()} PT Renewa Green Energy
        </p>
      </div>
    </div>
  );
}
