"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/whatsapp';

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
          "fixed top-9 md:top-10 inset-x-0 z-[100] transition-all duration-300",
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-md border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
          <div className="flex flex-col shrink-0">
            <Image 
              src={isScrolled ? "/logos/logo-light.png" : "/logos/logo-dark.png"}
              alt="Vitória Transportes"
              width={200}
              height={200}
              priority
              className="h-16 w-auto md:h-20 object-contain transition-all duration-300"
            />
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
            <a
              href={buildWhatsAppLink("Olá! Gostaria de solicitar uma cotação de transporte com a Vitória Transportes.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-6 h-11 md:h-12 bg-[#EC223D] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#c41c33] transition-all"
            >
              Cotação <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn("p-2 z-[110] lg:hidden", isScrolled || menuOpen ? "text-white" : "text-slate-950")}
              aria-label="Menu"
            >
              {menuOpen ? <HugeiconsIcon icon={Cancel01Icon} size={24} /> : <HugeiconsIcon icon={Menu01Icon} size={24} />}
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

            <motion.a
              href={buildWhatsAppLink("Olá! Gostaria de solicitar uma cotação de transporte com a Vitória Transportes.")}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 px-10 h-14 flex items-center justify-center bg-[#EC223D] text-white font-bold uppercase tracking-[0.15em] text-[11px] rounded-full hover:bg-[#c41c33] transition-all"
            >
              Solicitar Cotação
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
