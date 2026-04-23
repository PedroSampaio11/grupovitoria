import React from 'react';

const METRICS = [
  { value: "+12", label: "Anos de Operação", sub: "Tradição em veículos especiais" },
  { value: "100%", label: "Preservação", sub: "Integridade total do ativo" },
  { value: "Rigor", label: "Operacional", sub: "Padrão executivo de serviço" },
];

export function Testimonials() {
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

        {/* Testimonial - High-End Style */}
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto">
          <div className="w-8 h-[2px] bg-[#EC223D] mb-10" />
          <p className="text-2xl md:text-4xl font-bold text-slate-950 leading-tight tracking-normal">
            "A Vitória Transportes é o nosso parceiro estratégico para movimentação de frotas especiais. 
            O rigor técnico na fixação e a postura executiva dos motoristas garantem a segurança que o setor exige."
          </p>
          <div className="mt-10 flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-950 shadow-sm">
              GT
            </div>
            <div>
              <div className="font-bold text-slate-900">Gerência de Transporte Corporativo</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                Indústria de Veículos Transformados · BR
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
