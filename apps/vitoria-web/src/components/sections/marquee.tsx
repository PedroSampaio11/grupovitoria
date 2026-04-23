"use client";

import React from 'react';

const PARTNERS = [
  "Toyota", "Volkswagen", "Ford", "Mercedes-Benz", "BMW",
  "Allianz", "Porto Seguro", "Localiza", "Movida", "Honda"
];

export function Marquee() {
  return (
    <div className="py-6 bg-[#0B1727] overflow-hidden select-none">
      <div className="flex w-[200%] animate-marquee-scroll">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex justify-around w-full items-center gap-16 px-8">
            {PARTNERS.map((partner) => (
              <span
                key={`${i}-${partner}`}
                className="text-[11px] font-black uppercase tracking-[0.25em] text-white/20 hover:text-white/50 transition-colors cursor-default whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
