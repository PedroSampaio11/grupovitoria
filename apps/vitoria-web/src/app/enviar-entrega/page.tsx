"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const VEHICLES = ["Vans", "Especiais", "Pesados", "Operacional"];

export default function EnviarEntregaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;
    setFile(picked);
    setIsVideo(picked.type.startsWith("video/"));
    setPreview(URL.createObjectURL(picked));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !location || !date || !vehicle) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("vehicle", vehicle);
    if (title) formData.append("title", title);

    try {
      const res = await fetch("/api/deliveries/submit", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSuccess(false);
    setFile(null);
    setPreview(null);
    setIsVideo(false);
    setLocation("");
    setDate("");
    setVehicle("");
    setTitle("");
    setError("");
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-9 h-9 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-white text-2xl font-bold mb-3">Entrega registrada!</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Foto enviada com sucesso. Após aprovação ela aparecerá no portfólio do site.
          </p>
          <button
            onClick={resetForm}
            className="px-8 h-12 bg-[#EC223D] text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full"
          >
            Enviar Outra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-lg mx-auto px-6 pb-12">
        {/* Header */}
        <div className="pt-12 pb-8 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EC223D]">
            Grupo Vitória
          </span>
          <h1 className="text-white text-3xl font-bold mt-2 tracking-tight">
            Registrar Entrega
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Fotografe e registre a operação realizada
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Media upload */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
              Foto ou Vídeo *
            </label>
            {preview ? (
              <div
                className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group bg-slate-900"
                onClick={() => fileRef.current?.click()}
              >
                {isVideo ? (
                  <video
                    src={preview}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                    Trocar arquivo
                  </span>
                </div>
                {isVideo && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                    Vídeo
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-slate-800 hover:border-slate-600 active:border-slate-500 transition-colors flex flex-col items-center justify-center py-10 gap-3"
              >
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">
                    Tirar foto, gravar ou selecionar
                  </p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Foto ou vídeo da entrega
                  </p>
                </div>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
              Local da Entrega *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: São Paulo, SP"
              className="w-full h-12 bg-slate-900 border border-slate-800 rounded-xl px-4 text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 text-sm"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
              Data *
            </label>
            <input
              type="date"
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-12 bg-slate-900 border border-slate-800 rounded-xl px-4 text-white focus:outline-none focus:border-slate-600 text-sm"
            />
          </div>

          {/* Vehicle category */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
              Categoria *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VEHICLES.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVehicle(v)}
                  className={`h-12 rounded-xl text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${
                    vehicle === v
                      ? "bg-[#EC223D] text-white border border-[#EC223D]"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Title (optional) */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
              Descrição{" "}
              <span className="text-slate-700 normal-case tracking-normal font-normal">
                (opcional)
              </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entrega de vans para cliente corporativo"
              className="w-full h-12 bg-slate-900 border border-slate-800 rounded-xl px-4 text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 text-sm"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#EC223D] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mt-2 disabled:opacity-50 transition-opacity"
          >
            {loading ? "Enviando..." : "Enviar Entrega"}
          </button>
        </form>
      </div>
    </div>
  );
}
