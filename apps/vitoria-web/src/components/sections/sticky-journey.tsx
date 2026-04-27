"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon, Tick01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

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
  },
  {
    number: "05",
    title: "Entrega Porta-a-Porta",
    description: "Nosso diferencial: entregamos no local exato solicitado. Sem intermediários, garantindo comodidade e precisão absoluta na porta do seu cliente.",
    isDifferential: true
  }
];

export function StickyJourney() {
  return (
    <section className="py-16 md:py-28 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 md:gap-16">

        {/* Esquerda - Sticky (Simples como antes) */}
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
              {STEPS.length} Estágios de Controle
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
              className={`group p-8 md:p-10 bg-white rounded-2xl border transition-all duration-500 shadow-sm relative overflow-hidden ${
                step.isDifferential 
                  ? "border-[#EC223D]/30 ring-1 ring-[#EC223D]/10" 
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Diferencial Decor sutil */}
              {step.isDifferential && (
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                  <HugeiconsIcon icon={Location01Icon} size={100} className="text-[#EC223D]" />
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-8 relative z-10">
                {/* Número que "acende" */}
                <motion.span 
                  initial={{ color: "#e2e8f0" }}
                  whileInView={{ color: step.isDifferential ? "#EC223D" : "#0f172a" }}
                  viewport={{ margin: "-15%" }}
                  className="text-5xl md:text-7xl font-bold leading-none shrink-0 transition-colors duration-700"
                >
                  {step.number}
                </motion.span>

                <div className="pt-2">
                  {step.isDifferential && (
                    <div className="flex items-center gap-2 mb-2">
                      <HugeiconsIcon icon={Tick01Icon} size={14} className="text-[#EC223D]" />
                      <span className="text-[10px] font-black text-[#EC223D] uppercase tracking-[0.3em] block">
                        Diferencial Vitória
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-950 mb-3 tracking-normal">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">
                    {step.description}
                  </p>
                  
                  {step.isDifferential && (
                    <div className="flex items-center gap-3 mt-6">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-[2px] bg-gradient-to-r from-[#EC223D] to-transparent"
                      />
                      <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-[#EC223D]" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
