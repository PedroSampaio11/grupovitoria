"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  BankIcon, 
  FactoryIcon, 
  Stethoscope02Icon, 
  Building01Icon, 
  Shield01Icon, 
  DeliveryTruck01Icon 
} from '@hugeicons/core-free-icons';

const PARTNERS = [
  { 
    name: "Governo Federal", 
    icon: BankIcon,
    companies: ["Ministério da Saúde", "Prefeituras", "Polícia Federal"] 
  },
  { 
    name: "Montadoras", 
    icon: FactoryIcon,
    companies: ["Renault", "Porsche", "Mercedes-Benz", "Fiat", "Peugeot"] 
  },
  { 
    name: "Rede Hospitalar", 
    icon: Stethoscope02Icon,
    companies: ["Governo (Brasil Todo)", "Bem Estar", "Unimed"] 
  },
  { 
    name: "Frotas Corporativas", 
    icon: Building01Icon,
    companies: ["Localiza", "Movida", "Unidas"] 
  },
  { 
    name: "Transporte de Valores", 
    icon: Shield01Icon,
    companies: ["Prosegur", "Protege", "Brinks"] 
  },
  { 
    name: "Logística Especializada", 
    icon: DeliveryTruck01Icon,
    companies: ["FedEx", "DHL", "Correios"] 
  },
];

export function Marquee() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false })]
  );

  const [activePartner, setActivePartner] = React.useState<number | null>(null);

  return (
    <div className="pt-16 bg-slate-50 border-y border-slate-100 select-none">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Setores e Parceiros que confiam em nossa operação
        </p>
      </div>
      
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex pb-56 pt-4">
          {PARTNERS.concat(PARTNERS).map((partner, index) => {
            const isActive = activePartner === index;
            return (
              <div
                key={index}
                className="flex-[0_0_auto] min-w-0 px-3 relative group"
                onMouseEnter={() => setActivePartner(index)}
                onMouseLeave={() => setActivePartner(null)}
                onClick={() => setActivePartner(isActive ? null : index)}
              >
                {/* Sector Card */}
                <div className={`
                  flex items-center gap-5 px-8 py-5 bg-white border rounded-2xl shadow-sm transition-all duration-300 
                  ${isActive ? 'border-[#EC223D]/40 shadow-xl' : 'border-slate-200'}
                  group-hover:border-[#EC223D]/40 group-hover:shadow-xl
                `}>
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-colors
                    ${isActive ? 'text-[#EC223D] bg-[#EC223D]/10' : 'bg-slate-50 text-slate-400'}
                    group-hover:text-[#EC223D] group-hover:bg-[#EC223D]/10
                  `}>
                    <HugeiconsIcon icon={partner.icon} size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>

                {/* Hover Companies Tooltip */}
                <div className={`
                  absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[95%] pointer-events-none transition-all duration-400 z-50
                  ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  group-hover:opacity-100 group-hover:translate-y-0
                `}>
                  <div className="bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col gap-3 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-slate-900/95 before:rotate-45 before:border-l before:border-t before:border-white/10">
                    {partner.companies.map((company, i) => (
                      <div key={i} className="text-[10px] font-bold text-white/90 uppercase tracking-widest text-center whitespace-nowrap relative z-10">
                        {company}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
