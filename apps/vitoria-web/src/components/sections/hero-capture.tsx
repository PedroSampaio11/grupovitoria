"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  ArrowRight01Icon, 
  Location01Icon, 
  SecurityCheckIcon, 
  Loading01Icon,
  UserIcon,
  WhatsappIcon
} from '@hugeicons/core-free-icons';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const KEYWORDS = ["COM EXCELÊNCIA.", "COM SEGURANÇA.", "COM PARCERIA."];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function buildQuoteWhatsAppUrl(nome: string, telefone: string, origem: string, destino: string, veiculo: string) {
  return buildWhatsAppLink(
    `Olá! Me chamo ${nome} e gostaria de uma cotação para transporte especializado:\n\n` +
    `📍 Origem: ${origem || "Não informado"}\n` +
    `📍 Destino: ${destino || "Não informado"}\n` +
    `🚐 Veículo: ${veiculo || "Não informado"}\n` +
    `📱 Contato: ${telefone}\n\n` +
    `Prezo pela segurança e integridade no transporte.`
  );
}

const BRAZIL_CITIES = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", "Porto Alegre, RS",
  "Salvador, BA", "Fortaleza, CE", "Brasília, DF", "Goiânia, GO", "Manaus, AM", "Recife, PE",
  "Belém, PA", "Vitória, ES", "Florianópolis, SC", "Cuiabá, MT", "Campo Grande, MS",
  "Natal, RN", "João Pessoa, PB", "Maceió, AL", "Teresina, PI", "Aracaju, SE",
  "São Luís, MA", "Porto Velho, RO", "Macapá, AP", "Rio Branco, AC", "Boa Vista, RR",
  "Palmas, TO", "Campinas, SP", "Guarulhos, SP", "São Bernardo do Campo, SP", "Ribeirão Preto, SP"
];

// ── CEP Lookup via ViaCEP (API pública brasileira) ──
async function lookupCEP(cep: string): Promise<{ city: string; state: string } | null> {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.erro) return null;
    return { city: data.localidade, state: data.uf };
  } catch {
    return null;
  }
}

