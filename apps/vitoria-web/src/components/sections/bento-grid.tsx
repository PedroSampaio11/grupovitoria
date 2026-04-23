"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Clock, Award } from 'lucide-react';
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
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={cn(
      "group relative p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all duration-300 cursor-default",
      className
    )}
  >
    <div className="relative z-10 h-full flex flex-col justify-end">
      <div className="mb-5 p-3 w-fit rounded-xl bg-white border border-slate-100 shadow-sm text-[#EC223D]">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-normal text-slate-950">{title}</h3>
      <p className="text-sm leading-relaxed font-medium text-slate-600">{description}</p>
    </div>
  </motion.div>
);

export function BentoGrid() {
  return (
    <section className="py-16 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">Diferenciais Corporativos</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-normal text-slate-950 mt-3 leading-tight">
            Preservação de Ativos.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto md:auto-rows-[300px]">
          <BentoItem
            index={0}
            className="md:col-span-2 md:row-span-2 min-h-[350px]"
            title="Integridade Absoluta"
            description="Protocolos rigorosos de fixação e transporte. Cada veículo é tratado como um ativo insubstituível, com garantia de integridade total da coleta ao destino final."
            icon={<ShieldCheck className="w-8 h-8" />}
          />
          <BentoItem
            index={1}
            className="md:col-span-2"
            title="Frota Especializada"
            description="Equipamentos dimensionados para veículos de grande porte, como vans executivas e ambulâncias."
            icon={<Truck className="w-8 h-8" />}
          />
          <BentoItem
            index={2}
            title="Rigidez Operacional"
            description="Processos validados para segurança máxima."
            icon={<Clock className="w-6 h-6" />}
          />
          <BentoItem
            index={3}
            title="Certificações"
            description="Padrões de conformidade B2B."
            icon={<Award className="w-6 h-6" />}
          />
        </div>
      </div>
    </section>
  );
}
