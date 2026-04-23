"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const METRICS = [
  { value: "+12", label: "Anos de Operação", sub: "Tradição em veículos especiais" },
  { value: "100%", label: "Preservação", sub: "Integridade total do ativo" },
  { value: "Rigor", label: "Operacional", sub: "Padrão executivo de serviço" },
];

const REVIEWS = [
  {
    quote: "A Vitória Transportes é o nosso parceiro estratégico para movimentação de frotas especiais. O rigor técnico na fixação e a postura executiva dos motoristas garantem a segurança que o setor exige.",
    author: "Gerência de Transporte Corporativo",
    role: "Indústria de Veículos Transformados · BR",
    initials: "GT"
  },
  {
    quote: "Quando se trata de ambulâncias e viaturas, não existe margem para erro. A Vitória nos entregou 100% de integridade em mais de 500 transportes neste ano. Nível altíssimo de serviço.",
    author: "Diretoria de Logística",
    role: "Governo Estadual",
    initials: "DL"
  },
  {
    quote: "A rastreabilidade e a transparência durante todo o percurso nos dão tranquilidade. É a única transportadora que atende o nosso SLA rígido para frotas executivas.",
    author: "Head de Operações",
    role: "Rede Privada de Saúde",
    initials: "HO"
  }
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' }, 
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 md:py-28 bg-white overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-6">

        {/* Numbers - Executive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pb-16 md:pb-24 border-b border-slate-100">
          {METRICS.map((metric, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-5xl md:text-7xl font-bold leading-none tracking-normal text-[#EC223D]">
                {metric.value}
              </div>
              <div className="text-lg font-bold text-slate-950 uppercase tracking-tight mt-3">
                {metric.label}
              </div>
              <div className="text-sm text-slate-500 font-medium mt-1">{metric.sub}</div>
            </div>
          ))}
        </div>

        {/* Embla Testimonial Carousel */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto relative">
          <div className="w-8 h-[2px] bg-[#EC223D] mb-10" />
          
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {REVIEWS.map((review, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 pr-4 md:pr-12">
                  <p className="text-2xl md:text-4xl font-bold text-slate-950 leading-tight tracking-normal">
                    "{review.quote}"
                  </p>
                  <div className="mt-10 flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-950 shadow-sm">
                      {review.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{review.author}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                        {review.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mt-12">
            <button 
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#EC223D] hover:border-[#EC223D] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#EC223D] hover:border-[#EC223D] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
