"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  SecurityCheckIcon, 
  DeliveryTruck01Icon, 
  Clock01Icon, 
  Award01Icon 
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

interface BentoItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  index: number;
}

const BentoItem = ({ title, description, icon, className, index }: BentoItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className={cn(
      "group relative p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#EC223D]/10 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden",
      className
    )}
  >
    {/* Decorative Gradient */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#EC223D]/5 transition-colors duration-500" />
    
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-auto p-4 w-fit rounded-2xl bg-slate-50 text-slate-400 group-hover:text-[#EC223D] group-hover:bg-[#EC223D]/5 transition-all duration-500">
        {icon}
      </div>
      <div className="mt-8">
        <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tighter text-slate-950 uppercase">{title}</h3>
        <p className="text-sm leading-relaxed font-medium text-slate-500 group-hover:text-slate-600 transition-colors">{description}</p>
      </div>
    </div>
  </motion.div>
);

export function BentoGrid() {
  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC223D] block mb-4">Padrão Ouro</span>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-slate-950 leading-[0.95]">
            Preservação<br />de Ativos.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[340px]">
          <BentoItem
            index={0}
            className="md:col-span-2 md:row-span-2 min-h-[400px]"
            title="Integridade Absoluta"
            description="Protocolos rigorosos de fixação e transporte. Cada veículo é tratado como um ativo insubstituível, com garantia de integridade total da coleta ao destino final."
            icon={<HugeiconsIcon icon={SecurityCheckIcon} size={32} />}
          />
          <BentoItem
            index={1}
            className="md:col-span-2"
            title="Frota Especializada"
            description="Equipamentos dimensionados para veículos de grande porte, como vans executivas e ambulâncias."
            icon={<HugeiconsIcon icon={DeliveryTruck01Icon} size={32} />}
          />
          <BentoItem
            index={2}
            className="md:col-span-1"
            title="Rigor Operacional"
            description="Processos validados para segurança máxima em cada etapa."
            icon={<HugeiconsIcon icon={Clock01Icon} size={28} />}
          />
          <BentoItem
            index={3}
            className="md:col-span-1"
            title="Conformidade"
            description="Padrões B2B de excelência e certificação contínua."
            icon={<HugeiconsIcon icon={Award01Icon} size={28} />}
          />
        </div>
      </div>
    </section>
  );
}
