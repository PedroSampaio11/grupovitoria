"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Frota', href: '#frota' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

function smoothScroll(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(latest > previous && latest > 150);
    setIsScrolled(latest > 50);
  });

  function handleNavClick(href: string) {
    setMenuOpen(false);
    setTimeout(() => smoothScroll(href), 100);
  }

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden && !menuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-[100] transition-all duration-300",
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-md border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between overflow-hidden">
          <div className="flex flex-col shrink-0">
            <div className={cn("text-lg md:text-xl font-bold tracking-normal uppercase leading-none", isScrolled ? "text-white" : "text-slate-950")}>
              VITÓRIA
            </div>
            <div className={cn("text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase mt-1", isScrolled ? "text-white/40" : "text-slate-500")}>
              TRANSPORTES
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                onClick={() => smoothScroll(item.href)}
                className={cn(
                  "text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#EC223D] cursor-pointer",
                  isScrolled ? "text-white/60" : "text-slate-600"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <button className="hidden sm:flex items-center gap-2 px-6 h-11 md:h-12 bg-[#EC223D] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#c41c33] transition-all">
              Cotação <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn("p-2 z-[110] lg:hidden", isScrolled || menuOpen ? "text-white" : "text-slate-950")}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-slate-950 flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNavClick(item.href)}
                className="text-2xl font-bold uppercase tracking-[0.2em] text-white hover:text-[#EC223D] transition-colors"
              >
                {item.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 px-10 h-14 bg-[#EC223D] text-white font-bold uppercase tracking-[0.15em] text-[11px] rounded-full hover:bg-[#c41c33] transition-all"
            >
              Solicitar Cotação
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
