import React from 'react';

export function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-white dark:to-zinc-950 z-10" />
      
      <div className="container mx-auto px-6 relative z-20 text-center sm:text-left">
        <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-widest uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full">
          Vitória Transportes • Logística Premium
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-8 max-w-4xl leading-[1.1]">
          Levamos seu patrimônio com a <span className="text-blue-600 dark:text-blue-400">segurança</span> de quem entende de estrada.
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl">
          Especialistas em transporte de veículos e vans em todo o Brasil. Tecnologia de rastreio, frota moderna e compromisso com o prazo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-lg hover:opacity-90 transition-all">
            Solicitar Cotação
          </button>
          <button className="px-8 py-4 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-semibold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
            Nossa Frota
          </button>
        </div>
      </div>
    </section>
  );
}
