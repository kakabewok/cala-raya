"use client";

import { CONTACT_PERSON } from "@/data/data";
import { ArrowRight } from "lucide-react";

export default function ClosingCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-[#1C1917] overflow-hidden">
      {/* Noise background */}
      <div className="absolute inset-0 bg-noise opacity-10" />
      
      {/* Decorative Gold elements */}
      <div className="absolute top-0 right-10 w-[400px] h-[400px] bg-[#B8943E]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-[#B8943E]/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <p className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-4">
          Langkah Selanjutnya
        </p>
        
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.2]">
          Siap Mewujudkan Momen Spesialmu?
        </h2>
        
        <p className="text-[15px] md:text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Diskusikan konsep undangan digital atau website impianmu bersama tim Calaraya sekarang juga.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
              "Halo, saya ingin bertanya tentang jasa pembuatan Undangan Digital/Website. Boleh dibantu?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#B8943E] text-white text-[15px] font-medium rounded-xl hover:bg-[#a07c2d] transition-all duration-300 shadow-lg shadow-[#B8943E]/20 hover:shadow-[#B8943E]/40 hover:-translate-y-0.5"
          >
            Hubungi Kami
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#koleksi"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white/90 text-[15px] font-medium rounded-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
          >
            Lihat Koleksi
          </a>
        </div>
      </div>
    </section>
  );
}
