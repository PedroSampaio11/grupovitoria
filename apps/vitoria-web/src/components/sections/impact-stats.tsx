"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const STATS = [
  {
    value: "12",
    label: "Anos de Tradição",
    description: "Expertise consolidada no transporte de veículos especiais e frotas governamentais.",
  },
  {
    value: "27",
    label: "Estados Atendidos",
    description: "Cobertura nacional completa com rigor operacional em todas as capitais brasileiras.",
  },
  {
    value: "R$ 2Bi",
    label: "Patrimônio Protegido",
    description: "Garantia de integridade total em cada quilômetro percorrido sob nossa responsabilidade.",
  },
  {
    value: "99.9%",
    label: "Índice de Entrega",
    description: "Excelência logística focada na preservação absoluta do ativo transportado.",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function ImpactStats() {
  return (
    <section className="py-16 md:py-28 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">
            Autoridade & Segurança
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-normal text-slate-950 mt-3 leading-tight">
            Métricas de Confiança.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-950 mb-3 tracking-normal">
                {stat.value}
              </div>

              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-900 mb-2">
                {stat.label}
              </div>

              <p className="text-sm leading-relaxed font-medium text-slate-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
