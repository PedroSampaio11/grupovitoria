"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, MapPin, Calendar } from 'lucide-react';

const DELIVERIES = [
  {
    id: 1,
    type: "photo" as const,
    title: "Entrega de frota governamental — 8 Vans",
    location: "São Paulo → Brasília",
    date: "Mar 2025",
    vehicle: "Vans",
    placeholder: "bg-slate-200",
  },
  {
    id: 2,
    type: "photo" as const,
    title: "Ambulância UTI Móvel — Integridade Total",
    location: "Curitiba → Rio de Janeiro",
    date: "Fev 2025",
    vehicle: "Especiais",
    placeholder: "bg-slate-300",
  },
  {
    id: 3,
    type: "video" as const,
    title: "Processo de Fixação em Veículos Transformados",
    location: "Hub São Paulo",
    date: "Jan 2025",
    vehicle: "Operacional",
    placeholder: "bg-slate-400",
  },
  {
    id: 4,
    type: "photo" as const,
    title: "Frota de Logística — Veículos Pesados",
    location: "Goiânia → Salvador",
    date: "Dez 2024",
    vehicle: "Pesados",
    placeholder: "bg-slate-200",
  },
  {
    id: 5,
    type: "photo" as const,
    title: "Van de Transporte Executivo",
    location: "Porto Alegre → Florianópolis",
    date: "Nov 2024",
    vehicle: "Vans",
    placeholder: "bg-slate-300",
  },
  {
    id: 6,
    type: "video" as const,
    title: "Embarque de Frotas Especiais",
    location: "Hub Curitiba",
    date: "Out 2024",
    vehicle: "Operacional",
    placeholder: "bg-slate-400",
  },
];

const FILTERS = ["Todos", "Vans", "Especiais", "Pesados", "Operacional"];

export function DeliveriesGallery() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeFilter === "Todos"
    ? DELIVERIES
    : DELIVERIES.filter(d => d.vehicle === activeFilter);

  return (
    <section className="py-16 md:py-28 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12"
        >
          <div>
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">
              Operações Reais
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-normal text-slate-950 mt-3 leading-tight">
              Portfólio de Entregas.
            </h2>
            <p className="mt-4 text-slate-600 font-medium max-w-md leading-relaxed">
              Documentação real das nossas operações de campo. 
              Preservação patrimonial e integridade técnica em cada projeto.
            </p>
          </div>

          {/* Filters - Touch Target Optimized */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mb-2">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-5 h-12 flex items-center shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] rounded-full transition-all
                  ${activeFilter === filter
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightbox(item.id)}
                className={`
                  group relative overflow-hidden rounded-xl cursor-pointer
                  ${i === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-[4/3]' : 'aspect-square'}
                `}
              >
                <div className={`absolute inset-0 ${item.placeholder} transition-transform duration-700 group-hover:scale-105`} />

                {/* Video badge */}
                {item.type === "video" && (
                  <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 text-[#EC223D] fill-[#EC223D] ml-0.5" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-bold text-lg leading-tight mb-2 tracking-normal">{item.title}</h3>
                  <div className="flex items-center gap-4 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                </div>

                {/* Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-slate-900/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-[0.15em] rounded-full border border-white/10">
                    {item.vehicle}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-slate-500 font-medium mb-6 text-sm">
            Documentação contínua de operações em campo.
          </p>
          <a
            href="https://instagram.com/vitoriatransportes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 h-12 bg-slate-950 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full hover:shadow-lg transition-all"
          >
            Acompanhar Operações Reais
          </a>
        </motion.div>

      </div>

      {/* Lightbox - Simple & Professional */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] bg-slate-950/95 flex items-center justify-center p-6 md:p-12"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-widest z-10"
            >
              FECHAR ✕
            </button>

            {(() => {
              const item = DELIVERIES.find(d => d.id === lightbox);
              if (!item) return null;
              return (
                <motion.div
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-5xl w-full"
                >
                  <div className={`w-full aspect-video rounded-xl ${item.placeholder} border border-white/5 shadow-2xl`} />
                  <div className="mt-8">
                    <h3 className="text-white text-2xl font-bold tracking-normal">{item.title}</h3>
                    <div className="flex items-center gap-6 text-white/40 text-[11px] font-bold uppercase tracking-widest mt-4">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.vehicle}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
