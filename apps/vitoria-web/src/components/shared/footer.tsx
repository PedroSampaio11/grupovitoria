"use client";

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  InstagramIcon, 
  WhatsappIcon, 
  Mail01Icon, 
  CallIcon, 
  Location01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons';
import { siteConfig } from '@/constants/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white" role="contentinfo" aria-label="Rodapé - Vitória Transportes">
      {/* Mega CTA */}
      <div className="border-b border-white/5 py-16 md:py-24">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC223D] mb-4">
              Pronto para uma operação de elite?
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-normal leading-[1.1] text-white">
              Fale com um<br />Especialista B2B.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 h-14 md:h-16 flex items-center justify-center bg-[#EC223D] text-white font-bold uppercase tracking-[0.15em] text-[11px] rounded-xl hover:bg-[#c41c33] transition-all hover:shadow-xl hover:shadow-[#EC223D]/20 gap-3 group"
            >
              Consultar Viabilidade
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-8 h-14 md:h-16 flex items-center justify-center border border-white/10 text-white font-bold uppercase tracking-[0.15em] text-[11px] rounded-xl hover:bg-white/5 transition-all">
              Apresentação Institucional
            </button>
          </div>
        </div>
      </div>

      {/* Links + Info */}
      <div className="py-16 md:py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <span className="text-2xl md:text-3xl tracking-tight text-white">
                <span className="font-black uppercase">Vitória</span>
                <span className="font-light uppercase ml-2 text-white/50">Transportes</span>
              </span>
            </div>
            <p className="text-white/30 max-w-xs leading-relaxed text-sm font-medium">
              Especialistas em logística de veículos pesados e frotas governamentais desde 1992. 
              Compromisso inegociável com a segurança e a integridade patrimonial.
            </p>
            
            <div className="flex gap-4 mt-8">
              <a 
                href={siteConfig.links.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#EC223D] hover:border-[#EC223D]/50 transition-all"
              >
                <HugeiconsIcon icon={InstagramIcon} size={18} />
              </a>
              <a 
                href={siteConfig.links.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#EC223D] hover:border-[#EC223D]/50 transition-all"
              >
                <HugeiconsIcon icon={WhatsappIcon} size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f1f1f1] mb-6">Executivo</h4>
            <ul className="space-y-4 text-white/30 text-sm font-medium">
              <li className="flex items-center gap-3">
                <HugeiconsIcon icon={Mail01Icon} size={16} className="text-white/10" />
                {siteConfig.contact.email}
              </li>
              <li className="flex items-center gap-3">
                <HugeiconsIcon icon={CallIcon} size={16} className="text-white/10" />
                {siteConfig.contact.phone}
              </li>
              <li className="flex items-start gap-3 leading-relaxed">
                <HugeiconsIcon icon={Location01Icon} size={16} className="text-white/10 mt-1 shrink-0" />
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f1f1f1] mb-6">Corporativo</h4>
            <ul className="space-y-3 text-white/30 text-sm font-medium">
              <li>
                <Link href="/termos" className="hover:text-white/60 transition-colors">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white/60 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/5 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-medium uppercase tracking-widest">
            © {currentYear} Vitória Transportes. Rigor Operacional & Segurança. | Desenvolvido por <a href="https://fourcoders.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#EC223D] transition-colors">FourCoders</a>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white/10">
            <span>ANTT Regulamentada</span>
            <span>CNPJ Ativo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
