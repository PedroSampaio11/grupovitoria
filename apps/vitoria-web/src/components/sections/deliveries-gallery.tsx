"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  Location01Icon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";
import { supabase } from "@/lib/supabase";

interface DeliveryItem {
  id: string;
  type: "image" | "video";
  title: string;
  location: string;
  date: string;
  vehicle: string;
  thumbnail: string;
  videoUrl?: string;
}

const STATIC_DELIVERIES: DeliveryItem[] = [
  {
    id: "s-1",
    type: "video",
    title: "Operação Logística Integrada",
    location: "São Paulo, SP",
    date: "MAR 2024",
    vehicle: "Operacional",
    thumbnail: "/imagens/1.png",
    videoUrl: "https://www.youtube.com/embed/iwggY1dWOP8",
  },
  {
    id: "s-2",
    type: "image",
    title: "Transporte de Vans Executivas",
    location: "Curitiba, PR",
    date: "FEV 2024",
    vehicle: "Vans",
    thumbnail: "/imagens/2.jpeg",
  },
  {
    id: "s-3",
    type: "image",
    title: "Remessa de Ambulâncias UTI",
    location: "Rio de Janeiro, RJ",
    date: "JAN 2024",
    vehicle: "Especiais",
    thumbnail: "/imagens/3.jpeg",
  },
  {
    id: "s-4",
    type: "image",
    title: "Distribuição de Frota Pesada",
    location: "Belo Horizonte, MG",
    date: "DEZ 2023",
    vehicle: "Pesados",
    thumbnail: "/imagens/4.jpeg",
  },
  {
    id: "s-5",
    type: "image",
    title: "Logística de Veículos Transformados",
    location: "Salvador, BA",
    date: "NOV 2023",
    vehicle: "Especiais",
    thumbnail: "/imagens/5.jpeg",
  },
  {
    id: "s-6",
    type: "image",
    title: "Entrega Técnica Especializada",
    location: "Brasília, DF",
    date: "OUT 2023",
    vehicle: "Operacional",
    thumbnail: "/imagens/6.jpeg",
  },
  {
    id: "s-7",
    type: "image",
    title: "Movimentação de Frota Corporativa",
    location: "Porto Alegre, RS",
    date: "SET 2023",
    vehicle: "Pesados",
    thumbnail: "/imagens/7.jpg",
  },
  {
    id: "s-8",
    type: "image",
    title: "Segurança em Transporte de Elite",
    location: "Vitória, ES",
    date: "AGO 2023",
    vehicle: "Vans",
    thumbnail: "/imagens/8.jpeg",
  },
  {
    id: "s-9",
    type: "image",
    title: "Transporte de Implementos Rodoviários",
    location: "Joinville, SC",
    date: "AGO 2005",
    vehicle: "Pesados",
    thumbnail: "/imagens/9.jpeg",
  },
  {
    id: "s-10",
    type: "image",
    title: "Logística de Blindados e Especiais",
    location: "São Paulo, SP",
    date: "MAI 2007",
    vehicle: "Especiais",
    thumbnail: "/imagens/10.jpeg",
  },
  {
    id: "s-11",
    type: "image",
    title: "Distribuição de Unidades Móveis",
    location: "Campinas, SP",
    date: "SET 2009",
    vehicle: "Operacional",
    thumbnail: "/imagens/11.jpeg",
  },
  {
    id: "s-12",
    type: "image",
    title: "Remessa de Veículos de Emergência",
    location: "Fortaleza, CE",
    date: "MAR 2011",
    vehicle: "Especiais",
    thumbnail: "/imagens/12.jpeg",
  },
  {
    id: "s-13",
    type: "image",
    title: "Transporte de Micro-ônibus Executivos",
    location: "Florianópolis, SC",
    date: "JUL 2012",
    vehicle: "Vans",
    thumbnail: "/imagens/13.jpeg",
  },
  {
    id: "s-14",
    type: "image",
    title: "Operação de Frota Customizada",
    location: "Manaus, AM",
    date: "JAN 2013",
    vehicle: "Operacional",
    thumbnail: "/imagens/14.jpeg",
  },
  {
    id: "s-15",
    type: "image",
    title: "Logística de Maquinário Industrial",
    location: "Recife, PE",
    date: "OUT 2014",
    vehicle: "Pesados",
    thumbnail: "/imagens/15.jpeg",
  },
  {
    id: "s-16",
    type: "image",
    title: "Entrega de Unidades Operacionais",
    location: "Goiânia, GO",
    date: "JUN 2015",
    vehicle: "Operacional",
    thumbnail: "/imagens/16.jpeg",
  },
  {
    id: "s-17",
    type: "image",
    title: "Transporte de Frota de Segurança",
    location: "Belém, PA",
    date: "DEZ 2016",
    vehicle: "Vans",
    thumbnail: "/imagens/17.jpeg",
  },
];

