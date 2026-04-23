"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TIMELINE = [
  {
    year: "2012",
    title: "Fundação & Pilares",
    description: "Início das operações focadas no transporte de veículos pesados. O compromisso com a integridade patrimonial é estabelecido como norma fundamental.",
  },
  {
    year: "2015",
    title: "Consolidação de Rotas",
    description: "Expansão da capacidade logística para atender montadoras e revendedoras no eixo Sul-Sudeste, com foco em segurança absoluta na estrada.",
  },
  {
    year: "2019",
    title: "Especialização em Vans",
    description: "Inauguração da vertical dedicada a Vans e Ambulâncias. Desenvolvimento de protocolos específicos de fixação para veículos transformados.",
  },
  {
    year: "2022",
    title: "Excelência Operacional",
    description: "Refinamento do protocolo de vistoria de 47 pontos e consolidação da malha nacional atendendo todos os 27 estados com rigor corporativo.",
  },
  {
    year: "Hoje",
    title: "Referência B2B",
    description: "Liderança técnica no transporte de frotas especiais. Patrimônio protegido por uma estrutura de segurança robusta e processos certificados.",
  },
];

interface TimelineItemProps {
  item: typeof TIMELINE[0];
  index: number;
  isLast: boolean;
}

function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex gap-6 md:gap-8">
      {/* Left: Year + Line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center z-10 shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-[#EC223D]" />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-[1px] flex-1 bg-slate-200 origin-top mt-2"
          />
        )}
      </div>

      {/* Right: Content */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`pb-12 md:pb-16 ${isLast ? 'pb-0' : ''}`}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">
          {item.year}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-slate-950 mt-1 mb-3 tracking-normal">
          {item.title}
        </h3>
        <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base max-w-lg">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export function LegacyTimeline() {
  return (
    <section className="py-16 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">

          {/* Esquerda: Título */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">
                Histórico & Solidez
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-normal text-slate-950 mt-4 leading-tight">
                Nossa Trajetória.
              </h2>
              <p className="mt-6 text-slate-600 font-medium leading-relaxed max-w-sm">
                Uma década de especialização no transporte de veículos pesados. 
                Construímos um legado baseado em segurança e integridade patrimonial.
              </p>

              <div className="mt-12 p-8 bg-slate-950 rounded-2xl border border-white/5 shadow-2xl">
                <div className="text-4xl md:text-5xl font-bold text-white leading-none">12+</div>
                <div className="text-white/80 font-bold uppercase tracking-widest text-[10px] mt-3">Anos de Especialização</div>
                <div className="text-white/40 text-xs font-medium mt-2 leading-relaxed">
                  Tradição aliada ao rigor operacional para frotas corporativas.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Direita: Timeline */}
          <div className="pt-4">
            {TIMELINE.map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
                isLast={index === TIMELINE.length - 1}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
