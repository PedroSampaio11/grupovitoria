"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Landmark, Factory, Building2, Shield, Truck, Stethoscope } from 'lucide-react';

const PARTNERS = [
  { 
    name: "Governo Federal", 
    icon: Landmark,
    companies: ["Ministério da Saúde", "Prefeituras", "Polícia Federal"] 
  },
  { 
    name: "Montadoras", 
    icon: Factory,
    companies: ["Toyota", "Ford", "Mercedes-Benz"] 
  },
  { 
    name: "Rede Hospitalar", 
    icon: Stethoscope,
    companies: ["Rede D'Or", "Sírio-Libanês", "Unimed"] 
  },
  { 
    name: "Frotas Corporativas", 
    icon: Building2,
    companies: ["Localiza", "Movida", "Unidas"] 
  },
  { 
    name: "Transporte de Valores", 
    icon: Shield,
    companies: ["Prosegur", "Protege", "Brinks"] 
  },
  { 
    name: "Logística Especializada", 
    icon: Truck,
    companies: ["FedEx", "DHL", "Correios"] 
  },
];

export function Marquee() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false })]
  );

  return (
    <div className="pt-16 bg-slate-50 border-y border-slate-100 select-none">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Setores e Parceiros que confiam em nossa operação
        </p>
      </div>
      
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex pb-32 pt-4">
          {PARTNERS.concat(PARTNERS).map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="flex-[0_0_auto] min-w-0 px-3 relative group"
              >
                {/* Sector Card */}
                <div className="flex items-center gap-5 px-8 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 group-hover:border-[#EC223D]/40 group-hover:shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#EC223D] group-hover:bg-[#EC223D]/10 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>

                {/* Hover Companies Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[95%] opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 z-50">
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
