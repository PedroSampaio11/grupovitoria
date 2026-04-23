"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/constants/site';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function buildWhatsAppUrl(origem: string, destino: string, veiculo: string) {
  const phone = siteConfig.links.whatsapp.replace("https://wa.me/", "");
  const msg = encodeURIComponent(
    `Olá! Gostaria de uma cotação para transporte especializado:\n\n` +
    `📍 Origem: ${origem || "Não informado"}\n` +
    `📍 Destino: ${destino || "Não informado"}\n` +
    `🚐 Veículo: ${veiculo || "Não informado"}\n\n` +
    `Prezo pela segurança e integridade no transporte.`
  );
  return `https://wa.me/${phone}?text=${msg}`;
}

export function HeroCapture() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [veiculo, setVeiculo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = buildWhatsAppUrl(origem, destino, veiculo);
    window.open(url, "_blank");
  }

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #0B1727 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#EC223D] z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10"
      >
        {/* Esquerda: Contexto Corporativo */}
        <div className="flex flex-col space-y-6 md:space-y-8">
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase bg-slate-900 text-white rounded-sm">
              Logística de Veículos Especiais & Frotas
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[clamp(32px,7vw,84px)] font-bold tracking-normal text-slate-950 leading-[1.1] md:leading-[1.05]"
          >
            SEGURANÇA<br />
            <span className="text-[#EC223D]">PATRIMONIAL.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-600 max-w-md leading-relaxed font-medium"
          >
            Especialistas no transporte de Vans, Ambulâncias e Veículos Transformados. 
            Garantimos a integridade total do seu ativo, da coleta à entrega final.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-8 pt-4">
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-bold text-slate-950">100%</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Segurança</div>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-bold text-slate-950">Zero</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Avarias</div>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-bold text-slate-950">Elite</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Operacional</div>
            </div>
          </motion.div>
        </div>

        {/* Direita: Formulário Executivo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md mx-auto lg:ml-auto"
        >
          <form onSubmit={handleSubmit} className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <div className="px-8 py-8 md:px-10 border-b border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC223D] mb-2">
                Solicitação de Cotação
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Planejamento de Rota
              </h3>
            </div>

            <div className="px-8 py-8 md:px-10 space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                  placeholder="Origem (Cidade ou CEP)"
                  className="w-full h-12 md:h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:ring-1 focus:ring-[#EC223D] focus:border-transparent outline-none transition-all text-sm"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  placeholder="Destino (Cidade ou CEP)"
                  className="w-full h-12 md:h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:ring-1 focus:ring-[#EC223D] focus:border-transparent outline-none transition-all text-sm"
                />
              </div>

              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  required
                  value={veiculo}
                  onChange={(e) => setVeiculo(e.target.value)}
                  className="w-full h-12 md:h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-[#EC223D] focus:border-transparent outline-none appearance-none transition-all cursor-pointer text-sm"
                >
                  <option value="" className="bg-slate-950">Categoria do Veículo</option>
                  <option value="Vans de Passageiros" className="bg-slate-950">Vans de Passageiros</option>
                  <option value="Ambulâncias / UTI Móvel" className="bg-slate-950">Ambulâncias / UTI Móvel</option>
                  <option value="Veículos Transformados" className="bg-slate-950">Veículos Transformados</option>
                  <option value="Frota Corporativa Pesada" className="bg-slate-950">Frota Corporativa Pesada</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-12 md:h-14 bg-[#EC223D] hover:bg-[#c41c33] text-white font-bold uppercase tracking-[0.15em] text-[11px] md:text-xs rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:shadow-[#EC223D]/20 mt-2"
              >
                Solicitar Viabilidade
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="px-8 pb-8 md:px-10 text-center">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium">
                Atendimento Executivo B2B
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
