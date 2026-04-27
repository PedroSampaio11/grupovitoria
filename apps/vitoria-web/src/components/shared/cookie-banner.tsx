"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { CookieIcon } from '@hugeicons/core-free-icons';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vitoria-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('vitoria-cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[9999] w-full max-w-[380px] p-6"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#EC223D]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EC223D]/20 flex items-center justify-center text-[#EC223D]">
                  <HugeiconsIcon icon={CookieIcon} size={20} />
                </div>
                <h4 className="text-white font-bold text-base tracking-tight">Privacidade & Cookies</h4>
              </div>
              
              <p className="text-white/50 text-xs leading-relaxed font-medium">
                Utilizamos cookies para otimizar sua experiência e analisar o tráfego do site de acordo com nossa 
                <Link href="/privacidade" className="text-white/80 hover:text-[#EC223D] underline ml-1 transition-colors">
                  Política de Privacidade
                </Link>.
              </p>
              
              <div className="flex gap-3 mt-1">
                <button
                  onClick={acceptCookies}
                  className="flex-1 h-11 bg-white text-slate-950 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#EC223D] hover:text-white transition-all active:scale-95"
                >
                  Aceitar Tudo
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-5 h-11 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-white/5 transition-all"
                >
                  Recusar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
