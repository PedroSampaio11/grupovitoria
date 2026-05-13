"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Submission {
  id: string;
  title: string | null;
  location: string;
  date: string;
  vehicle: string;
  image_url: string;
  type: string;
  status: string;
  submitted_at: string;
}

type FilterStatus = "pending" | "approved" | "rejected";

export default function AdminEntregasPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>("pending");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const storedPwd =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_password") || ""
      : "";

  const loadSubmissions = useCallback(
    async (pwd: string, status: FilterStatus) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/submissions?status=${status}`, {
          headers: { "x-admin-password": pwd },
        });
        if (res.ok) setSubmissions(await res.json());
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem("admin_password");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed && password) loadSubmissions(password, filter);
  }, [authed, filter, password, loadSubmissions]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      localStorage.setItem("admin_password", password);
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Senha incorreta.");
    }
  }

  async function handleAction(id: string, action: "approved" | "rejected") {
    setActionLoading(id);
    await fetch(`/api/deliveries/${id}/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password || storedPwd,
      },
      body: JSON.stringify({ action }),
    });
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    setActionLoading(null);
  }

  function handleLogout() {
    localStorage.removeItem("admin_password");
    setAuthed(false);
    setPassword("");
    setSubmissions([]);
  }

  const filterLabels: Record<FilterStatus, string> = {
    pending: "Pendentes",
    approved: "Aprovadas",
    rejected: "Rejeitadas",
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EC223D]">
              Admin
            </span>
            <h1 className="text-white text-2xl font-bold mt-2">
              Painel de Entregas
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Aprovação do portfólio
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              autoComplete="current-password"
              className="w-full h-12 bg-slate-900 border border-slate-800 rounded-xl px-4 text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
            />
            {authError && (
              <p className="text-red-400 text-sm text-center">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full h-12 bg-[#EC223D] text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* Header */}
        <div className="flex items-end justify-between pt-10 pb-8 border-b border-slate-900">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EC223D]">
              Admin
            </span>
            <h1 className="text-white text-3xl font-bold mt-1 tracking-tight">
              Aprovação de Entregas
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-600 text-[10px] font-bold uppercase tracking-wider hover:text-white transition-colors"
          >
            Sair
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mt-6 mb-8">
          {(Object.keys(filterLabels) as FilterStatus[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 h-9 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                filter === f
                  ? "bg-white text-slate-950"
                  : "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-600"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
          <button
            onClick={() => loadSubmissions(password || storedPwd, filter)}
            className="ml-auto px-4 h-9 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-600 transition-colors"
          >
            ↻ Atualizar
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 animate-pulse"
              >
                <div className="aspect-video bg-slate-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-slate-600 text-sm">
              Nenhuma entrega{" "}
              {filter === "pending"
                ? "pendente"
                : filter === "approved"
                ? "aprovada"
                : "rejeitada"}
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col"
              >
                <div className="relative aspect-video bg-slate-800">
                  {s.type === "video" ? (
                    <video
                      src={s.image_url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={s.image_url}
                      alt={s.title || s.location}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-[0.15em] rounded-full border border-white/10">
                      {s.vehicle}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <p className="text-white font-semibold text-sm leading-snug">
                    {s.title || `Entrega em ${s.location}`}
                  </p>
                  <div className="mt-2 space-y-0.5 text-slate-500 text-[11px]">
                    <p>{s.location}</p>
                    <p>{s.date}</p>
                    <p className="text-slate-700">
                      {new Date(s.submitted_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {filter === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleAction(s.id, "approved")}
                        disabled={actionLoading === s.id}
                        className="flex-1 h-9 bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-40"
                      >
                        {actionLoading === s.id ? "..." : "Aprovar"}
                      </button>
                      <button
                        onClick={() => handleAction(s.id, "rejected")}
                        disabled={actionLoading === s.id}
                        className="flex-1 h-9 bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-40"
                      >
                        {actionLoading === s.id ? "..." : "Rejeitar"}
                      </button>
                    </div>
                  )}

                  {filter !== "pending" && (
                    <div className="mt-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          filter === "approved"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {filter === "approved" ? "Aprovada" : "Rejeitada"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
