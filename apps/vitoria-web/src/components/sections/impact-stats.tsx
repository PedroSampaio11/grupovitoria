"use client";

import React from 'react';
import { motion, useSpring, useTransform, useInView, Variants } from 'framer-motion';

function CountUp({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const spring = useSpring(0, {
    stiffness: 60,
    damping: 15,
    restDelta: 0.001
  });

  const displayValue = useTransform(spring, (current) => 
    current.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: 31,
    suffix: "",
    label: "Anos de Estrada",
    description: "Tradição consolidada em logística de alta complexidade desde 1992.",
  },
  {
    value: 27,
    suffix: "",
    label: "Estados Atendidos",
    description: "Cobertura nacional completa com presença estratégica em todas as capitais.",
  },
  {
    value: 1.2,
    suffix: "M",
    decimals: 1,
    label: "Veículos Transportados",
    description: "Volume operacional que comprova nossa capacidade técnica em larga escala.",
  },
  {
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Índice de Segurança",
    description: "Rigor operacional focado na preservação absoluta de cada ativo sob nossa guarda.",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function ImpactStats() {
  return (
    <section className="py-16 md:py-28 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC223D]">
            Excelência Operacional
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-normal text-slate-950 mt-3 leading-tight">
            Nossos Números<br />Falam por Nós.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="group relative p-8 md:p-10 rounded-3xl bg-white border border-slate-100 hover:border-[#EC223D]/20 hover:shadow-2xl hover:shadow-[#EC223D]/5 transition-all duration-500"
            >
              <div className="text-4xl md:text-5xl font-black text-slate-950 mb-4 tracking-tighter flex items-baseline gap-1">
                <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#EC223D] mb-3">
                {stat.label}
              </div>

              <p className="text-sm leading-relaxed font-medium text-slate-500 group-hover:text-slate-600 transition-colors">
                {stat.description}
              </p>

              {/* Accent bar */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#EC223D]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "30%" }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
