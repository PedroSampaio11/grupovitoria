"use client";

import React from 'react';
import { TopBar } from "@/components/shared/top-bar";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from 'framer-motion';

export default function TermosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <TopBar />
      <Navbar />
      <main className="flex-grow pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC223D] mb-4 block">
              Jurídico & Compliance
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-normal text-slate-950 leading-tight mb-8">
              Termos e Condições<br/>de Transporte B2B
            </h1>
            <div className="w-16 h-1 bg-[#EC223D] mb-12" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-slate prose-h2:text-slate-900 prose-h2:text-2xl prose-h2:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 max-w-none"
          >
            <p>
              Estes Termos e Condições Gerais de Transporte B2B ("Termos") regulam a prestação de serviços logísticos especializados pela Vitória Transportes ("Transportadora") a seus clientes corporativos ("Contratante").
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">1. Escopo dos Serviços</h2>
            <p>
              A Vitória Transportes é especializada na logística e transporte de veículos pesados, vans executivas, ambulâncias (UTI móvel) e veículos transformados. O serviço abrange a coleta na origem acordada, procedimentos de fixação especializados e entrega no destino especificado, cobrindo todo o território nacional.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">2. Integridade e Preservação do Ativo</h2>
            <p>
              Tratamos o seu veículo não como carga comum, mas como um ativo de alto valor. Nosso compromisso inegociável inclui:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600">
              <li>Vistoria rigorosa de múltiplos pontos no momento da coleta e da entrega.</li>
              <li>Uso de equipamentos de amarração e fixação homologados e específicos para frotas pesadas e veículos transformados.</li>
              <li>Proibição estrita de empilhamento de frotas especiais ou uso de equipamentos que possam danificar chassis modificados.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">3. Obrigações do Contratante</h2>
            <p>
              Para assegurar o rigor operacional e o cumprimento do SLA (Acordo de Nível de Serviço), o Contratante deve:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600">
              <li>Fornecer toda a documentação fiscal e de licenciamento necessária para o trânsito do ativo.</li>
              <li>Garantir que o veículo encontra-se em condições de rolagem para manobras logísticas, salvo acordo prévio.</li>
              <li>Informar antecipadamente qualquer peculiaridade estrutural do veículo (ex: modificações de UTI móvel, blindagem).</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">4. Política de Seguros</h2>
            <p>
              Todas as operações logísticas da Vitória Transportes são acobertadas por apólices de seguro RCTR-C (Responsabilidade Civil do Transportador Rodoviário de Carga) e RCF-DC (Desaparecimento de Carga). Em caso de sinistro, a Vitória Transportes acionará sua seguradora para reparação total do ativo, nos limites da apólice contratada.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">5. Prazos e Operações Elite</h2>
            <p>
              Os prazos de entrega informados são estimativas rigorosas baseadas em nossa malha nacional. Como operamos no modelo Elite Operacional, fatores externos como fiscalizações estaduais (Sefaz), condições climáticas extremas e bloqueios rodoviários podem ensejar prorrogação justificada do prazo, sempre com comunicação proativa ao Contratante.
            </p>

            <div className="mt-16 p-6 bg-slate-200/50 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500 font-medium text-center m-0">
                A Vitória Transportes reserva-se o direito de atualizar estes termos para manter a conformidade com normas da ANTT e legislações vigentes.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
