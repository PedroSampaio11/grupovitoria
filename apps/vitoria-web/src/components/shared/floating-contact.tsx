"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { WhatsappIcon, Mail01Icon, CallIcon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { siteConfig } from '@/constants/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 flex flex-col gap-2 min-w-[220px]"
          >
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="bg-green-100 p-2 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
                <HugeiconsIcon icon={WhatsappIcon} size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">WhatsApp</span>
            </a>
            
            <a 
              href={`mailto:${siteConfig.contact.email}`} 
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                <HugeiconsIcon icon={Mail01Icon} size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">E-mail</span>
            </a>
            
            <div className="flex items-center gap-3 p-3 rounded-xl opacity-50 cursor-not-allowed">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-400">
                <HugeiconsIcon icon={CallIcon} size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ligar agora</span>
                <span className="text-[10px] text-[#EC223D] font-bold uppercase tracking-widest">Em breve</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#EC223D] hover:bg-[#D11A33] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(236,34,61,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {isOpen ? <HugeiconsIcon icon={Cancel01Icon} size={28} /> : <HugeiconsIcon icon={WhatsappIcon} size={28} />}
      </button>
    </div>
  );
}