const FILTERS = ["Todos", "Vans", "Especiais", "Pesados", "Operacional"];

export function DeliveriesGallery() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [dynamicItems, setDynamicItems] = useState<DeliveryItem[]>([]);

  useEffect(() => {
    supabase
      .from("delivery_submissions")
      .select("id, title, location, date, vehicle, image_url, type")
      .eq("status", "approved")
      .order("submitted_at", { ascending: false })
      .then(({ data }) => {
        if (!data) return;
        setDynamicItems(
          data.map((row) => ({
            id: row.id,
            type: (row.type === "video" ? "video" : "image") as "image" | "video",
            title: row.title || `Entrega em ${row.location}`,
            location: row.location,
            date: row.date,
            vehicle: row.vehicle,
            thumbnail: row.image_url,
            videoUrl: row.type === "video" ? row.image_url : undefined,
          }))
        );
      });
  }, []);

  const allItems = [...dynamicItems, ...STATIC_DELIVERIES];

  const filtered =
    activeFilter === "Todos"
      ? allItems
      : allItems.filter((d) => d.vehicle === activeFilter);

  const lightboxItem = allItems.find((d) => d.id === lightbox);

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
              Documentação real das nossas operações de campo. Preservação
              patrimonial e integridade técnica em cada projeto.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mb-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-5 h-12 flex items-center shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] rounded-full transition-all
                  ${
                    activeFilter === filter
                      ? "bg-slate-950 text-white"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300"
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
                  ${i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3]" : "aspect-square"}
                `}
              >
                <div className="absolute inset-0 bg-slate-100 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    priority={i === 0}
                    className="object-cover"
                  />
                </div>

                {item.type === "video" && (
                  <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <HugeiconsIcon
                      icon={PlayIcon}
                      size={16}
                      className="text-[#EC223D] ml-0.5"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-bold text-lg leading-tight mb-2 tracking-normal">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <HugeiconsIcon icon={Location01Icon} size={12} />{" "}
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HugeiconsIcon icon={Calendar01Icon} size={12} />{" "}
                      {item.date}
                    </span>
                  </div>
                </div>

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
            href="https://www.instagram.com/grupovitoria/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 h-12 bg-slate-950 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full hover:shadow-lg transition-all"
          >
            Acompanhar Operações Reais
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && lightboxItem && (
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

            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/5 shadow-2xl">
                {lightboxItem.type === "video" && lightboxItem.videoUrl ? (
                  lightboxItem.videoUrl.includes("youtube.com") ||
                  lightboxItem.videoUrl.includes("youtu.be") ? (
                    <iframe
                      src={lightboxItem.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={lightboxItem.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <Image
                    src={lightboxItem.thumbnail}
                    alt={lightboxItem.title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              <div className="mt-8">
                <h3 className="text-white text-2xl font-bold tracking-normal">
                  {lightboxItem.title}
                </h3>
                <div className="flex items-center gap-6 text-white/40 text-[11px] font-bold uppercase tracking-widest mt-4">
                  <span>{lightboxItem.location}</span>
                  <span>•</span>
                  <span>{lightboxItem.date}</span>
                  <span>•</span>
                  <span>{lightboxItem.vehicle}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
