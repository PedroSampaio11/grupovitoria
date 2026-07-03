"use client";

import React from 'react';
import { TopBar } from "@/components/shared/top-bar";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from 'framer-motion';
import { siteConfig } from '@/constants/site';

export default function PrivacidadePage() {
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
              Proteção de Dados & LGPD
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-normal text-slate-950 leading-tight mb-8">
              Política de Privacidade e<br/>Tratamento de Dados Corporativos
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
              A Vitória Transportes reconhece a importância da privacidade e da proteção de dados pessoais e corporativos. Esta Política descreve como tratamos as informações coletadas através do nosso site e em nossas operações logísticas de elite, em total conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">1. Coleta de Informações Corporativas</h2>
            <p>
              Em nosso fluxo de atendimento B2B, coletamos dados de forma objetiva para garantir a viabilidade logística e a segurança da operação. Isso inclui:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600">
              <li><strong>Dados de Roteirização:</strong> Cidades e CEPs de origem e destino inseridos em nossos formulários.</li>
              <li><strong>Dados do Ativo:</strong> Categoria do veículo a ser transportado (Vans, Ambulâncias, etc.).</li>
              <li><strong>Dados de Contato:</strong> Nome, telefone e informações da empresa compartilhadas ao iniciar um atendimento via WhatsApp corporativo.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">2. Uso e Compartilhamento de Dados</h2>
            <p>
              Nós utilizamos as informações coletadas estritamente para fins operacionais:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600">
              <li>Elaboração de cotações logísticas e mapeamento de risco da rota.</li>
              <li>Emissão de apólices de seguro e documentação fiscal (CT-e / MDF-e) exigidas pela legislação.</li>
              <li>Acompanhamento e suporte ao cliente durante a movimentação da frota.</li>
            </ul>
            <p>
              A Vitória Transportes <strong>não vende, aluga ou comercializa</strong> dados corporativos ou pessoais. O compartilhamento ocorre exclusivamente com parceiros essenciais para a operação (como companhias seguradoras e autoridades fiscais/Sefaz).
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">3. Segurança da Informação</h2>
            <p>
              Assim como aplicamos protocolo de Risco Zero na movimentação de frotas, aplicamos rigor na proteção dos seus dados. Adotamos medidas técnicas e administrativas, como criptografia de trânsito (HTTPS) e restrição de acesso a servidores operacionais, para proteger informações contra acessos não autorizados ou vazamentos.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">4. Retenção de Dados</h2>
            <p>
              As informações coletadas serão retidas pelo período necessário para cumprir as finalidades logísticas contratuais ou para o cumprimento de obrigações legais, regulatórias ou fiscais, após o qual serão eliminadas com segurança.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">5. Direitos do Titular</h2>
            <p>
              Na condição de parceiro B2B ou pessoa física representante, você possui direitos garantidos pela LGPD (como acesso, correção e eliminação de dados não essenciais para a operação fiscal). Solicitações relativas à privacidade podem ser encaminhadas para o canal oficial da nossa diretoria corporativa.
            </p>

            <div className="mt-16 p-6 bg-slate-200/50 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500 font-medium text-center m-0">
                Dúvidas sobre o tratamento de dados? Entre em contato pelo e-mail oficial: <a href={`mailto:${siteConfig.contact.email}`} className="text-[#EC223D] font-bold">{siteConfig.contact.email}</a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