// ── Smart Input Component ──
function SmartLocationInput({
  value,
  onChange,
  placeholder,
  isGeoDetected,
  id,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  isGeoDetected?: boolean;
  id: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [wasResolved, setWasResolved] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatCEP = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 8);
    if (clean.length > 5) {
      return `${clean.slice(0, 5)}-${clean.slice(5)}`;
    }
    return clean;
  };

  const handleChange = async (inputVal: string) => {
    // Sugestões de cidades
    if (inputVal.length >= 3 && !/^\d+$/.test(inputVal)) {
      const filtered = BRAZIL_CITIES.filter(c => 
        c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .includes(inputVal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }

    if (inputVal.length < value.length) {
      onChange(inputVal);
      setWasResolved(false);
      return;
    }

    const formatted = inputVal.includes('-') || /^\d+$/.test(inputVal) ? formatCEP(inputVal) : inputVal;
    onChange(formatted);
    setWasResolved(false);

    const cleanCEP = formatted.replace(/\D/g, '');
    if (cleanCEP.length === 8) {
      setIsLoading(true);
      const result = await lookupCEP(cleanCEP);
      if (result) {
        onChange(`${result.city}, ${result.state}`);
        setWasResolved(true);
      }
      setIsLoading(false);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (city: string) => {
    onChange(city);
    setShowSuggestions(false);
    setWasResolved(true);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <HugeiconsIcon icon={Location01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
      <input
        id={id}
        type="text"
        autoComplete="off"
        required
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full h-12 md:h-14 pl-12 pr-24 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:ring-1 focus:ring-[#EC223D] focus:border-transparent outline-none transition-all text-sm"
      />
      
      {showSuggestions && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden z-[100] shadow-2xl"
        >
          {suggestions.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => handleSelect(city)}
              className="w-full px-6 py-3 text-left text-sm text-white/70 hover:bg-[#EC223D] hover:text-white transition-colors border-b border-white/5 last:border-0"
            >
              {city}
            </button>
          ))}
        </motion.div>
      )}

      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <HugeiconsIcon icon={Loading01Icon} className="w-4 h-4 text-[#EC223D] animate-spin" />
        </div>
      )}
      {(isGeoDetected || wasResolved) && !isLoading && !showSuggestions && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 hidden xs:block">
            {isGeoDetected ? 'Auto-IP' : 'OK'}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export function HeroCapture() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [isGeoDetected, setIsGeoDetected] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % KEYWORDS.length);
    }, 3000);
    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    async function fetchGeo() {
      try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        if (res.ok) {
          const data = await res.json();
          if (data.city && data.region) {
            setOrigem(`${data.city}, ${data.region}`);
            setIsGeoDetected(true);
            return;
          }
        }
      } catch {
        /* silent */
      }
      try {
        const resFallback = await fetch("https://ipapi.co/json/");
        if (resFallback.ok) {
          const data = await resFallback.json();
          if (data.city && data.region) {
            setOrigem(`${data.city}, ${data.region}`);
            setIsGeoDetected(true);
          }
        }
      } catch {
        /* silent */
      }
    }
    fetchGeo();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    
    setStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/xrerwgzg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          nome,
          whatsapp: telefone,
          origem,
          destino,
          veiculo,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setStatus("success");

        window.open(buildQuoteWhatsAppUrl(nome, telefone, origem, destino, veiculo), "_blank");

        // Limpar o formulário após sucesso
        setNome("");
        setTelefone("");
        setOrigem("");
        setDestino("");
        setVeiculo("");

        // Resetar o status após um delay
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Form error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section
      id="hero"
      aria-label="Formulário de cotação de transporte"
      className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #0B1727 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#EC223D] z-10" aria-hidden="true" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10"
      >
        {/* Esquerda: Contexto Corporativo */}
        <div className="flex flex-col space-y-6 md:space-y-8">
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase bg-slate-900 text-white rounded-sm">
              Logística de Veículos Especiais & Frotas
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[clamp(32px,7vw,84px)] font-bold tracking-normal text-slate-950 leading-[1.1] md:leading-[1.05]"
          >
            TRANSPORTE<br />
            <span className="text-[#EC223D] inline-block min-w-[300px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {KEYWORDS[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-600 max-w-md leading-relaxed font-medium"
          >
            Especialistas no transporte de Vans, Ambulâncias e Veículos Transformados. 
            Garantimos a integridade total do seu ativo, da coleta à entrega final.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-8 pt-4">
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-bold text-slate-950">100%</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Segurança</div>
            </div>
            <div className="w-px bg-slate-200" aria-hidden="true" />
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-bold text-slate-950">Zero</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Avarias</div>
            </div>
            <div className="w-px bg-slate-200" aria-hidden="true" />
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-bold text-slate-950">Elite</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Operacional</div>
            </div>
          </motion.div>
        </div>

        {/* Direita: Formulário Executivo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md mx-auto lg:ml-auto"
        >
          <form onSubmit={handleSubmit} className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/5" aria-label="Formulário de cotação">
            <div className="px-8 py-8 md:px-10 border-b border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC223D] mb-2">
                Solicitação de Cotação
              </div>
              <h3 className="text-xl md:text-2xl font-bold !text-white tracking-tight">
                Planejamento de Rota
              </h3>
            </div>

            <div className="px-8 py-8 md:px-10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <HugeiconsIcon icon={UserIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="nome"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu Nome"
                    className="w-full h-12 md:h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:ring-1 focus:ring-[#EC223D] focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
                <div className="relative">
                  <HugeiconsIcon icon={WhatsappIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="WhatsApp"
                    className="w-full h-12 md:h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:ring-1 focus:ring-[#EC223D] focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <SmartLocationInput
                id="campo-origem"
                value={origem}
                onChange={(val) => {
                  setOrigem(val);
                  if (isGeoDetected) setIsGeoDetected(false);
                }}
                placeholder="Origem (Cidade ou CEP)"
                isGeoDetected={isGeoDetected}
              />

              <SmartLocationInput
                id="campo-destino"
                value={destino}
                onChange={setDestino}
                placeholder="Destino (Cidade ou CEP)"
              />

              <div className="relative">
                <HugeiconsIcon icon={SecurityCheckIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  id="campo-veiculo"
                  name="veiculo"
                  required
                  value={veiculo}
                  onChange={(e) => setVeiculo(e.target.value)}
                  aria-label="Categoria do Veículo"
                  className="w-full h-12 md:h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-[#EC223D] focus:border-transparent outline-none appearance-none transition-all cursor-pointer text-sm"
                >
                  <option value="" className="bg-slate-950">Categoria do Veículo</option>
                  <option value="Vans de Passageiros" className="bg-slate-950">Vans de Passageiros</option>
                  <option value="Ambulâncias / UTI Móvel" className="bg-slate-950">Ambulâncias / UTI Móvel</option>
                  <option value="Veículos Transformados" className="bg-slate-950">Veículos Transformados</option>
                  <option value="Frota Corporativa Pesada" className="bg-slate-950">Frota Corporativa Pesada</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`
                  w-full h-12 md:h-14 text-white font-bold uppercase tracking-[0.15em] text-[11px] md:text-xs rounded-xl flex items-center justify-center gap-3 transition-all mt-2 group
                  ${status === "submitting" ? "bg-slate-700 cursor-wait" : 
                    status === "success" ? "bg-emerald-600" : 
                    status === "error" ? "bg-amber-600" : "bg-[#EC223D] hover:bg-[#c41c33] hover:shadow-lg hover:shadow-[#EC223D]/20"}
                `}
              >
                {status === "submitting" ? (
                  <>Processando... <HugeiconsIcon icon={Loading01Icon} className="w-4 h-4 animate-spin" /></>
                ) : status === "success" ? (
                  "Enviado com Sucesso!"
                ) : status === "error" ? (
                  "Erro ao enviar. Tente novamente."
                ) : (
                  <>
                    Enviar Solicitação
                    <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <div className="px-8 pb-8 md:px-10 text-center">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium">
                Atendimento Executivo B2B
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
