"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

// ── Dados da Timeline ──────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: "1992",
    index: "01",
    pretitle: "A Gênese da Vitória",
    title: "Fundação e Tradição",
    description:
      "Nascemos com um propósito claro: redefinir a integridade no transporte. Desde o primeiro quilômetro, a segurança patrimonial tornou-se nossa assinatura irrevogável.",
    image: "https://plus.unsplash.com/premium_photo-1661963986760-6e0213e25927?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Rodovia executiva
  },
  {
    year: "2005",
    index: "02",
    pretitle: "Expansão de Horizontes",
    title: "Consolidação Nacional",
    description:
      "A Vitória rompe fronteiras. Ampliamos nossa malha logística para conectar grandes indústrias aos quatro cantos do Brasil, mantendo o padrão de elite em cada entrega.",
    image: "https://images.unsplash.com/photo-1496055401924-5e7fdc885742?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Caminhão em estrada cênica
  },
  {
    year: "2015",
    index: "03",
    pretitle: "Inovação Especializada",
    title: "Liderança em Frotas",
    description:
      "Verticalizamos nossa expertise para veículos transformados. Ambulâncias e viaturas de alta complexidade passam a contar com protocolos exclusivos de segurança Vitória.",
    image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=2070&auto=format&fit=crop", // Van em movimento
  },
  {
    year: "2020",
    index: "04",
    pretitle: "O Padrão Ouro",
    title: "Excelência Operacional",
    description:
      "Implementamos vistorias de 47 pontos e inteligência logística avançada. Nossa performance atinge o ápice, garantindo 100% de proteção ao patrimônio corporativo.",
    image: "/banners/rodovia.jpg", // Imagem específica solicitada
  },
  {
    year: "Hoje",
    index: "05",
    pretitle: "Visão de Futuro",
    title: "Referência B2B Absoluta",
    description:
      "Três décadas de liderança técnica. Hoje, a Vitória Transportes é o braço direito do mercado corporativo, operando com estrutura de elite e processos certificados.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop", // Visão moderna de transporte
  },
];

const SPRING_CONFIG = { stiffness: 45, damping: 25, mass: 1 };

// ── Painel de Parallax Refinado ───────────────────────────────────────────
function ParallaxPanel({
  item,
  index,
  total,
}: {
  item: (typeof TIMELINE)[0];
  index: number;
  total: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  // Image Animations: Subtler zoom + cleaner movement
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  // Text Animations: Staggered offsets and opacity
  const headerY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const yearY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [50, 0, 0, -50]);
  const yearOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.15, 0]);

  const titleY = useTransform(scrollYProgress, [0.05, 0.4, 0.6, 0.95], [40, 0, 0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], [0, 1, 1, 0]);

  const descY = useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [30, 0, 0, -30]);
  const descOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

  return (
    <div
      ref={panelRef}
      className="relative h-screen w-full overflow-hidden bg-slate-950"
    >
      {/* ── Background Image ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imgScale, opacity: imgOpacity }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover brightness-[0.5] saturate-[1.1]"
        />
      </motion.div>

      {/* ── Overlay Masks ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      {/* ── Main Content ── */}
      <div className="container relative z-20 mx-auto flex h-full items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <motion.div
            className="flex items-center gap-6 mb-4"
            style={{ y: headerY, opacity: headerOpacity }}
          >
            <div className="flex flex-col">
              <span className="text-[#EC223D] font-mono text-xs font-bold tracking-[0.5em] uppercase mb-1">
                Timeline
              </span>
              <span className="text-white text-3xl font-bold font-mono">
                {item.index}
              </span>
            </div>
            <div className="h-12 w-[1px] bg-white/20" />
            <span className="text-white/60 text-sm font-medium uppercase tracking-[0.4em] max-w-[200px] leading-tight">
              {item.pretitle}
            </span>
          </motion.div>

          {/* Decorative Year (Moved back up and made more visible) */}
          <motion.h3
            className="text-white font-black text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter mb-[-1.5rem] md:mb-[-3rem] select-none"
            style={{ y: yearY, opacity: yearOpacity }}
          >
            {item.year}
          </motion.h3>

          {/* Title Section */}
          <motion.h2
            className="text-white text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-tighter mb-10"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            {item.title}
          </motion.h2>

          {/* Description Section */}
          <motion.div
            className="flex gap-10 items-start"
            style={{ y: descY, opacity: descOpacity }}
          >
            <div className="w-1.5 h-20 bg-[#EC223D] shrink-0 mt-2 shadow-[0_0_15px_rgba(236,34,61,0.5)]" />
            <p className="text-white/70 text-lg md:text-2xl leading-relaxed max-w-2xl font-light tracking-wide">
              {item.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── High-Tech Lateral Progress ── */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6">
        <div className="flex flex-col gap-3">
          {TIMELINE.map((_, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center"
            >
              <div
                className={`w-1 transition-all duration-700 ease-out rounded-full ${
                  index === i
                    ? "h-16 bg-[#EC223D]" : "h-4 bg-white/10 group-hover:bg-white/30"
                }`}
              />
              {index === i && (
                <motion.div
                  layoutId="active-glow"
                  className="absolute -inset-2 bg-[#EC223D]/20 blur-md rounded-full -z-10"
                />
              )}
            </div>
          ))}
        </div>
        <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] [writing-mode:vertical-lr] rotate-180">
          Progresso
        </span>
      </div>

      {/* ── Minimal Scroll Indicator (Subtler) ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
        <span className="text-white/40 text-[8px] font-medium uppercase tracking-[0.4em] ml-[0.4em]">
          Scroll
        </span>
      </div>
    </div>
  );
}

// ── Componente Principal ───────────────────────────────────────────────────
export function LegacyTimeline() {
  return (
    <section className="bg-slate-950">
      {/* ── Painéis ── */}
      {TIMELINE.map((item, i) => (
        <ParallaxPanel
          key={i}
          item={item}
          index={i}
          total={TIMELINE.length}
        />
      ))}
    </section>
  );
}