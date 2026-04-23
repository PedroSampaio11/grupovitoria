import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
              className="px-8 h-14 md:h-16 flex items-center justify-center bg-[#EC223D] text-white font-bold uppercase tracking-[0.15em] text-[11px] rounded-xl hover:bg-[#c41c33] transition-all hover:shadow-xl hover:shadow-[#EC223D]/20"
            >
              Consultar Viabilidade
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
            <Image 
              src="/logos/logo-light.png"
              alt="Vitória Transportes"
              width={300}
              height={300}
              className="h-20 w-auto md:h-28 object-contain mb-8"
            />
            <p className="text-white/30 max-w-xs leading-relaxed text-sm font-medium">
              Especialistas em logística de veículos pesados e frotas governamentais. 
              Compromisso inegociável com a segurança e a integridade patrimonial.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] !text-white mb-6">Executivo</h4>
            <ul className="space-y-3 text-white/30 text-sm font-medium">
              <li>{siteConfig.contact.email}</li>
              <li>{siteConfig.contact.phone}</li>
              <li className="leading-relaxed">{siteConfig.contact.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] !text-white mb-6">Corporativo</h4>
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
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white/20">
            <span>ANTT: 00000000</span>
            <span>CNPJ: 00.000.000/0000-00</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
