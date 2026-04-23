"use client";

import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    number: "01",
    title: "Vistoria de Conformidade",
    description: "Inspeção técnica detalhada com laudo de integridade. Verificação de 47 pontos críticos para garantir o estado original do veículo no embarque."
  },
  {
    number: "02",
    title: "Embarque de Precisão",
    description: "Uso de calços pneumáticos e cintas de alta resistência homologadas. Imobilização total para garantir segurança absoluta durante o transporte."
  },
  {
    number: "03",
    title: "Protocolo de Segurança",
    description: "Segurança total dos nossos motoristas e preservação patrimonial rigorosa em todas as rotas nacionais, mitigando riscos e garantindo integridade."
  },
  {
    number: "04",
    title: "Entrega Certificada",
    description: "Conferência final assistida por técnicos. Validação do laudo de integridade e entrega formalizada com foco em zero avarias."
  }
];

export function StickyJourney() {
  return (
    <section className="py-16 md:py-28 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 md:gap-16">

        {/* Esquerda - Sticky */}
        <div className="lg:w-2/5 lg:sticky lg:top-32 h-fit">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">
            Logística Corporativa
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-normal text-slate-950 mt-4 leading-tight">
            Nossa Metodologia.
          </h2>
          <p className="mt-6 text-slate-600 font-medium leading-relaxed max-w-sm">
            Um processo arquitetado para garantir a integridade absoluta do seu patrimônio. 
            Cada quilômetro é executado sob rigorosos padrões de segurança.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <div className="w-8 h-[2px] bg-[#EC223D]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              4 Estágios de Controle
            </span>
          </div>
        </div>

        {/* Direita - Scrollable */}
        <div className="lg:w-3/5 space-y-4 md:space-y-6">
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-8 md:p-10 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-500 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-8">
                <span className="text-5xl md:text-7xl font-bold text-slate-200 leading-none shrink-0 group-hover:text-slate-300 transition-colors">
                  {step.number}
                </span>
                <div className="pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-950 mb-3 tracking-normal">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
