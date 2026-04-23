"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Bus, ShieldCheck } from 'lucide-react';

const FLEET = [
  {
    id: "vans",
    label: "Vans Executivas",
    capacity: "Transporte Especializado",
    description: "Operação dedicada ao transporte de vans de passageiros e frotas executivas. Logística dimensionada para veículos de grande porte com foco em preservação.",
    specs: [
      { label: "Categoria", value: "Passageiros / Carga" },
      { label: "Segurança", value: "Proteção Total" },
      { label: "Prazo", value: "Sob Demanda" },
      { label: "SLA", value: "Excelência B2B" },
    ],
    bgGradient: "from-slate-800 to-slate-900",
    icon: <Bus className="w-16 h-16" />,
  },
  {
    id: "especiais",
    label: "Veículos Especiais",
    capacity: "Ambulâncias & UTI",
    description: "Transporte de alta responsabilidade para ambulâncias e veículos transformados. Protocolos específicos para garantir que equipamentos sensíveis cheguem intactos.",
    specs: [
      { label: "Tipo", value: "Unidades Móveis" },
      { label: "Cuidado", value: "Nível Máximo" },
      { label: "Seguro", value: "Cobertura Ampla" },
      { label: "Metodologia", value: "Rigor Técnica" },
    ],
    bgGradient: "from-slate-900 to-black",
    icon: <ShieldCheck className="w-16 h-16" />,
  },
  {
    id: "pesados",
    label: "Frotas Corporativas",
    capacity: "Pesados & Utilitários",
    description: "Soluções estruturadas para movimentação de frotas industriais e comerciais. Logística de alto volume com foco em eficiência e segurança do patrimônio.",
    specs: [
      { label: "Volume", value: "Frotas Lote" },
      { label: "Modal", value: "Especializado" },
      { label: "Segurança", value: "Risco Zero" },
      { label: "Status", value: "Operação Elite" },
    ],
    bgGradient: "from-slate-800 to-slate-950",
    icon: <Truck className="w-16 h-16" />,
  },
];

export function FleetTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const active = FLEET[activeTab];

  return (
    <section className="py-16 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">
            Frota de Elite
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-normal text-slate-950 mt-3 leading-tight">
            Nossa Capacidade.
          </h2>
        </motion.div>

        {/* Tabs - Touch Target Optimized */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {FLEET.map((fleet, i) => (
            <button
              key={fleet.id}
              onClick={() => setActiveTab(i)}
              className={`
                px-6 h-12 flex-shrink-0 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300
                ${activeTab === i
                  ? 'bg-slate-950 text-white shadow-lg'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-[#EC223D]/40'
                }
              `}
            >
              {fleet.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Visual Card - Executive Style */}
            <div className={`bg-gradient-to-br ${active.bgGradient} rounded-2xl p-10 flex flex-col justify-between min-h-[350px] md:min-h-[400px] border border-white/5`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">
                  {active.capacity}
                </span>
                <div className="mt-8 text-slate-400 opacity-20">
                  {active.icon}
                </div>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-normal mt-8">
                  {active.label}
                </h3>
                <div className="w-10 h-[2px] bg-[#EC223D] mt-6" />
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                  {active.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-10">
                  {active.specs.map((spec) => (
                    <div key={spec.label} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#EC223D] mb-1">
                        {spec.label}
                      </div>
                      <div className="font-bold text-slate-900 text-sm">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full h-14 mt-10 bg-[#EC223D] hover:bg-[#c41c33] text-white font-bold uppercase tracking-[0.15em] text-[10px] md:text-xs rounded-xl transition-all hover:shadow-lg hover:shadow-[#EC223D]/20">
                Consultar Disponibilidade de Frota
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
